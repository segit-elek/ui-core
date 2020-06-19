import { Component, Element, h, Host, Prop } from '@stencil/core';
import { ComponentSize } from '../../interface';

@Component({
  tag: 'eui-chip',
  styleUrl: 'chip.scss',
  scoped: true,
})
export class Chip {
  @Element() el: HTMLElement;

  /**
   * sets the label of the chip
   */
  @Prop({ reflect: true }) label: string;
  /**
   * if true the will have rounded edges
   */
  @Prop({ reflect: true }) rounded?: boolean;
  /**
   * sets the size of the component
   *
   * @type {ComponentSize}
   */
  @Prop({ reflect: true }) size?: ComponentSize = 'small';

  render(): HTMLEuiChipElement {
    return (
      <Host>
        <div class="leading">
          <slot name="leading" />
        </div>
        {this.label ? <span class="chip-label">{this.label}</span> : null}
        <slot />,
        <div class="trailing">
          <slot name="trailing" />
        </div>
        ,
      </Host>
    );
  }
}
