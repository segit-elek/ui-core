import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  Listen,
  Prop,
} from '@stencil/core';
import { ComponentSize } from '../../interface';

@Component({
  tag: 'eui-button-menu',
  styleUrl: 'button-menu.scss',
  scoped: true,
})
export class ButtonMenu implements ComponentInterface {
  @Element() el: HTMLElement;

  /**
   * sets the label of the eui-button-menu
   *
   * @type {string}
   */
  @Prop({ reflect: true }) text?: string = '';

  /**
   * sets the styling of the eui-button-menu
   *
   * @type {string}
   */
  @Prop({ reflect: true }) type?: 'primary' | 'brand' | 'outlined' | 'text' = 'outlined';

  /**
   * sets the size of the eui-button-menu
   *
   * @type {string}
   */
  @Prop({ reflect: true }) size?: ComponentSize = 'small';

  /**
   * sets and reflects the state of the dropdown inside the button menu
   * @type {boolean}
   */
  @Prop({ reflect: true, mutable: true }) isDropdownOpen?: boolean = false;

  /**
   * sets the parent element for the eui-button-menu's dropdown
   * @type {HTMLElement}
   */
  @Prop({ mutable: true }) dropdownParent?: HTMLElement = document.body;

  /**
   * sets the width of the dropdown
   * @type {(string | number)}
   */
  @Prop() dropdownWidth?: number | string = 150;

  /**
   * sets the alignment of the dropdown
   * @type {('left' | 'right')}
   */
  @Prop({ reflect: true }) dropdownAlignment?: 'left' | 'right' = 'left';

  /**
   * @internal
   * @param {CustomEvent<boolean>} ev
   */
  @Listen('dropdownStateChanged', { target: 'parent' })
  documentClickListener(ev: CustomEvent<boolean>): void {
    this.isDropdownOpen = ev.detail;
  }

  render(): HTMLEuiButtonMenuElement {
    return (
      <Host>
        <eui-dropdown-wrapper
          isDropdownOpen = {this.isDropdownOpen}
          dropdownParent = {this.dropdownParent}
          dropdownWidth = {this.dropdownWidth}
          dropdownAlignment = {this.dropdownAlignment}
        >
          <eui-button
            slot={'parent'}
            size={this.size}
            type={this.type}
            text={this.text}
            active={this.isDropdownOpen}
          >
            <span slot="leading">
              <slot name="button-leading" />
            </span>
            <span>
              <slot name="button-default" />
            </span>
            <span slot="trailing">
              <slot name="button-trailing" />
            </span>
          </eui-button>
          <slot/>
        </eui-dropdown-wrapper>
      </Host>
    );
  }
}
