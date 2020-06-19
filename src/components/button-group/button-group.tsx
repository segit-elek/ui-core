import { Component, Element, h } from '@stencil/core';

@Component({
  tag: 'eui-button-group',
  styleUrl: 'button-group.scss',
  scoped: true,
})
export class ButtonGroup {
  @Element() el: HTMLElement;

  render(): HTMLEuiButtonGroupElement {
    const children = Array.from(this.el.children);
    children.forEach((child: HTMLElement, index) => {
      child.classList.add('grouped');
      if (index === 0) {
        child.classList.add('first');
      }
      if (index === children.length - 1) {
        child.classList.add('last');
      }
    });
    return <slot />;
  }
}
