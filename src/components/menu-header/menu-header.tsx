import { Component, Element, h, Host, Prop } from '@stencil/core';
import { ComponentSize } from '../../interface';

@Component({
  tag: 'eui-menu-header',
  styleUrl: 'menu-header.scss',
  scoped: true,
})
export class MenuHeader {
  @Element() el: HTMLElement;

  /**
   * sets the size of the component can be 'small', 'medium' or 'large' defaults to 'small'
   */
  @Prop() size?: ComponentSize = 'small';

  /**
   * sets the level of indent
   */
  @Prop() indent: number = 0;

  /**
   * the amount by which each level is indented to the previous level
   */
  @Prop() indentAmount: number = 12;

  render(): HTMLEuiMenuHeaderElement {
    return (
      <Host
        style={{
          paddingLeft: this.indentAmount * ((this.indent || 0) + 1) + 'px',
          '--height': 'var(--height' + this.size + ')',
          '--padding': 'var(--padding' + this.size + ')',
          '--font-size': 'var(--font-size' + this.size + ')',
          '--letter-spacing': 'var(--letter-spacing' + this.size + ')',
        }}
      >
        <slot />
      </Host>
    );
  }
}
