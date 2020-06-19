import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import {ComponentSize} from "../../interface";

@Component({
  tag: 'eui-radio',
  styleUrl: 'radio.scss',
  scoped: true,
})
export class Radio {
  @Element() el: HTMLElement;

  /**
   * sets the name of the inner radio input
   */
  @Prop() name?: string;

  /**
   * sets the label of the inner radio input
   */
  @Prop() label?: string;

  /**
   * sets the value of the inner radio input
   */
  @Prop() value?: number | string | string[];

  /**
   * sets the size of the component can be 'small', 'medium' or 'large' defaults to 'small'
   */
  @Prop() size?: ComponentSize = 'small';

  /**
   * sets and reflects the state of the radio element
   */
  @Prop({ mutable: true, reflect: true }) checked?: boolean = false;

  /**
   * disable the radio element
   */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /**
   * emits the state of the radio element
   */
  @Event({ bubbles: true }) euiRadioChange: EventEmitter<{
    name: string;
    value: number | string | string[];
  }>;

  changeHandler(): void {
    this.euiRadioChange.emit({
      name: this.name,
      value: this.value,
    });
  }

  render(): HTMLEuiRadioElement {
    return (
      <Host
        class={{
          'has-label': !!this.label,
        }}
        style={{
          '--label-font-size': 'var(--label-font-size-' + this.size + ')',
          '--checkmark-size': 'var(--checkmark-size-' + this.size + ')',
          '--padding': 'var(--padding-' + this.size + ')',
          '--icon-size': 'var(--icon-size-' + this.size + ')',
          '--distance': 'var(--distance-' + this.size + ')',
        }}
      >
        <label class="container">
          <input
            type="radio"
            disabled={this.disabled}
            checked={this.checked}
            name={this.name}
            value={this.value}
            onChange={() => this.changeHandler()}
          />
          <span class="radio" />
          {this.label ? <span class="radio-label">{this.label}</span> : null}
        </label>
      </Host>
    );
  }
}
