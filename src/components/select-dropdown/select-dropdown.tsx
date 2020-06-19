import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State
} from '@stencil/core';

import {
  ComboboxAction,
  ComponentSize,
  EuiOptionInterface,
  OverlayEventDetail,
  OverlayInterface,
  SelectDropdownLocalization
} from '../../interface';
import { BACKDROP, dismiss, eventMethod, prepareOverlay, present, safeCall } from '../../utils/overlays';
import { enter2Animation as enterAnimation } from './animations/enter2';
import { leave2Animation as leaveAnimation } from './animations/leave2';
// import { enterAnimation } from './animations/enter';
// import { leaveAnimation } from './animations/leave';

@Component({
  tag: 'eui-select-dropdown',
  styleUrl: 'select-dropdown.scss',
  scoped: true,
})
export class SelectDropdown implements ComponentInterface, OverlayInterface {
  presented: boolean = false;
  @Element() el!: HTMLEuiSelectDropdownElement;

  /** @internal */
  @Prop() overlayIndex!: number;

  /**
   * contains the texts that can be overwritten
   */
  @Prop() localization?: SelectDropdownLocalization = {
    content: {
      back: 'Back',
    },
  };

  /**
   * value of the parent component
   */
  @Prop() value: EuiOptionInterface[] | EuiOptionInterface;

  /**
   * min width of the component
   */
  @Prop() minWidth?: number = 150;

  /**
   * event sent by select filed on open
   */
  @Prop() size?: ComponentSize = 'small';

  /**
   * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
   */
  @Prop() keyboardClose: boolean = false;

  /**
   * An array of options for the select dropdown.
   */
  @Prop() options?: EuiOptionInterface[] = [];

  /**
   * An array of actions for the select dropdown.
   */
  @Prop() actions?: ComboboxAction[] = [];

  /**
   * loading state for the select dropdown.
   */
  @Prop() isLoading?: boolean = false;

  /**
   * parent component
   */
  @Prop() parent?: HTMLElement;

  /**
   * sets whether selected icon is displayed in option
   */
  @Prop() selectedIconEnabled?: boolean = true;

  /**
   * position of the selected icon in option
   */
  @Prop() selectedIconPosition?: 'start' | 'end' = 'end';

  /**
   * icon that is rendered in option
   */
  @Prop() selectedIcon?: string = 'check';

  /**
   * position of the dropdown
   */
  @Prop() position?: 'absolute' | 'fixed';

  /**
   * sets whether the filter is enabled
   */
  @Prop() inputEnabled?: boolean = false;

  /**
   * sets the displayed option element
   */
  @Prop() optionElement?: string = 'eui-select-dropdown-option';

  /**
   * sets the displayed content wrapper for the options
   */
  @Prop() contentElement?: string = 'eui-select-dropdown-content';

  /**
   * If `true`, the select dropdown will animate.
   */
  @Prop() animated: boolean = true;

  /**
   * custom parameters for custom content components
   */
  @Prop() customContentParams?: {[key: string]: unknown};

  /**
   * custom parameters for custom option components
   */
  @Prop() customOptionParams?: {[key: string]: unknown};

  @State() renderTrigger: number;
  @State() beingDismissed: boolean = false;

  /**
   * Emitted after the dropdown is presented.
   */
  @Event({ eventName: 'euiSelectDropdownDidPresent' })
  didPresent!: EventEmitter<void>;

  /**
   * Emitted before the dropdown is presented.
   */
  @Event({ eventName: 'euiSelectDropdownWillPresent' })
  willPresent!: EventEmitter<void>;

  /**
   * Emitted before the dropdown is dismissed.
   */
  @Event({ eventName: 'euiSelectDropdownWillDismiss' })
  willDismiss!: EventEmitter<OverlayEventDetail>;

  /**
   * Emitted after the dropdown is dismissed.
   */
  @Event({ eventName: 'euiSelectDropdownDidDismiss' })
  didDismiss!: EventEmitter<OverlayEventDetail>;

  private isFirstOpen: boolean = true;
  private input: HTMLInputElement;
  private openPosition: 'bottom' | 'top';

  constructor() {
    prepareOverlay(this.el);
  }

  @Listen('scroll', { target: 'document', capture: true })
  documentScrollHandler(): void {
    this.setPositions();
  }
  @Listen('resize', { target: 'window' })
  windowResizeHandler(): void {
    this.setPositions();
  }
  @Listen('click')
  clickHandler(): void {
    this.setPositions();
    this.renderTrigger = Math.random();
  }

  @Listen('mousedown', { target: 'document' })
  async documentClickHandler(ev: MouseEvent): Promise<void> {
    const path = ev.composedPath();
    if (path.indexOf(this.el) === -1 && path.indexOf(this.parent) === -1) {
      await this.dismiss(undefined, BACKDROP);
    }
  }

  /**
   * updates the position of the dropdown
   */
  @Method()
  async updatePosition(): Promise<void> {
    this.setPositions();
  }

  /**
   * Present the select dropdown overlay after it has been created.
   */
  @Method()
  async present(): Promise<void> {
    return present(this, enterAnimation);
  }

  /**
   * Dismiss the select dropdown overlay after it has been presented.
   *
   * @param data Any data to emit in the dismiss events.
   * @param role The role of the element that is dismissing the select dropdown.
   * This can be useful in a button handler for determining which button was
   * clicked to dismiss the select dropdown.
   * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
   */
  @Method()
  async dismiss(data?: unknown, role?: string): Promise<boolean> {
    this.beingDismissed = true;
    this.parent = null;
    return dismiss(this, data, role, leaveAnimation);
  }

  /**
   * Returns a promise that resolves when the select dropdown did dismiss.
   */
  @Method()
  async onDidDismiss(): Promise<OverlayEventDetail> {
    return eventMethod(this.el, 'euiSelectDropdownDidDismiss');
  }

  /**
   * Returns a promise that resolves when the select dropdown will dismiss.
   *
   */
  @Method()
  async onWillDismiss(): Promise<OverlayEventDetail> {
    return eventMethod(this.el, 'euiSelectDropdownWillDismiss');
  }

  componentDidLoad(): void {
    this.isFirstOpen = true;

    if (this.input) {
      setTimeout(() => {
        this.input.focus();
      }, 10);
    }
  }

  componentDidUpdate(): void {
    this.setPositions();
  }

  componentDidRender(): void {
    this.setPositions();
  }

  setPositions(): void {
    if (this.position === 'absolute' || !this.parent) {
      return;
    }
    const scrollingElement = document.scrollingElement || document.documentElement;
    const parentTop = this.parent.getBoundingClientRect().top;
    const width = this.parent.offsetWidth;
    if (this.getDropdownLocation() === 'bottom') {
      this.el.style.top =
        parentTop + scrollingElement.scrollTop + this.parent.offsetHeight + 2 + 'px';
      this.el.style.left = this.parent.getBoundingClientRect().left + 'px';
    } else {
      this.el.style.bottom = window.innerHeight - parentTop + 2 + 'px';
      this.el.style.left = this.parent.getBoundingClientRect().left + 'px';
    }
    this.el.style.width = (this.minWidth < width ? width : this.minWidth) + 'px';
  }

  getDropdownLocation(): 'bottom' | 'top' {
    if (this.position === 'absolute' || !this.parent) {
      return 'bottom';
    }
    const dropdownHeight = 339;
    if (this.isFirstOpen) {
      this.openPosition =
        this.inputEnabled ||
        window.innerHeight -
        (this.parent.getBoundingClientRect().top +
          this.parent.offsetHeight +
          2 +
          dropdownHeight) >
        0
          ? 'bottom'
          : 'top';
      this.isFirstOpen = false;
    }
    return this.openPosition;
  }

  render(): HTMLElement {
    const Selector = this.contentElement;
    return (
      <Host
        role="dialog"
        aria-modal="true"
        style={{
          zIndex: `${20000 + this.overlayIndex}`,
          '--filter-padding-left': 'var(--filter-padding-left-' + this.size + ')',
          '--filter-padding-right': 'var(--filter-padding-right-' + this.size + ')',
          '--filter-padding-top': 'var(--filter-padding-top-' + this.size + ')',
          '--filter-padding-bottom': 'var(--filter-padding-bottom-' + this.size + ')',
          '--filter-font-size': 'var(--filter-font-size-' + this.size + ')',
          '--filter-line-height': 'var(--filter-line-height-' + this.size + ')',
        }}
        class={{
          [this.size]: true,
          'absolute-dropdown': this.position === 'absolute',
        }}
      >
        <div class="dropdown-wrapper">
          <div class="select-dropdown-wrapper">
            {this.inputEnabled && (
              <div class="input-wrapper">
                <input
                  ref={(el) => {
                    this.input = el;
                  }}
                  onFocus={async () => {
                    await this.updatePosition();
                  }}
                  onBlur={async () => {
                    await this.updatePosition();
                  }}
                  onKeyUp={async (ev: UIEvent) => {
                    await (this.parent as any).updateFilter(
                      (ev.target as HTMLInputElement).value
                    );
                  }}
                />
              </div>
            )}
            <Selector
              onButtonClick={async (ev: CustomEvent) => {
                await this.optionSelected(ev.detail);
              }}
              onDismiss={async (ev: CustomEvent) => {
                await this.dismiss(ev.detail[0], ev.detail[1]);
              }}
              size={this.size}
              localization={this.localization.content}
              optionElement={this.optionElement}
              dropdownComponent={this.el}
              isLoading={this.isLoading}
              options={[...this.options, ...this.actions]}
              value={this.value}
              params={{
                ...this.customOptionParams,
                selectedIconPosition: this.selectedIconPosition,
                selectedIconEnabled: this.selectedIconEnabled,
                selectedIcon: this.selectedIcon,
              }}
              {...this.customContentParams}

            />
          </div>
        </div>
      </Host>
    );
  }

  private async optionSelected(option: EuiOptionInterface): Promise<boolean> {
    if (!option || (option.disabled || this.beingDismissed || option.type === 'group-title')) {
      return;
    }
    const shouldDismiss = await SelectDropdown.callOptionHandler(option);
    if (shouldDismiss) {
      return this.dismiss(undefined, option.value);
    }
    return Promise.resolve(false);
  }

  private static async callOptionHandler(option: EuiOptionInterface | undefined): Promise<boolean> {
    if (option) {
      // a handler has been provided, execute it
      // pass the handler the values from the inputs
      const rtn = await safeCall(option.handler, option);
      if (rtn === false) {
        // if the return value of the handler is false then do not dismiss
        return false;
      }
    }
    return true;
  }
}
