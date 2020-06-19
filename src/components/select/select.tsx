import _ from 'lodash';
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

import {
  ComponentSize,
  CssClassMap,
  EuiOptionInterface,
  SelectChangeEventDetail,
  SelectDropdownOptions,
  SelectOptionInterface,
} from '../../interface';
import { findItemLabel } from '../../utils/helpers';
import { selectDropdownController } from '../../utils/overlays';
import { watchForOptions } from '../../utils/watch-options';

import { SelectCompareFn } from './select-interface';
import { ComponentStore } from '../../utils/component-store';

let selectIds: number = 0;

@Component({
  tag: 'eui-select',
  styleUrl: 'select.scss',
  scoped: true,
})
export class Select implements ComponentInterface {
  private get childOpts(): SelectOptionInterface[] {
    return [...(this.options || []), ...Array.from(this.el.querySelectorAll('eui-select-option'))];
  }

  @Element() el!: HTMLEuiSelectElement;

  /**
   * sets the parent of the dropdown
   * @type {HTMLElement}
   */
  @Prop() dropdownParent: HTMLElement = document.body;

  /**
   * if set true it enables error state for the select
   */
  @Prop() error?: boolean;

  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop() readonly: boolean = false;

  /**
   * If `true`, the user cannot interact with the select.
   */
  @Prop() options: SelectOptionInterface[] = null;

  /**
   * If `true`, the user cannot interact with the select.
   */
  @Prop() disabled: boolean = false;

  /**
   * If `true`, the user cannot interact with the select.
   */
  @Prop() valueDisplayPosition: 'under' | 'inside' = 'inside';

  /**
   * True if input is part of an eui-field
   */
  @Prop({ mutable: true }) isField?: boolean = false;

  /**
   * The text to display on the cancel button.
   */
  @Prop() cancelText: string = 'Cancel';

  /**
   * The text to display on the ok button.
   */
  @Prop() okText: string = 'OK';

  /**
   * The text to display when the select is empty.
   */
  @Prop() placeholder?: string | null;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = `eui-sel-${selectIds++}`;

  /**
   * The text to display instead of the selected option's value.
   */
  @Prop() selectedText?: string | null;

  /**
   * If `true`, the select can accept multiple values.
   */
  @Prop() multiple: boolean = false;

  /**
   * Sets the size styles of the select component
   */
  @Prop() size: ComponentSize = 'small';

  /**
   * position of the select dropdown component if set 'absolute' dropdown appears next to dropdown
   */
  @Prop() dropdownPosition: 'absolute' | 'fixed' = 'absolute';

  /**
   * A property name or function used to compare object values
   */
  @Prop() compareWith?: string | SelectCompareFn | null;

  /**
   * the value of the select.
   */
  @Prop({ mutable: true }) value?: EuiOptionInterface | EuiOptionInterface[];
  /**
   * focus state of the component
   */
  @Prop({ mutable: true }) hasFocus: boolean = false;
  /**
   * If set true clears error state on the input when focused
   */
  @Prop() clearErrorOnFocus: boolean = true;

  /**
   * Emitted when the value has changed.
   */
  @Event() euiChange!: EventEmitter<SelectChangeEventDetail>;

  /**
   * Emitted when the selection is cancelled.
   */
  @Event() euiCancel!: EventEmitter<void>;

  /**
   * Emitted when the select has focus.
   */
  @Event() euiFocus!: EventEmitter<void>;

  /**
   * Emitted when the select loses focus.
   */
  @Event() euiBlur!: EventEmitter<void>;

  @State() isExpanded: boolean = false;
  @State() valueDisplayedAmount: number;
  @State() renderTrigger: number;

  private overlay?: HTMLEuiSelectDropdownElement;
  private didInit: boolean = false;
  private mutationO?: MutationObserver;

  @Listen('scroll', { target: 'document', capture: true })
  documentScrollHandler(): void {
    this.updateDropdownPosition();
  }

  @Listen('click')
  clickHandler(): void {
    this.updateDropdownPosition();
    this.hasFocus = !this.hasFocus;
    this.renderTrigger = Math.random();
  }

  @Listen('click', { target: 'document', capture: true })
  documentClickHandler(ev: CustomEvent): void {
    const path = ev.composedPath();
    if (path && path.indexOf(this.el) === -1 && path.indexOf(this.overlay) === -1) {
      this.hasFocus = false;
      this.renderTrigger = Math.random();
    }
  }

  @Watch('value')
  valueChanged(): void {
    this.updateOptions();
    if (this.didInit) {
      this.euiChange.emit({
        value: this.value,
      });
    }
  }

  @Watch('hasFocus')
  hasFocusWatcher(newValue: boolean, oldValue: boolean): void {
    if (oldValue && !newValue) {
      this.euiBlur.emit();
    }
    if (!oldValue && newValue) {
      this.euiFocus.emit();
    }
  }

  /**
   * Open the select overlay. The overlay is either an alert, action sheet, or popover,
   * depending on the `interface` property on the `eui-select`.
   */
  @Method()
  async open(): Promise<HTMLEuiSelectDropdownElement> {
    if (this.disabled || this.isExpanded) {
      return undefined;
    }
    const overlay = (this.overlay = await this.createOverlay());
    this.isExpanded = true;
    overlay.onDidDismiss().then(() => {
      this.overlay = undefined;
      this.isExpanded = false;
    });
    await overlay.present();
    return overlay;
  }

  /**
   * Updates the dropdown position
   * @return {Promise<void>}
   */
  @Method()
  updateDropdownPosition(): Promise<void> {
    if (
      // this.interface === 'dropdown' &&
      this.overlay
    ) {
      (this.overlay as HTMLEuiSelectDropdownElement).updatePosition();
    }
    return;
  }

  connectedCallback(): void {
    if (this.value === undefined) {
      if (this.multiple) {
        // there are no values set at this point
        // so check to see who should be selected
        this.value = this.childOpts.filter((o: SelectOptionInterface) => o.selected);
      } else {
        const checked = this.childOpts.find((o: SelectOptionInterface) => o.selected);
        if (checked) {
          this.value = checked;
        }
      }
    }
    this.updateOptions();
    this.updateOverlayOptions();

    this.mutationO = watchForOptions(this.el, 'eui-select-option', async () => {
      this.updateOptions();
      this.updateOverlayOptions();
    });
  }

  disconnectedCallback(): void {
    if (this.mutationO) {
      this.mutationO.disconnect();
      this.mutationO = undefined;
    }
  }

  componentDidLoad(): void {
    const components: string[] = [
      'eui-select-dropdown',
      'eui-select-dropdown-content',
      'eui-select-dropdown-option',
    ];

    ComponentStore.register('eui-select');
    ComponentStore.require(components);
    this.didInit = true;
  }

  render(): HTMLEuiSelectElement {
    const { placeholder, disabled, isExpanded, value, el } = this;
    const labelId = this.name + '-lbl';
    if (this.isField) {
      const label = findItemLabel(el);
      if (label) {
        label.id = labelId;
      }
    }

    let addPlaceholderClass = false;
    let selectText = this.generateText(this.value);
    if (
      (!value || (this.multiple && (value as EuiOptionInterface[]).length === 0)) &&
      placeholder != null
    ) {
      selectText = <span>{placeholder}</span>;
      addPlaceholderClass = true;
    }

    const selectTextClasses: CssClassMap = {
      'select-text': true,
      'select-placeholder': addPlaceholderClass,
    };

    return (
      <Host
        role="combobox"
        aria-haspopup="dialog"
        aria-disabled={disabled ? 'true' : null}
        aria-expanded={`${isExpanded}`}
        style={{
          '--padding-left': 'var(--padding-left-' + this.size + ')',
          '--padding-right': 'var(--padding-right-' + this.size + ')',
          '--padding-top': 'var(--padding-top-' + this.size + ')',
          '--padding-bottom': 'var(--padding-bottom-' + this.size + ')',
          '--font-size': 'var(--font-size-' + this.size + ')',
          '--line-height': 'var(--line-height-' + this.size + ')',
          '--select-icon-size': 'var(--select-icon-size-' + this.size + ')',
          '--select-icon-padding': 'var(--select-icon-padding-' + this.size + ')',
          '--height': 'var(--height-' + this.size + ')',
        }}
        aria-labelledby={labelId}
        class={{
          'select-disabled': disabled,
          'is-multiple': this.multiple,
          'is-dropdown': true,
          'has-value': this.hasValue(),
          'has-error': this.clearErrorOnFocus ? !this.hasFocus && this.error : this.error,
          'is-readonly': this.readonly,
          'is-disabled': this.disabled,
          'absolute-dropdown': this.dropdownPosition === 'absolute',
        }}
      >
        <eui-input
          onClick={() => {
            this.onClick();
          }}
          size={this.size}
          placeholder={
            (this.multiple && (this.value as EuiOptionInterface[]).length > 0) ||
            (!this.multiple && !!this.value)
              ? ''
              : placeholder
          }
        >
          <div class={selectTextClasses} slot="leading">
            {this.valueDisplayPosition === 'inside' && selectText}
          </div>

          {/*<eui-icon*/}
          {/*  slot="trailing"*/}
          {/*  class="select-icon"*/}
          {/*  onClick={(ev: MouseEvent) => {*/}
          {/*    if (this.overlay) {*/}
          {/*      ev.stopPropagation();*/}
          {/*      this.overlay.dismiss();*/}
          {/*    }*/}
          {/*  }}*/}
          {/*  icon={this.overlay ? 'chevron-up' : 'chevron-down'}*/}
          {/*/>*/}
          <eui-icon
            slot={'trailing'}
            class={{
              'select-icon': true,
              'dd-open': this.isExpanded
            }}
            icon={'chevron-down'}
          />
          <span slot="trailing" />
        </eui-input>
      </Host>
    );
  }

  private generateText(
    value: EuiOptionInterface | EuiOptionInterface[],
    displayAll?: boolean
  ): HTMLElement[] | HTMLElement | string {
    if (value === undefined) {
      return null;
    }
    if (Array.isArray(value)) {
      return (
        <span
          class={{
            'chip-wrapper': true,
            outside: this.valueDisplayPosition === 'under' || displayAll,
            short: this.multiple,
          }}
          style={{
            width: 'auto',
          }}
        >
          <span
            class={{ 'value-chip': true, placeholder: value.length === 0 }}
            style={{
              display: 'inline-block',
              color: value.length === 0 ? 'var(--placeholder-color)' : 'var(--color)',
            }}
          >
            {value.length > 0
              ? value.length > 1
                ? [value.length + ' ', 'option' + (value.length > 1 ? 's' : '') + ' selected']
                : this.getOptionText(value[0])
              : this.placeholder}
          </span>
        </span>
      );
    } else {
      return (
        value && (
          <span
            class={{
              'chip-wrapper': true,
              'single-value': !this.multiple,
              outside: this.valueDisplayPosition === 'under' || displayAll,
            }}
          >
            <span
              class={{ 'value-chip': true, placeholder: !value }}
              style={{
                display: 'inline-block',
                color: value ? 'inherited' : 'var(--placeholder-color)',
              }}
            >
              {value ? this.getOptionText(value) : this.placeholder}
            </span>
          </span>
        )
      );
    }
  }

  private createOverlay(): Promise<HTMLEuiSelectDropdownElement> {
    return this.openDropdown();
  }

  private updateOverlayOptions(): void {
    const overlay = this.overlay;
    if (!overlay) {
      return;
    }

    const options = this.createDropdownOptions(this.childOpts);
    overlay.options = options && options.length > 0 ? this.groupOptions(options) : [];
    overlay.value = this.value;
  }

  private groupOptions(options: EuiOptionInterface[]): EuiOptionInterface[] {
    const grouped = _.groupBy(options, 'group');
    const returnArray: EuiOptionInterface[] = [];
    Object.entries(grouped).forEach(([key, value]: [string, EuiOptionInterface[]]) => {
      returnArray.push(this.generateGroupTitleOption(key, value));
      returnArray.push(...value);
    });
    return returnArray;
  }

  private generateGroupTitleOption(
    groupName: string,
    options: EuiOptionInterface[]
  ): EuiOptionInterface {
    const keyWords: string[] = [];
    options.forEach((item) => keyWords.push(item.label, item.value));
    return {
      label: groupName || 'Ungrouped',
      value: null,
      type: 'group-title',
      keyWords: keyWords,
    };
  }

  private createDropdownOptions(data: SelectOptionInterface[]): EuiOptionInterface[] {
    return data.map((o) => {
      const returnData: EuiOptionInterface = {
        label: o.textContent.trim(),
        value: this.getOptionValue(o),
        checked: this.isSelected(o),
        group: o.group || 'Ungrouped',
        disabled: o.disabled,
        handler: (option: EuiOptionInterface) => {
          if (this.multiple) {
            if (
              (this.value as EuiOptionInterface[]).find(
                (item) => item.value === this.getOptionValue(option)
              )
            ) {
              (this.value as EuiOptionInterface[]).splice(
                (this.value as EuiOptionInterface[]).findIndex(
                  (item) => item.value === this.getOptionValue(option)
                ),
                1
              );
            } else {
              (this.value as EuiOptionInterface[]).push(option);
            }
            this.value = [...(this.value as EuiOptionInterface[])];
            this.updateOverlayOptions();
            this.updateDropdownPosition();
            return false;
          } else {
            if (this.value && (this.value as EuiOptionInterface).value === option.value) {
              this.value = null;
            } else {
              this.value = option;
            }
            return true;
          }
        },
      };
      returnData.keyWords = [returnData.label, returnData.value, returnData.group];
      return returnData;
    });
  }

  private isSelected(object: SelectOptionInterface): boolean {
    const objectValue = this.getOptionValue(object);
    if (this.value instanceof Array) {
      return (
        object.selected ||
        this.value.filter((item: SelectOptionInterface) => item.value === objectValue).length > 0
      );
    } else {
      return object.selected || (this.value && this.value.value === objectValue);
    }
  }

  private async openDropdown(): Promise<HTMLEuiSelectDropdownElement> {
    const options = this.createDropdownOptions(this.childOpts);
    const eiuDropdownOptions: SelectDropdownOptions = {
      parent: this.el,
      size: this.size,
      value: this.value,
      inputEnabled: false,
      options: options && options.length > 0 ? this.groupOptions(options) : [],
      wrapperElement: this.el,
      position: this.dropdownPosition
    };
    return selectDropdownController.create(eiuDropdownOptions);
  }

  private updateOptions(): void {
    // iterate all options, updating the selected prop
    let canSelect = true;
    const { value, childOpts, compareWith, multiple } = this;
    for (const selectOption of childOpts) {
      const optValue = this.getOptionValue(selectOption);
      const selected = canSelect && this.isOptionSelected(value, optValue, compareWith);
      selectOption.selected = selected;

      // if current option is selected and select is single-option, we can't select
      // any option more
      if (selected && !multiple) {
        canSelect = false;
      }
    }
  }

  private hasValue(): boolean {
    const generatedText = this.generateText(this.value);
    if (!this.value) {
      return false;
    }
    return this.multiple
      ? (this.value as EuiOptionInterface[]).length !== 0
      : generatedText && generatedText !== '';
  }

  private onClick = () => {
    if (this.overlay) {
      this.overlay.dismiss();
    } else {
      this.open();
    }
  };

  private getOptionValue(el: SelectOptionInterface): string {
    const value = el.value;
    return value === undefined ? (el.textContent ? el.textContent.trim() : '') : value;
  }

  private isOptionSelected(
    currentValue: EuiOptionInterface[] | EuiOptionInterface,
    compareValue: string,
    compareWith?: string | SelectCompareFn | null
  ): boolean {
    if (currentValue === undefined) {
      return false;
    }
    if (Array.isArray(currentValue)) {
      return currentValue.some((val) => this.compareOptions(val, compareValue, compareWith));
    } else {
      return this.compareOptions(currentValue, compareValue, compareWith);
    }
  }

  private compareOptions(
    currentValue: EuiOptionInterface,
    compareValue: string,
    compareWith?: string | SelectCompareFn | null
  ): boolean {
    if (typeof compareWith === 'function') {
      return compareWith(currentValue, compareValue);
    } else if (typeof compareWith === 'string') {
      return currentValue[compareWith] === compareValue[compareWith];
    } else {
      return currentValue === compareValue;
    }
  }

  private getOptionText(item: EuiOptionInterface): string {
    if (!item) {
      return '';
    }
    if (item.hasOwnProperty('label')) {
      return item.label;
    }
  }
}
