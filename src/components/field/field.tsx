import { Component, Element, h, Host, Listen, Method, Prop } from '@stencil/core';
import { ComponentSize } from '../../interface';

export type ValidatorFunction = (value: string) => { message: string; isValid: boolean };

@Component({
  tag: 'eui-field',
  styleUrl: 'field.scss',
  scoped: true,
})
export class EuiField {
  @Element() el: HTMLEuiFieldElement;

  /**
   * label that is to be displayed infront of over the component
   *
   * @type string
   */
  @Prop({ mutable: true, reflect: true }) label: string = null;

  /**
   * sets the label style of the component
   *
   * @type {'strong' | 'default'}
   */
  @Prop() labelStyle: 'strong' | 'default' = 'default';

  /**
   * passes on disabled state to the component
   */
  @Prop({ mutable: true, reflect: true }) disabled: boolean;

  /**
   * sets size on child component
   */
  @Prop({ mutable: true, reflect: true }) size: ComponentSize = 'small';

  /**
   * error message that is to be displayed
   */
  @Prop({reflect: true}) error?: string;

  /**
   * message to be displayed in case of error
   */
  @Prop() errorDisplayType?: 'always' | 'onError' = 'always';

  @Listen('euiError') euiErrorHandler(ev: CustomEvent): void {
    this.error = ev.detail;
  }

  /**
   * Sets the error for the field
   *
   * @param {string} error
   * @return {Promise<void>}
   */
  @Method() async setError(error: string): Promise<void> {
    this.error = error;
  }
  render(): HTMLEuiFieldElement {
    return (
      <Host
        style={{
          '--label-line-height': 'var(--label-line-height-' + this.size + ')',
          '--error-line-height': 'var(--error-line-height-' + this.size + ')',
          '--label-font-size': 'var(--label-font-size-' + this.size + ')',
          '--error-font-size': 'var(--error-font-size-' + this.size + ')',
          '--label-distance': 'var(--label-distance-' + this.size + ')',
          '--error-distance': 'var(--error-distance-' + this.size + ')',
        }}
        class={{
          [this.size]: true,
          'label-above': true,
          'emphasised-label': this.labelStyle === 'strong',
        }}
      >
        {this.label && <label class="field-label">{this.label}</label>}
        <div style={{ width: '100%' }}>
          <div class="content">
            <slot/>
          </div>
          {this.isErrorZoneDisplayed() && (
            <div class="error-message">
              {this.error}
            </div>
          )}
        </div>
      </Host>
    );
  }

  isErrorZoneDisplayed(): boolean {
    return this.errorDisplayType === 'always' || !!this.error;
  }
}
