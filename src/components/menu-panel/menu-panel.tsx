import { Component, h, Host, Prop } from '@stencil/core';
import { ComponentSize } from '../../interface';

@Component({
  tag: 'eui-menu-panel',
  styleUrl: 'menu-panel.scss',
  scoped: true,
})
export class MenuPanel {
  /**
   * sets the name of the menu panel
   */
  @Prop({ reflect: true }) panelName!: string;

  /**
   * sets the size of the component can be 'small', 'medium' or 'large' defaults to 'small'
   */
  @Prop() size?: ComponentSize = 'small';

  /**
   * Makes the panel headerless
   * @type {boolean}
   */
  @Prop({ reflect: true, mutable: true }) headerless?: boolean = false;

  /**
   * sets the title of the panel
   * @type {string}
   */
  @Prop({ reflect: true }) panelTitle?: string;

  render(): HTMLEuiMenuPanelElement {
    return (
      <Host
        style={{
          '--padding': 'var(--padding-' + this.size + ')',
          '--title-font-size': 'var(--title-font-size-' + this.size + ')',
          '--height': 'var(--height-' + this.size + ')',
          '--left-margin': 'var(--left-margin-' + this.size + ')',
        }}
      >
        {this.headerless ? null : (
          <div class="header">
            <div class="header-left">
              <slot name="header-left" />
              {this.panelTitle ? <span class="title">{this.panelTitle}</span> : null}
            </div>
            <div class="header-right">
              <slot name="header-right" />
            </div>
          </div>
        )}
        <slot />
      </Host>
    );
  }
}
