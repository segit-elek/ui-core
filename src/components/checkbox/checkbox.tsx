import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State } from '@stencil/core';
import { ComponentSize } from '../../interface';
@Component({
  tag: 'eui-checkbox',
  styleUrl: 'checkbox.scss',
  scoped: true,
})
export class Checkbox {
  @Element() el: HTMLElement;

  /**
   * sets the name attribute of the inner input
   */
  @Prop({ reflect: true }) name?: string;

  /**
   * sets the label for the checkbox
   */
  @Prop({ reflect: true }) label?: string;

  /**
   * sets the size of the checkbox
   */
  @Prop({ reflect: true }) size?: ComponentSize = 'small';

  /**
   * sets and reflects the state of the checkbox
   * partial counts as unchecked
   */
  @Prop({ mutable: true, reflect: true }) checked?: boolean = false;

  /**
   * sets the visual for the partial checkbox
   * only unchecked inputs will shown as partial
   */
  @Prop({ mutable: true, reflect: true }) partial?: boolean = false;

  /**
   * disables the checkbox and the pointer events
   *
   * @type {string}
   */
  @Prop({ mutable: true, reflect: true }) disabled?: boolean;

  /**
   *  sets error design
   */
  @Prop({ mutable: true, reflect: true }) error?: boolean;

  @State() hasFocus: boolean = false;

  /**
   * Custom change event only fires if the change happened inside
   */
  @Event({ bubbles: true }) changed: EventEmitter<boolean>;

  checkChange(): void {
    if (!this.disabled) {
      if (this.partial) {
        this.checked = false;
        this.partial = false;
      } else {
        this.checked = !this.checked;
      }
      this.changed.emit(this.checked);
    }
  }

  @Listen('focus') focusHandler(): void {
      this.hasFocus = true;
  }
  @Listen('blur') blurHandler(): void {
    this.hasFocus = false;
  }
  @Listen('keydown') keydownHandler(ev: KeyboardEvent): void {
    if (this.hasFocus) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
      }
    }
  }

  @Listen('keyup') keyupHandler(ev: KeyboardEvent): void {
    if (this.hasFocus && !this.disabled) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        this.checkChange();
        // this.checked = !this.checked;
      }
    }
  }

  render(): HTMLEuiCheckboxElement {
    const props: any = {};
    if (!this.disabled) {
      props.tabindex = 0;
    }
    return (
      <Host
        {...props}
        class={{
          'has-label': !!this.label,
          'has-error': this.error,
          'disabled': this.disabled,
          'is-checked': this.checked,
          'is-partial': this.partial,
          'has-focus': this.hasFocus
        }}
        style={{
          '--padding': 'var(--padding-' + this.size + ')',
          '--label-font-size': 'var(--label-font-size-' + this.size + ')',
          '--checkmark-size': 'var(--checkmark-size-' + this.size + ')',
          '--checkmark-padding': 'var(--checkmark-padding-' + this.size + ')',
          '--border-width': 'var(--border-width-' + this.size + ')',
          '--checkmark-stroke': 'var(--checkmark-stroke-' + this.size + ')',
          '--distance': 'var(--distance-' + this.size + ')',
          '--border-color': this.disabled ?
            (
              (this.checked || this.partial)  ?
                'var(--border-color-disabled-checked)' :
                'var(--border-color-default)'
            ) : (
              (this.checked || this.partial)  ?
                'var(--border-color-checked)' :
                'var(--border-color-default)'
            )
        }}

      >
        <label class="container"
               onClick={this.checkChange.bind(this)}>
          {/*<input*/}
          {/*  type="checkbox"*/}
          {/*  name={this.name}*/}
          {/*  disabled={this.disabled}*/}
          {/*  checked={this.checked}*/}
          {/*  onChange={this.checkChange.bind(this)}*/}
          {/*  value={''}*/}
          {/*/>*/}
          <div class="checkmark-outer"
               >
          <span class="checkmark">
            {this.checked && <eui-icon class="check" icon={'check'}/>}
            {!this.checked && this.partial && <eui-icon class="check" icon={'minus'}/>}
          </span>
          </div>
          {this.label && <span class="checkbox-label">{this.label}</span>}
        </label>
      </Host>
    );
  }
}
