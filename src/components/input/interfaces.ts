export interface EuiInputChangeEventDetails {
  value?: string | null | number;
}

export type InputModes =
  | 'none'
  | 'text'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal'
  | 'search';
