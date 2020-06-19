# eui-textarea



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute              | Description                                                                                           | Type                             | Default                     |
| ------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------- | --------------------------- |
| `clearErrorOnFocus` | `clear-error-on-focus` | If set true clears error state on the input when focused                                              | `boolean`                        | `true`                      |
| `clearInput`        | `clear-input`          | If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input. | `boolean`                        | `false`                     |
| `disabled`          | `disabled`             | If `true`, the user cannot interact with the input.                                                   | `boolean`                        | `false`                     |
| `error`             | `error`                | if set true it enables error state for the input                                                      | `boolean`                        | `undefined`                 |
| `isField`           | `is-field`             | True if input is part of an eui-field                                                                 | `boolean`                        | `false`                     |
| `name`              | `name`                 | The name of the control, which is submitted with the form data.                                       | `string`                         | ``eui-input-${inputIds++}`` |
| `placeholder`       | `placeholder`          | Instructional text that shows before the input has a value.                                           | `string`                         | `undefined`                 |
| `readonly`          | `readonly`             | If `true`, the user cannot modify the value.                                                          | `boolean`                        | `false`                     |
| `required`          | `required`             | If `true`, the user must fill in a value before submitting a form.                                    | `boolean`                        | `false`                     |
| `size`              | `size`                 | sets the size of the input can be 'small', 'medium' or 'large' defaults to 'small'                    | `"large" \| "medium" \| "small"` | `'small'`                   |
| `value`             | `value`                | The value of the input.                                                                               | `string`                         | `''`                        |


## Events

| Event       | Description                             | Type                                         |
| ----------- | --------------------------------------- | -------------------------------------------- |
| `euiBlur`   | Emitted when the input loses focus.     | `CustomEvent<void>`                          |
| `euiChange` | Emitted when the value has changed.     | `CustomEvent<EuiTextareaChangeEventDetails>` |
| `euiFocus`  | Emitted when the input has focus.       | `CustomEvent<void>`                          |
| `euiInput`  | Emitted when a keyboard input occurred. | `CustomEvent<KeyboardEvent>`                 |


## Methods

### `focusInput() => Promise<void>`

Focuses the inner input

#### Returns

Type: `Promise<void>`

[object Object]

### `getInputElement() => Promise<HTMLTextAreaElement>`

Returns the native `<input>` element used under the hood.

#### Returns

Type: `Promise<HTMLTextAreaElement>`



### `setFocus() => Promise<void>`

Sets focus on the specified `eui-input`. Use this method instead of the global
`input.focus()`.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
