import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'eui-select-option',
  scoped: true,
  styleUrl: 'select-option.scss',
})
export class SelectOption implements ComponentInterface {
  @Element() el!: HTMLElement;

  /**
   * If `true`, the user cannot interact with the select option.
   */
  @Prop() disabled: boolean = false;

  /**
   * in case of grouped options this will be the group of the option
   */
  @Prop({ reflect: true }) group: string;

  /**
   * If `true`, the element is selected.
   */
  @Prop() selected: boolean = false;

  /**
   * The text value of the option.
   */
  @Prop() value?: string;

  private inputId: string = `eui-selopt-${selectOptionIds++}`;

  render(): HTMLEuiSelectOptionElement {
    return (
      <Host
        role="option"
        id={this.inputId}
      >
        <slot/>
      </Host>
    );
  }
}

let selectOptionIds = 0;
