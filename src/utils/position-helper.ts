export function getScrollLeft(elem: HTMLElement, from: HTMLElement = document.body): number {
  let scrollLeft = 0;
  do {
    if (!isNaN(elem.scrollLeft)) {
      scrollLeft += elem.scrollLeft;
    }
    elem = elem.parentElement;
  } while (elem && elem !== from);
  return scrollLeft;
}

export function getScrollTop(elem: HTMLElement, from: HTMLElement = document.body): number {
  let scrollTop = 0;
  do {
    if (!isNaN(elem.scrollTop)) {
      scrollTop += elem.scrollTop;
    }
    elem = elem.parentElement;
  } while (elem && elem !== from);
  return scrollTop;
}

export function getOffsetLeft(elem: HTMLElement, from: HTMLElement = document.body): number {
  let offsetLeft = 0;
  do {
    if (!isNaN(elem.offsetLeft)) {
      offsetLeft += elem.offsetLeft;
    }
    elem = elem.offsetParent as HTMLElement;
  } while (elem && elem !== from);
  return offsetLeft;
}

export function getOffsetTop(elem: HTMLElement, from: HTMLElement = document.body): number {
  let offsetTop = 0;
  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop;
    }
    elem = elem.offsetParent as HTMLElement;
  } while (elem && elem !== from);
  return offsetTop;
}
