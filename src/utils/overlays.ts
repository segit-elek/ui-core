import {
  Animation,
  AnimationBuilder,
  BackButtonEvent,
  HTMLEuiOverlayElement,
  OverlayInterface,
  SelectDropdownOptions
} from '../interface';

let lastId = 0;

export const activeAnimations = new WeakMap<OverlayInterface, Animation[]>();

const createController = <Opts extends object, HTMLElm extends HTMLElement>(tagName: string) => {
  return {
    create(options: Opts): Promise<HTMLElm> {
      return createOverlay(tagName, options) as any;
    },
    dismiss(data?: unknown, role?: string, id?: string): any {
      return dismissOverlay(document, data, role, tagName, id);
    },
    async getTop(): Promise<HTMLElm | undefined> {
      return getOverlay(document, tagName) as any;
    },
  };
};

export const selectDropdownController = /*@__PURE__*/ createController<
  SelectDropdownOptions,
  HTMLEuiSelectDropdownElement
>('eui-select-dropdown');

export const prepareOverlay = <T extends HTMLEuiOverlayElement>(el: T) => {
  connectListeners(document);
  const overlayIndex = lastId++;
  el.overlayIndex = overlayIndex;
  if (!el.hasAttribute('id')) {
    el.id = `eui-overlay-${overlayIndex}`;
  }
};

export async function createOverlay<T extends HTMLEuiOverlayElement>(
  tagName: string,
  opts: any | unknown
): Promise<T> {
  await customElements.whenDefined(tagName);

  const element = document.createElement(tagName) as T;
  element.classList.add('overlay-hidden');

  // convert the passed in overlay options into props
  // that get passed down into the new overlay
  Object.assign(element, opts);

  // append the overlay element to the document body
  if (opts.position === 'absolute' && opts.wrapperElement) {
    opts.wrapperElement.appendChild(element);
  } else {
    document.body.appendChild(element);
  }
  await element.componentOnReady();

  return element as T;
}

export const connectListeners = (doc: Document) => {
  if (lastId === 0) {
    lastId = 1;
    // trap focus inside overlays
    doc.addEventListener('focusin', (ev) => {
      const lastOverlay = getOverlay(doc);
      if (
        lastOverlay &&
        lastOverlay.backdropDismiss &&
        !isDescendant(lastOverlay, ev.target as HTMLElement)
      ) {
        const firstInput = lastOverlay.querySelector('input,button') as HTMLElement | null;
        if (firstInput) {
          firstInput.focus();
        }
      }
    });

    // handle back-button click
    doc.addEventListener('euiBackButton', (ev) => {
      const lastOverlay = getOverlay(doc);
      if (lastOverlay && lastOverlay.backdropDismiss) {
        (ev as BackButtonEvent).detail.register(100, () => {
          return lastOverlay.dismiss(undefined, BACKDROP);
        });
      }
    });

    // handle ESC to close overlay
    doc.addEventListener('keyup', (ev) => {
      if (ev.key === 'Escape') {
        const lastOverlay = getOverlay(doc);
        if (lastOverlay && lastOverlay.backdropDismiss) {
          lastOverlay.dismiss(undefined, BACKDROP);
        }
      }
    });
  }
};

export const dismissOverlay = (
  doc: Document,
  data: unknown,
  role: string,
  overlayTag: string,
  id?: string
): Promise<boolean> => {
  const overlay = getOverlay(doc, overlayTag, id);
  if (!overlay) {
    return Promise.reject('overlay does not exist');
  }
  return overlay.dismiss(data, role);
};

export const getOverlays = (doc: Document, selector?: string): HTMLEuiOverlayElement[] => {
  if (selector === undefined) {
    selector = 'eui-select-dropdown';
  }
  return (Array.from(doc.querySelectorAll(selector)) as HTMLEuiOverlayElement[]).filter(
    (c) => c.overlayIndex > 0
  );
};

export const getOverlay = (
  doc: Document,
  overlayTag?: string,
  id?: string
): HTMLEuiOverlayElement | undefined => {
  const overlays = getOverlays(doc, overlayTag);
  return id === undefined ? overlays[overlays.length - 1] : overlays.find((o) => o.id === id);
};

export const present = async (
  overlay: OverlayInterface,
  enterAnimation: AnimationBuilder,
  opts?: unknown
) => {
  if (overlay.presented) {
    return;
  }
  overlay.presented = true;
  overlay.willPresent.emit();

  const completed = await overlayAnimation(overlay, enterAnimation, overlay.el, opts);
  if (completed) {
    overlay.didPresent.emit();
  }
};

export const dismiss = async (
  overlay: OverlayInterface,
  data: unknown,
  role: string,
  leaveAnimation: AnimationBuilder | undefined,
  opts?: unknown
): Promise<boolean> => {
  if (!overlay.presented) {
    overlay.el.remove();
    return false;
  }
  overlay.presented = false;

  try {
    overlay.willDismiss.emit({ data, role });
    if (leaveAnimation !== undefined) {
      await overlayAnimation(overlay, leaveAnimation, overlay.el, opts);
    }
    overlay.didDismiss.emit({ data, role });

    activeAnimations.delete(overlay);
  } catch (err) {
    console.log(leaveAnimation);
    console.error(err);
  }

  overlay.el.remove();
  return true;
};

const overlayAnimation = (
  overlay: OverlayInterface,
  animationBuilder: AnimationBuilder,
  baseEl: HTMLElement,
  opts: unknown
): boolean => {
  // Make overlay visible in case it's hidden
  baseEl.classList.remove('overlay-hidden');

  const aniRoot = baseEl.shadowRoot || overlay.el;
  const animation = animationBuilder(aniRoot, opts);

  if (!overlay.animated) {
    animation.duration(0);
  }

  if (overlay.keyboardClose) {
    animation.beforeAddWrite(() => {
      const activeElement = baseEl.ownerDocument!.activeElement as HTMLElement;
      if (activeElement && activeElement.matches('input, eui-input, eui-textarea')) {
        activeElement.blur();
      }
    });
  }

  const activeAni = activeAnimations.get(overlay) || [];
  activeAnimations.set(overlay, [...activeAni, animation]);

  animation.play({sync: true});

  return true;
};

export const eventMethod = <T>(element: HTMLElement, eventName: string): Promise<T> => {
  let resolve: (detail: T) => void;
  const promise = new Promise<T>((r) => (resolve = r));
  onceEvent(element, eventName, (event: CustomEvent) => {
    resolve(event.detail);
  });
  return promise;
};

export const onceEvent = (
  element: HTMLElement,
  eventName: string,
  callback: (ev: Event) => void
) => {
  const handler = (ev: Event) => {
    element.removeEventListener(eventName, handler);
    callback(ev);
  };
  element.addEventListener(eventName, handler);
};

export const isCancel = (role: string | undefined): boolean => {
  return role === 'cancel' || role === BACKDROP;
};

const isDescendant = (parent: HTMLElement, child: HTMLElement | null) => {
  while (child) {
    if (child === parent) {
      return true;
    }
    child = child.parentElement;
  }
  return false;
};

const defaultGate = (h: Function) => h();

export function safeCall<T, P>(handler: (arg: P) => T, arg?: P): T {
  if (typeof handler === 'function') {
    const jmp = defaultGate;
    return jmp(() => {
      try {
        return handler(arg);
      } catch (e) {
        console.error(e);
      }
    });
  }
  return undefined;
}

export const BACKDROP = 'backdrop';
