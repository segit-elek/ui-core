# eui-drawer



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute              | Description                                                | Type                              | Default                 |
| ------------------- | ---------------------- | ---------------------------------------------------------- | --------------------------------- | ----------------------- |
| `leftDrawerIsOpen`  | `left-drawer-is-open`  | sets and reflects the state of the left drawer             | `boolean`                         | `false`                 |
| `name`              | `name`                 | sets the name of the drawer, it will be used in the events | `string`                          | ``drawer-${uuid.v4()}`` |
| `rightDrawerIsOpen` | `right-drawer-is-open` | sets and reflects the state of the right drawer            | `boolean`                         | `false`                 |
| `size`              | `size`                 | sets the size of the component                             | `"large" \| "medium" \| "small"`  | `'small'`               |
| `type`              | `type`                 | sets the type of the drawer                                | `"overlay" \| "push" \| "squish"` | `'push'`                |


## Methods

### `toggleDrawer(side: 'left' | 'right', isOpen: boolean) => Promise<void>`

Lets you set the state of the doors

#### Returns

Type: `Promise<void>`

[object Object]


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
