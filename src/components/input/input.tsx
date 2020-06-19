import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { findItemLabel } from '../../utils/helpers';
import { EuiInputChangeEventDetails, InputModes } from './interfaces';
import { ComponentSize, TextFieldTypes } from '../../interface';

let inputIds = 0;

@Component({
  tag: 'eui-input',
  styleUrl: 'input.scss',
  scoped: true,
})
export class Input implements ComponentInterface {
  @State() hasFocus: boolean = false;

  @Element() el!: HTMLEuiInputElement;

  /**
   * If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.
   */
  @Prop() accept?: string;

  /**
   * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
   * @type {('off' | 'none' | 'on' | 'sentences' | 'words' | 'characters')}
   */
  @Prop() autocapitalize: string = 'off';

  /**
   * If set true clears error state on the input when focused
   */
  @Prop() clearErrorOnFocus: boolean = true;

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: 'on' | 'off' = 'off';

  /**
   * Whether auto correction should be enabled when the user is entering/editing the text value.
   */
  @Prop() autocorrect: 'on' | 'off' = 'off';

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop() autofocus: boolean = false;

  /**
   * If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input.
   */
  @Prop() clearInput: boolean = false;

  /**
   * If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.
   */
  @Prop() clearOnEdit?: boolean;

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop() disabled: boolean = false;

  /**
   * A hint to the browser for which keyboard to display.
   * Possible values: `"none"`, `"text"`, `"tel"`, `"url"`,
   * `"email"`, `"numeric"`, `"decimal"`, and `"search"`.
   */
  @Prop() inputmode?: InputModes;

  /**
   * The maximum value, which must not be less than its minimum (min attribute) value.
   */
  @Prop() max?: string;

  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
   */
  @Prop() maxlength?: number;

  /**
   * The minimum value, which must not be greater than its maximum (max attribute) value.
   */
  @Prop() min?: string;

  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
   */
  @Prop() minlength?: number;

  /**
   * If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"` or `"file"`, otherwise it is ignored.
   */
  @Prop() multiple?: boolean;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = `eui-input-${inputIds++}`;

  /**
   * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
   */
  @Prop() pattern?: string;

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder?: string | null;

  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop() readonly: boolean = false;

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required: boolean = false;

  /**
   * If `true`, the element will have its spelling and grammar checked.
   */
  @Prop() spellcheck: boolean = false;

  /**
   * Works with the min and max attributes to limit the increments at which a value can be set.
   * Possible values are: `"any"` or a positive floating point number.
   */
  @Prop() step?: string;

  /**
   * sets the size of the input can be 'small', 'medium' or 'large' defaults to 'small'
   */
  @Prop() size?: ComponentSize = 'small';

  /**
   * The type of control to display. The default type is text.
   */
  @Prop() type: TextFieldTypes = 'text';

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: string | null | number = '';

  /**
   * True if input is part of an eui-field
   * @internal
   */
  @Prop({ mutable: true }) isField?: boolean = false;

  /**
   * if set true it enables error state for the input
   */
  @Prop({mutable: true, reflect: true}) error?: boolean;

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() euiInput!: EventEmitter<KeyboardEvent>;

  /**
   * Emitted when the value has changed.
   */
  @Event() euiChange!: EventEmitter<EuiInputChangeEventDetails>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() euiBlur!: EventEmitter<void>;

  /**
   * Emitted when the input has focus.
   */
  @Event() euiFocus!: EventEmitter<void>;

  private nativeInput?: HTMLInputElement;
  private didBlurAfterEdit: boolean = false;

  @Watch('value') valueWatcher(newValue: unknown): void {
    console.log('input value changed: ', newValue);
  }

  @Listen('click') clickHandler(): void {
    this.nativeInput.focus();
  }

  /**
   * Calls the focus on the underlying input
   * @return {Promise<void>}
   */
  @Method()
  async focusInput(): Promise<void> {
    this.nativeInput.focus();
  }

  /**
   * Returns the focus state
   * @return {Promise<boolean>}
   */
  @Method()
  async getFocusState(): Promise<boolean> {
    return this.hasFocus;
  }

  /**
   * Sets focus on the specified `eui-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus(): Promise<void> {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  async getInputElement(): Promise<HTMLInputElement> {
    return this.nativeInput!;
  }

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  valueChanged(): void {
    this.euiChange.emit({ value: this.value });
  }

  render(): HTMLEuiInputElement {
    const value = this.getValue();
    const labelId = this.name + '-lbl';
    if (this.isField) {
      const label = findItemLabel(this.el);
      if (label) {
        label.id = labelId;
      }
    }

    return (
      <Host
        style={{
          '--padding-left': 'var(--padding-left-' + this.size + ')',
          '--padding-right': 'var(--padding-right-' + this.size + ')',
          '--padding-top': 'var(--padding-top-' + this.size + ')',
          '--padding-bottom': 'var(--padding-bottom-' + this.size + ')',
          '--icon-size': 'var(--icon-size-' + this.size + ')',
          '--icon-padding': 'var(--icon-padding-' + this.size + ')',
          '--trailing-content-right-margin':
            'var(--trailing-content-right-margin-' + this.size + ')',
          '--font-size': 'var(--font-size-' + this.size + ')',
          '--line-height': 'var(--line-height-' + this.size + ')',
        }}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          [this.size]: true,
          'has-value': this.hasValue(),
          'has-focus': this.hasFocus,
          'has-error': this.clearErrorOnFocus ? !this.hasFocus && this.error : this.error,
          'is-readonly': this.readonly,
          'is-disabled': this.disabled,
        }}
      >
        <div class="leading">
          <slot name="leading" />
        </div>
        <div class="main">
          <input
            class="native-input"
            ref={(input) => (this.nativeInput = input)}
            aria-labelledby={labelId}
            disabled={this.disabled}
            accept={this.accept}
            autocapitalize={this.autocapitalize}
            autocomplete={this.autocomplete}
            spellcheck={this.spellcheck}
            autofocus={this.autofocus}
            inputmode={this.inputmode}
            min={this.min}
            max={this.max}
            minlength={this.minlength}
            maxlength={this.maxlength}
            multiple={this.multiple}
            name={this.name}
            pattern={this.pattern}
            placeholder={this.placeholder || ''}
            readonly={this.readonly}
            required={this.required}
            step={this.step}
            type={this.type}
            value={value}
            onInput={this.onInput}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onKeyDown={this.onKeydown}
          />
        </div>
        {this.clearInput && !this.readonly && !this.disabled && (
          <button
            type="button"
            class="input-clear-icon"
            tabindex="-1"
            onTouchStart={this.clearTextInput}
            onMouseDown={this.clearTextInput}
          />
        )}
        <div class="trailing">
          <slot name="trailing" />
        </div>
      </Host>
    );
  }

  private shouldClearOnEdit(): boolean {
    const { type, clearOnEdit } = this;
    return clearOnEdit === undefined ? type === 'password' : clearOnEdit;
  }

  private getValue(): string {
    return typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString();
  }

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
    this.euiInput.emit(ev as KeyboardEvent);
  };

  private onBlur = () => {
    this.hasFocus = false;
    this.focusChanged();

    this.euiBlur.emit();
  };

  private onFocus = () => {
    this.hasFocus = true;
    this.focusChanged();
    this.euiFocus.emit();
  };

  private onKeydown = () => {
    if (this.shouldClearOnEdit()) {
      // Did the input value change after it was blurred and edited?
      if (this.didBlurAfterEdit && this.hasValue()) {
        // Clear the input
        this.clearTextInput();
      }

      // Reset the flag
      this.didBlurAfterEdit = false;
    }
  };

  private clearTextInput = (ev?: Event) => {
    if (this.clearInput && !this.readonly && !this.disabled && ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }

    this.value = '';

    /**
     * This is needed for clearOnEdit
     * Otherwise the value will not be cleared
     * if user is inside the input
     */
    if (this.nativeInput) {
      this.nativeInput.value = '';
    }
  };

  private focusChanged(): void {
    // If clearOnEdit is enabled and the input blurred but has a value, set a flag
    if (!this.hasFocus && this.shouldClearOnEdit() && this.hasValue()) {
      this.didBlurAfterEdit = true;
    }
  }

  private hasValue(): boolean {
    return this.getValue().length > 0;
  }
}
