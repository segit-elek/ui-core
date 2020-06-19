// Components interfaces
export * from './components';
export * from './index';
export * from './components/input/interfaces';
export * from './components/select-dropdown/select-dropdown-interface';
export * from './components/select/select-interface';

// Types from utils
export { Animation, AnimationBuilder } from './utils/animation/animation-interface';
export * from './utils/overlays-interface';

export type TextFieldTypes =
  | 'date'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url'
  | 'time';
export type Side = 'start' | 'end';
export type CssClassMap = { [className: string]: boolean };
export type BackButtonEvent = CustomEvent<BackButtonEventDetail>;

export interface BackButtonEventDetail {
  register(priority: number, handler: () => Promise<any> | void): void;
}

declare module './components' {
  export namespace Components {
  }
}

/**
 * Size of the component
 * @typedef {('small'|'medium'|'large')} ComponentSize
 */
export type ComponentSize = 'small' | 'medium' | 'large';

export interface Breakpoints {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

export interface ColDescriptor {
  span?: number;
  offset?: number;
  order?: number;
}
