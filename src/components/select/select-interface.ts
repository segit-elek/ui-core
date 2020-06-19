import { EuiOptionInterface } from '../../interface';

export type SelectInterface = 'action-sheet' | 'popover' | 'alert' | 'dropdown';

export type SelectCompareFn = (currentValue: unknown, compareValue: unknown) => boolean;

export interface SelectChangeEventDetail {
  value: EuiOptionInterface | EuiOptionInterface[];
}

export interface SelectOptionInterface {
  selected?: boolean;
  group?: string;
  disabled?: boolean;
  textContent?: string;
  value?: string;
}

export interface SelectInterfaceOptions {
  position?: 'absolute' | 'fixed';
  dropdownParent?: HTMLElement;
}

export interface ComboboxAction {
  label?: string;
  handler?: Function;
}
