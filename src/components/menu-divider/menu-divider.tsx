import { Component, h } from '@stencil/core';

@Component({
  tag: 'eui-menu-divider',
  styleUrl: 'menu-divider.scss',
  scoped: true,
})
export class MenuDivider {
  render(): HTMLEuiMenuDividerElement {
    return <div />;
  }
}
