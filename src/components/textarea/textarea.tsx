import {
  Build,
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
import { EuiTextareaChangeEventDetails } from './interfaces';
import { ComponentSize } from '../../interface';

let inputIds = 0;

@Component({
  tag: 'eui-textarea',

  styleUrl: 'textarea.scss',
  scoped: true,
})
export class EuiTextarea implements ComponentInterface {
  @State() hasFocus: boolean = false;

  @Element() el!: HTMLElement;

  /**
   * If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input.
   */
  @Prop() clearInput: boolean = false;

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop() disabled: boolean = false;

  /**
   * If set true clears error state on the input when focused
   */
  @Prop() clearErrorOnFocus: boolean = true;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = `eui-input-${inputIds++}`;

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
   * sets the size of the input can be 'small', 'medium' or 'large' defaults to 'small'
   */
  @Prop() size?: ComponentSize = 'small';

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: string = '';

  /**
   * True if input is part of an eui-field
   */
  @Prop({ mutable: true }) isField?: boolean = false;

  /**
   * if set true it enables error state for the input
   */
  @Prop() error?: boolean;

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() euiInput: EventEmitter<KeyboardEvent>;

  /**
   * Emitted when the value has changed.
   */
  @Event() euiChange: EventEmitter<EuiTextareaChangeEventDetails>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() euiBlur: EventEmitter<void>;

  /**
   * Emitted when the input has focus.
   */
  @Event() euiFocus: EventEmitter<void>;

  /**
   * Emitted when the input has been created.
   * @internal
   */
  @Event() euiInputDidLoad: EventEmitter<void>;

  /**
   * Emitted when the input has been removed.
   * @internal
   */
  @Event() euiInputDidUnload: EventEmitter<void>;

  private nativeInput?: HTMLTextAreaElement;

  @Listen('click') clickHandler(): void {
    this.nativeInput.focus();
  }

  /**
   * Focuses the inner input
   *
   * @return {Promise<void>}
   */
  @Method() focusInput(): Promise<void> {
    this.nativeInput.focus();
    return;
  }

  connectedCallback(): void {
    if (Build.isBrowser) {
      this.el.dispatchEvent(
        new CustomEvent('euiInputDidLoad', {
          detail: this.el,
        })
      );
    }
  }

  disconnectedCallback(): void {
    if (Build.isBrowser) {
      document.dispatchEvent(
        new CustomEvent('euiInputDidUnload', {
          detail: this.el,
        })
      );
    }
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
  getInputElement(): Promise<HTMLTextAreaElement> {
    return Promise.resolve(this.nativeInput!);
  }

  render(): HTMLEuiTextareaElement {
    const value = this.value;
    const labelId = this.name + '-lbl';
    if (this.isField) {
      const label = findItemLabel(this.el);
      if (label) {
        label.id = labelId;
      }
    }

    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          [this.size]: true,
          'has-value': this.hasValue(),
          'has-focus': this.hasFocus,
          'has-error': this.clearErrorOnFocus ? !this.hasFocus && this.error : this.error,
          'is-readonly': this.readonly,
          'is-disabled': this.disabled,
        }}
        style={{
          '--padding-left': 'var(--padding-left-' + this.size + ')',
          '--padding-right': 'var(--padding-right-' + this.size + ')',
          '--padding-top': 'var(--padding-top-' + this.size + ')',
          '--padding-bottom': 'var(--padding-bottom-' + this.size + ')',
          '--font-size': 'var(--font-size-' + this.size + ')',
          '--line-height': 'var(--line-height-' + this.size + ')',
        }}
      >
        <textarea
          class="native-input"
          ref={(input) => (this.nativeInput = input)}
          aria-labelledby={labelId}
          disabled={this.disabled}
          name={this.name}
          placeholder={this.placeholder || ''}
          readonly={this.readonly}
          required={this.required}
          value={value}
          onInput={this.onInput.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onFocus={this.onFocus.bind(this)}
        />
        {this.clearInput && !this.readonly && !this.disabled && (
          <button
            type="button"
            class="input-clear-icon"
            tabindex="-1"
            onTouchStart={this.clearTextInput.bind(this)}
            onMouseDown={this.clearTextInput.bind(this)}
          />
        )}
      </Host>
    );
  }

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged(): void {
    this.euiChange.emit({ value: this.value });
  }

  private onInput(ev: Event): void {
    const input = ev.target as HTMLTextAreaElement | null;
    if (input) {
      this.value = input.value || '';
    }
    this.euiInput.emit(ev as KeyboardEvent);
  }

  private onBlur(): void {
    this.hasFocus = false;
    this.euiBlur.emit();
  }

  private onFocus(): void {
    this.hasFocus = true;
    this.euiFocus.emit();
  }

  private clearTextInput(ev?: Event): void {
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
  }

  private hasValue(): boolean {
    return this.value && this.value !== '';
  }
}
