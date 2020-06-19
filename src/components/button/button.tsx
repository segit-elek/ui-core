import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import { Icons } from '../icon/icon';
import { ComponentSize } from '../../interface';

@Component({
  tag: 'eui-button',
  styleUrl: 'button.scss',
  scoped: true,
})
export class Button {
  @Element() el: HTMLElement;

  /**
   * sets a text label for the button
   */
  @Prop({ reflect: true }) text?: string;

  /**
   * sets the styling of the button
   *
   * @type 'raised' | 'outlined' | 'text' | 'brand'
   */
  @Prop({ reflect: true }) type?: 'primary' | 'outlined' | 'text' | 'brand' = 'outlined';

  /**
   * if set button will render as an icon button disregarding leadingIcon trailingIcon and text
   * @type Icons
   */
  @Prop() buttonIcon: Icons;

  /**
   * sets the leading icon for the component
   */
  @Prop() leadingIcon: Icons;
  /**
   * sets the trailing icon for the component
   */
  @Prop() trailingIcon: Icons;

  /**
   * sets the size of the button
   *
   * @type ComponentSize
   */
  @Prop({ reflect: true }) size?: ComponentSize = 'small';

  /**
   * disables the button
   */
  @Prop({ reflect: true }) disabled?: boolean;
  /**
   * active state for the button
   */
  @Prop({ reflect: true }) active?: boolean;

  @State() hasFocus: boolean = false;

  @Listen('focus') focusHandler(): void {
    this.hasFocus = true;
  }

  @Listen('blur') blurHandler(): void {
    this.hasFocus = false;
  }

  @Listen('keydown') keydownHandler(ev: KeyboardEvent): void {
    if (this.hasFocus && !this.disabled) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.stopPropagation();
        ev.preventDefault();
      }
    }
  }
  @Listen('keyup') keyupHandler(ev: KeyboardEvent): void {
    if (this.hasFocus && !this.disabled) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.stopPropagation();
        ev.preventDefault();
        this.el.click();
      }
    }
  }

  render(): HTMLEuiButtonElement {
    return (
      <Host
        tabindex={0}
        class={{
          'disabled': this.disabled,
          'active': this.active,
          'has-focus': this.hasFocus,
          [this.type]: true,
          [this.size]: true,
        }}
        style={{
          '--font-size': 'var(--font-size-' + this.size + ')',
          '--icon-size': 'var(--icon-size-' + this.size + ')',
          '--line-height': 'var(--line-height-' + this.size + ')',
          '--padding': this.buttonIcon ? 'var(--type-icon-padding-' + this.size + ')' : 'var(--padding-' + this.size + ')',
          '--icon-padding': 'var(--icon-padding-' + this.size + ')',
          '--icon-distance-outer': 'var(--icon-distance-outer-' + this.size + ')',
          '--icon-distance-inner': 'var(--icon-distance-inner-' + this.size + ')',
          '--type-icon-padding': 'var(--type-icon-padding-' + this.size + ')',

          '--color': 'var(--color-' + this.type + ')',
          '--background': 'var(--background-' + this.type + ')',
          '--shadow': 'var(--shadow-' + this.type + ')',
          '--color-hover': 'var(--color-hover-' + this.type + ')',
          '--background-hover': 'var(--background-hover-' + this.type + ')',
          '--shadow-hover': 'var(--shadow-hover-' + this.type + ')',
          '--color-active': 'var(--color-active-' + this.type + ')',
          '--background-active': 'var(--background-active-' + this.type + ')',
          '--shadow-active': 'var(--shadow-active-' + this.type + ')',
          '--color-disabled': 'var(--color-disabled-' + this.type + ')',
          '--background-disabled': 'var(--background-disabled-' + this.type + ')',
          '--shadow-disabled': 'var(--shadow-disabled-' + this.type + ')',
          '--border-color': 'var(--border-color-' + this.type + ')',
          '--border-color-hover': 'var(--border-color-hover-' + this.type + ')',
          '--border-color-active': 'var(--border-color-active-' + this.type + ')',
          '--border-color-disabled': 'var(--border-color-disabled-' + this.type + ')',
          '--icon-color': 'var(--icon-color-' + this.type + ')',
          '--icon-color-hover': 'var(--icon-color-hover-' + this.type + ')',
          '--icon-color-active': 'var(--icon-color-active-' + this.type + ')',
          '--icon-color-disabled': 'var(--icon-color-disabled-' + this.type + ')',
        }}
      >
        <div class="inner-wrapper">
          {
            this.buttonIcon ? (
              <eui-icon class="icon" icon={this.buttonIcon}/>
            ) : [
              this.leadingIcon && <eui-icon class="icon leading" icon={this.leadingIcon}/>,
              this.text ? <span class="button-label">{this.text}</span> : null,
              <slot />,
              this.trailingIcon && <eui-icon class="icon trailing" icon={this.trailingIcon}/>
            ]
          }

        </div>
      </Host>
    );
  }
}
