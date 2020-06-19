import { Component, h, Host, Prop } from '@stencil/core';
import { ComponentSize } from '../../interface';

@Component({
  tag: 'eui-item-counter',
  styleUrl: 'item-counter.scss',
  scoped: true,
})
export class ItemCounter {
  /**
   * Number of active items
   * @type {number}
   */
  @Prop({ reflect: true }) activeItem: number = 1;

  /**
   * sets the size of the component can be 'small', 'medium' or 'large' defaults to 'small'
   */
  @Prop() size?: ComponentSize = 'small';

  /**
   * Number of all item
   * @type {number}
   */
  @Prop({ reflect: true }) allItem: number = 1;

  render(): HTMLEuiItemCounterElement {
    return (
      <Host
        style={{
          '--font-size': 'var(--font-size-' + this.size + ')',
          '--line-height': 'var(--line-height-' + this.size + ')',
          '--selected-padding': 'var(--selected-padding-' + this.size + ')',
          '--item-margin': 'var(--item-margin-' + this.size + ')',
          '--selected-margin': 'var(--selected-margin-' + this.size + ')',
          '--icon-margin': 'var(--icon-margin-' + this.size + ')',
        }}
      >
        <span class="selected-page-number">{this.activeItem}</span>
        <span> of </span>
        <span class="all-page-number">{this.allItem}</span>
        <span> item{this.allItem === 1 ? '' : 's'}</span>
      </Host>
    );
  }
}
