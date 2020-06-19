import { AnimationBuilder, ComponentSize } from '../../interface';

type Localization = string | { [key: string]: string | Localization };

export interface SelectDropdownLocalization {
  content?: {
    back: string;
  };
  [key: string]: Localization;
}

export interface SelectDropdownOptions {
  header?: string;
  subHeader?: string;
  cssClass?: string | string[];
  label?: string;
  parent?: HTMLElement;
  localization?: SelectDropdownLocalization;
  // buttons: (ActionSheetButton | string)[];
  backdropDismiss?: boolean;
  translucent?: boolean;
  animated?: boolean;
  keyboardClose?: boolean;
  id?: string;
  filter?: Function;
  optionElement?: string;
  contentElement?: string;
  options?: EuiOptionInterface[];
  position?: 'absolute' | 'fixed';
  dropdownParent?: HTMLElement;
  wrapperElement?: HTMLElement | ShadowRoot;
  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;
  value?: EuiOptionInterface | EuiOptionInterface[];
  size?: ComponentSize;
  inputEnabled?: boolean;
  customContentParams?: {[key: string]: unknown};
  customOptionParams?: {[key: string]: unknown};
}

export interface EuiOptionInterface {
  label?: string;
  name?: string;
  focused?: boolean;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  groupTitle?: boolean;
  group?: string;
  type?: 'option' | 'group-title' | 'action';
  keyWords?: string[];
  id?: string;
  handler?: (input: EuiOptionInterface) => boolean | void | Promise<boolean>;
  // role?: 'cancel' | 'destructive' | 'selected' | string;
  icon?: string;
  component?: string;
  cssClass?: string | string[];
  params?: { [key: string]: unknown };
  // handler?: () => boolean | void | Promise<boolean>;
}
