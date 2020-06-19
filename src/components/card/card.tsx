import { Component, h } from '@stencil/core';

@Component({
  tag: 'eui-card',
  styleUrl: 'card.scss',
  scoped: true,
})
export class Card {
  render(): HTMLEuiCardElement {
    return <slot />;
  }
}
