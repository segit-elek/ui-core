import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop } from '@stencil/core';

export interface RadioGroupValue {
  value: number | string | string[];
  label: string;
  disabled?: boolean;
}

@Component({
  tag: 'eui-radio-group',
  styleUrl: 'radio-group.scss',
  scoped: true,
})
export class RadioGroup {
  @Element() el: HTMLEuiRadioGroupElement;

  /**
   * sets the name of the inner radios
   */
  @Prop({ mutable: true, reflect: true }) name: string;

  /**
   * sets and reflects the selected value of the inner radios
   */
  @Prop({ mutable: true, reflect: true }) value: number | string | string[];

  /**
   * sets values and label and availability of the radios
   * @type {RadioGroupValue[]}
   */
  @Prop({ mutable: true, reflect: true }) values: RadioGroupValue[] = [];

  /**
   * emits an event when a radio button with the same name changed in it
   */
  @Event({ bubbles: true }) euiRadioGroupChange: EventEmitter<{
    name: string;
    value: number | string | string[];
  }>;

  /**
   * listens to euiRadioChange events with the same name in it and changes it's value based on that
   *
   * @param {CustomEvent<{name: string, value: number | string | string[]}>} ev
   */
  @Listen('euiRadioChange')
  euiChangeHandler(
    ev: CustomEvent<{
      name: string;
      value: number | string | string[];
    }>
  ): void {
    if (ev.detail.name === this.name) {
      ev.stopPropagation();
      this.value = ev.detail.value;
      this.euiRadioGroupChange.emit({
        name: this.name,
        value: this.value,
      });
    }
  }

  render(): HTMLEuiRadioGroupElement {
    return (
      <Host>
        <slot />
        {this.values.map((val) => {
          return (
            <eui-radio
              name={this.name}
              label={val.label}
              value={val.value}
              disabled={val.disabled}
              checked={this.value === val.value}
            />
          );
        })}
      </Host>
    );
  }
}
