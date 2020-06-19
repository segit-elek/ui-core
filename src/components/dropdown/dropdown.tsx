import { Component, Element, Event, EventEmitter, h, Host, Prop, Watch } from '@stencil/core';
import { ComponentSize } from '../../interface';

@Component({
  tag: 'eui-dropdown',
  styleUrl: 'dropdown.scss',
  scoped: true,
})
export class Dropdown {
  @Element() el: HTMLElement;

  /**
   * sets the size of the component can be 'small', 'medium' or 'large' defaults to 'small'
   */
  @Prop() size?: ComponentSize = 'small';

  /**
   * sets the position of the dropdown
   * @type {{}}
   */
  @Prop() position?: { top?: number; right?: number; bottom?: number; left?: number } = {};

  /**
   * sets and reflects the state of the dropdown
   * @type {boolean}
   */
  @Prop({ reflect: true, mutable: true }) isOpen: boolean = false;

  /**
   * sets and reflects the width of the dropdown
   * @type {boolean}
   */
  @Prop({ reflect: true, mutable: true }) width: string = null;

  /**
   * sets and reflects the identifier of the opener
   * @type {null}
   */
  @Prop({ reflect: true, mutable: true }) openerId: string = null;

  /**
   * Emits an event when the state of the dropdown changed
   */
  @Event({ bubbles: true }) openStateChange: EventEmitter<boolean>;

  @Watch('isOpen')
  isOpenChanged(newVal: boolean): void {
    if (newVal !== null) {
      this.openStateChange.emit(newVal);
    }
  }

  render(): HTMLEuiDropdownElement {
    return (
      <Host
        style={{
          top: this.position.top ? this.position.top + 'px' : 'initial',
          left: this.position.left ? this.position.left + 'px' : 'initial',
          right: this.position.right ? this.position.right + 'px' : 'initial',
          bottom: this.position.bottom ? this.position.bottom + 'px' : 'initial',
          width: this.width,
          display: this.isOpen ? 'block' : 'initial',
          opacity: this.isOpen ? '1' : '0',
          transform: this.isOpen ? 'scale(1)' : 'scale(0.95)',
          '--font-size': 'var(--font-size-' + this.size + ')',
        }}
      >
        <slot />
      </Host>
    );
  }
}
