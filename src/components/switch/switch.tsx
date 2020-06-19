import { Prop, Event, Component, h, Host, EventEmitter, Listen, Element, ComponentInterface, State } from '@stencil/core';
import _ from 'lodash';
import { ComponentSize } from '../../interface';
import { Icons } from '../icon/icon';

@Component({
  tag: 'eui-switch',
  styleUrl: 'switch.scss',
  scoped: true,
})
export class Switch implements ComponentInterface {

  @Element() el: HTMLEuiSwitchElement;

  /**
   * enables icon display in the switch component
   * @type boolean
   * @default false
   */
  @Prop() displayIcons: boolean = false;

  /**
   * sets disabled state for the component
   * @type boolean
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * value of the component
   * @type boolean
   * @default false
   */
  @Prop({mutable: true}) checked: boolean = false;

  /**
   * label to be displayed next to the component if unset label is not displayed
   * @type string
   */
  @Prop() label: string;

  /**
   * position of the label
   * @type {'left' | 'right'}
   */
  @Prop() labelPosition: 'left' | 'right' = 'left';

  /**
   * helper text that is displayed under the component if unset it is not rendered
   *
   * @type string | {checked: string, unchecked: string}
   */
  @Prop() helper: string | {checked: string, unchecked: string};

  /**
   * size of the component
   *
   * @type ComponentSize
   */
  @Prop() size: ComponentSize = 'small';

  /**
   * icons that are displayed in the component
   *
   * @type { unchecked: Icons, checked: Icons }
   * @default { unchecked: 'x', checked: 'check' }
   */
  @Prop() icons: {
    unchecked: Icons,
    checked: Icons
  } = {
    unchecked: 'x',
    checked: 'check'
  };

  @State() hasFocus: boolean;

  /**
   * change event of the component
   * detail is the checked state
   */
  @Event() euiChange: EventEmitter;

  /**
   * emitted when the component is blured
   * detail is empty
   */
  @Event() euiBlur: EventEmitter;

  /**
   * emitted when the component is focused
   * detail is empty
   */
  @Event() euiFocus: EventEmitter;

  @Listen('focus') focusHandler(): void {
    this.hasFocus = true;
    this.euiFocus.emit();
  }

  @Listen('blur') blurHandler(): void {
    this.hasFocus = false;
    this.euiBlur.emit();
  }

  @Listen('keyup') keyupHandler(ev: KeyboardEvent): void {
    if (this.hasFocus) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        this.toggle();
      }
    }
  }

  toggle(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.euiChange.emit(this.checked);
    }
  }

  componentShouldUpdate(_newVal: unknown, _oldVal: unknown, propertyName: string): boolean {
    if (propertyName === 'checked') {
      return _newVal !== _oldVal;
    }
    return true;
  }

  componentWillRender(): Promise<void> | void {
    console.log('will render');
  }

  render(): HTMLEuiSwitchElement {
    return (
      <Host
        tabindex="0"
        style={{
          '--inner-height': 'var(--inner-height-' + this.size + ')',
          '--icon-stroke-width': 'var(--icon-stroke-width-' + this.size + ')',
          '--label-distance': 'var(--label-distance-' + this.size + ')',
          '--label-font-size': 'var(--label-font-size-' + this.size + ')',
          '--label-line-height': 'var(--label-line-height-' + this.size + ')',
          '--helper-font-size': 'var(--helper-font-size-' + this.size + ')',
          '--helper-line-height': 'var(--helper-line-height-' + this.size + ')',
          '--background-color': this.disabled ? 'var(--background-color-disabled)' : ( this.checked ? 'var(--background-color-active)' : 'var(--background-color-default)'),
          '--knob-color': this.disabled ? 'var(--knob-color-disabled)' : 'var(--knob-color-default)',
          '--label-color': this.disabled ? 'var(--label-color-disabled)' : 'var(--label-color-default)',
          '--helper-color': this.disabled ? 'var(--helper-color-disabled)' : 'var(--helper-color-default)'
        }}
        class={{
          'checked': this.checked,
          'disabled': this.disabled,
          'has-focus': this.hasFocus
        }}
      >
        <div class="wrapper">
          {
            this.label && this.labelPosition === 'left' && <div class="label-wrapper left">
              {
                this.label
              }
            </div>
          }
          <div class="outer-wrapper"
               onClick={this.toggle.bind(this)}
          >
            <div class="content">
              {
                this.displayIcons && <eui-icon
                  class={{
                    'icon': true,
                  }}
                  icon={this.icons[this.checked ? 'checked' : 'unchecked']}/>
              }
              <div class="knob"/>
            </div>
          </div>
          {
            this.label && this.labelPosition === 'right' && <div class="label-wrapper right">
              {
                this.label
              }
            </div>
          }
        </div>
        {
          this.helper && <div
            class={{
              'helper-wrapper': true,
              ...this.getHelperClass()
            }}>
            {
              _.isString(this.helper) ? this.helper : this.helper[this.checked ? 'checked' : 'unchecked']

            }
          </div>
        }
      </Host>
    );
  }
  getHelperClass(): {[key: string]: boolean} {
    if (this.label) {
      if (this.labelPosition === 'left') {
        return {'right': true};
      } else {
        return {'left': true};
      }
    }
    return {};
  }
}
