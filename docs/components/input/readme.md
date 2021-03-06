# eui-input



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute              | Description                                                                                                                                                                                                                                                                                                                                          | Type                                                                                            | Default                     |
| ------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------- |
| `accept`            | `accept`               | If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.                                                                                                              | `string`                                                                                        | `undefined`                 |
| `autocapitalize`    | `autocapitalize`       | Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.                                                                                                                                                                                                                                    | `string`                                                                                        | `'off'`                     |
| `autocomplete`      | `autocomplete`         | Indicates whether the value of the control can be automatically completed by the browser.                                                                                                                                                                                                                                                            | `"off" \| "on"`                                                                                 | `'off'`                     |
| `autocorrect`       | `autocorrect`          | Whether auto correction should be enabled when the user is entering/editing the text value.                                                                                                                                                                                                                                                          | `"off" \| "on"`                                                                                 | `'off'`                     |
| `autofocus`         | `autofocus`            | This Boolean attribute lets you specify that a form control should have input focus when the page loads.                                                                                                                                                                                                                                             | `boolean`                                                                                       | `false`                     |
| `clearErrorOnFocus` | `clear-error-on-focus` | If set true clears error state on the input when focused                                                                                                                                                                                                                                                                                             | `boolean`                                                                                       | `true`                      |
| `clearInput`        | `clear-input`          | If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input.                                                                                                                                                                                                                                                | `boolean`                                                                                       | `false`                     |
| `clearOnEdit`       | `clear-on-edit`        | If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.                                                                                                                                                                                                             | `boolean`                                                                                       | `undefined`                 |
| `disabled`          | `disabled`             | If `true`, the user cannot interact with the input.                                                                                                                                                                                                                                                                                                  | `boolean`                                                                                       | `false`                     |
| `error`             | `error`                | if set true it enables error state for the input                                                                                                                                                                                                                                                                                                     | `boolean`                                                                                       | `undefined`                 |
| `inputmode`         | `inputmode`            | A hint to the browser for which keyboard to display. Possible values: `"none"`, `"text"`, `"tel"`, `"url"`, `"email"`, `"numeric"`, `"decimal"`, and `"search"`.                                                                                                                                                                                     | `"decimal" \| "email" \| "none" \| "numeric" \| "search" \| "tel" \| "text" \| "url"`           | `undefined`                 |
| `max`               | `max`                  | The maximum value, which must not be less than its minimum (min attribute) value.                                                                                                                                                                                                                                                                    | `string`                                                                                        | `undefined`                 |
| `maxlength`         | `maxlength`            | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.                                                                                                                                                                     | `number`                                                                                        | `undefined`                 |
| `min`               | `min`                  | The minimum value, which must not be greater than its maximum (max attribute) value.                                                                                                                                                                                                                                                                 | `string`                                                                                        | `undefined`                 |
| `minlength`         | `minlength`            | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.                                                                                                                                                                     | `number`                                                                                        | `undefined`                 |
| `multiple`          | `multiple`             | If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"` or `"file"`, otherwise it is ignored.                                                                                                                                                                                          | `boolean`                                                                                       | `undefined`                 |
| `name`              | `name`                 | The name of the control, which is submitted with the form data.                                                                                                                                                                                                                                                                                      | `string`                                                                                        | ``eui-input-${inputIds++}`` |
| `pattern`           | `pattern`              | A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored. | `string`                                                                                        | `undefined`                 |
| `placeholder`       | `placeholder`          | Instructional text that shows before the input has a value.                                                                                                                                                                                                                                                                                          | `string`                                                                                        | `undefined`                 |
| `readonly`          | `readonly`             | If `true`, the user cannot modify the value.                                                                                                                                                                                                                                                                                                         | `boolean`                                                                                       | `false`                     |
| `required`          | `required`             | If `true`, the user must fill in a value before submitting a form.                                                                                                                                                                                                                                                                                   | `boolean`                                                                                       | `false`                     |
| `size`              | `size`                 | sets the size of the input can be 'small', 'medium' or 'large' defaults to 'small'                                                                                                                                                                                                                                                                   | `"large" \| "medium" \| "small"`                                                                | `'small'`                   |
| `spellcheck`        | `spellcheck`           | If `true`, the element will have its spelling and grammar checked.                                                                                                                                                                                                                                                                                   | `boolean`                                                                                       | `false`                     |
| `step`              | `step`                 | Works with the min and max attributes to limit the increments at which a value can be set. Possible values are: `"any"` or a positive floating point number.                                                                                                                                                                                         | `string`                                                                                        | `undefined`                 |
| `type`              | `type`                 | The type of control to display. The default type is text.                                                                                                                                                                                                                                                                                            | `"date" \| "email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "time" \| "url"` | `'text'`                    |
| `value`             | `value`                | The value of the input.                                                                                                                                                                                                                                                                                                                              | `number \| string`                                                                              | `''`                        |


## Events

| Event       | Description                             | Type                                      |
| ----------- | --------------------------------------- | ----------------------------------------- |
| `euiBlur`   | Emitted when the input loses focus.     | `CustomEvent<void>`                       |
| `euiChange` | Emitted when the value has changed.     | `CustomEvent<EuiInputChangeEventDetails>` |
| `euiFocus`  | Emitted when the input has focus.       | `CustomEvent<void>`                       |
| `euiInput`  | Emitted when a keyboard input occurred. | `CustomEvent<KeyboardEvent>`              |


## Methods

### `focusInput() => Promise<void>`

Calls the focus on the underlying input

#### Returns

Type: `Promise<void>`

[object Object]

### `getFocusState() => Promise<boolean>`

Returns the focus state

#### Returns

Type: `Promise<boolean>`

[object Object]

### `getInputElement() => Promise<HTMLInputElement>`

Returns the native `<input>` element used under the hood.

#### Returns

Type: `Promise<HTMLInputElement>`



### `setFocus() => Promise<void>`

Sets focus on the specified `eui-input`. Use this method instead of the global
`input.focus()`.

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [eui-select](../select)

### Graph
```mermaid
graph TD;
  eui-select --> eui-input
  style eui-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
