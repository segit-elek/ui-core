# eui-select-dropdown



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                                            | Type                                         | Default                                           |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------- |
| `actions`              | --                       | An array of actions for the select dropdown.                                           | `ComboboxAction[]`                           | `[]`                                              |
| `animated`             | `animated`               | If `true`, the select dropdown will animate.                                           | `boolean`                                    | `true`                                            |
| `contentElement`       | `content-element`        | sets the displayed content wrapper for the options                                     | `string`                                     | `'eui-select-dropdown-content'`                   |
| `customContentParams`  | --                       | custom parameters for custom content components                                        | `{ [key: string]: unknown; }`                | `undefined`                                       |
| `customOptionParams`   | --                       | custom parameters for custom option components                                         | `{ [key: string]: unknown; }`                | `undefined`                                       |
| `inputEnabled`         | `input-enabled`          | sets whether the filter is enabled                                                     | `boolean`                                    | `false`                                           |
| `isLoading`            | `is-loading`             | loading state for the select dropdown.                                                 | `boolean`                                    | `false`                                           |
| `keyboardClose`        | `keyboard-close`         | If `true`, the keyboard will be automatically dismissed when the overlay is presented. | `boolean`                                    | `false`                                           |
| `localization`         | --                       | contains the texts that can be overwritten                                             | `SelectDropdownLocalization`                 | `{     content: {       back: 'Back',     },   }` |
| `minWidth`             | `min-width`              | min width of the component                                                             | `number`                                     | `150`                                             |
| `optionElement`        | `option-element`         | sets the displayed option element                                                      | `string`                                     | `'eui-select-dropdown-option'`                    |
| `options`              | --                       | An array of options for the select dropdown.                                           | `EuiOptionInterface[]`                       | `[]`                                              |
| `parent`               | --                       | parent component                                                                       | `HTMLElement`                                | `undefined`                                       |
| `position`             | `position`               | position of the dropdown                                                               | `"absolute" \| "fixed"`                      | `undefined`                                       |
| `selectedIcon`         | `selected-icon`          | icon that is rendered in option                                                        | `string`                                     | `'check'`                                         |
| `selectedIconEnabled`  | `selected-icon-enabled`  | sets whether selected icon is displayed in option                                      | `boolean`                                    | `true`                                            |
| `selectedIconPosition` | `selected-icon-position` | position of the selected icon in option                                                | `"end" \| "start"`                           | `'end'`                                           |
| `size`                 | `size`                   | event sent by select filed on open                                                     | `"large" \| "medium" \| "small"`             | `'small'`                                         |
| `value`                | --                       | value of the parent component                                                          | `EuiOptionInterface \| EuiOptionInterface[]` | `undefined`                                       |


## Events

| Event                          | Description                               | Type                                   |
| ------------------------------ | ----------------------------------------- | -------------------------------------- |
| `euiSelectDropdownDidDismiss`  | Emitted after the dropdown is dismissed.  | `CustomEvent<OverlayEventDetail<any>>` |
| `euiSelectDropdownDidPresent`  | Emitted after the dropdown is presented.  | `CustomEvent<void>`                    |
| `euiSelectDropdownWillDismiss` | Emitted before the dropdown is dismissed. | `CustomEvent<OverlayEventDetail<any>>` |
| `euiSelectDropdownWillPresent` | Emitted before the dropdown is presented. | `CustomEvent<void>`                    |


## Methods

### `dismiss(data?: unknown, role?: string) => Promise<boolean>`

Dismiss the select dropdown overlay after it has been presented.

#### Returns

Type: `Promise<boolean>`



### `onDidDismiss() => Promise<OverlayEventDetail>`

Returns a promise that resolves when the select dropdown did dismiss.

#### Returns

Type: `Promise<OverlayEventDetail<any>>`



### `onWillDismiss() => Promise<OverlayEventDetail>`

Returns a promise that resolves when the select dropdown will dismiss.

#### Returns

Type: `Promise<OverlayEventDetail<any>>`



### `present() => Promise<void>`

Present the select dropdown overlay after it has been created.

#### Returns

Type: `Promise<void>`



### `updatePosition() => Promise<void>`

updates the position of the dropdown

#### Returns

Type: `Promise<void>`




## CSS Custom Properties

| Name                     | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| `--background`           | Background of the select dropdown group               |
| `--background-activated` | Background of the select dropdown button when pressed |
| `--background-selected`  | Background of the selected select dropdown button     |
| `--color`                | Color of the select dropdown text                     |
| `--height`               | height of the select dropdown                         |
| `--max-height`           | Maximum height of the select dropdown                 |
| `--max-width`            | Maximum width of the select dropdown                  |
| `--min-height`           | Minimum height of the select dropdown                 |
| `--min-width`            | Minimum width of the select dropdown                  |
| `--width`                | Width of the select dropdown                          |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
