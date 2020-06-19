import { createStore, ObservableMap } from '@stencil/store';

export class ComponentStore {

  private static store: ObservableMap<{
    components: string[];
  }> = createStore({
      components: [],
    });

  static register(tagName: string): void {
    if (this.store.state.components.indexOf(tagName) === -1) {
      this.store.state.components.push(tagName);
    }
  }

  static require(tags: string[]): void {
    tags.forEach((tagName: string) => {
      if (this.store.state.components.indexOf(tagName) === -1) {
        this.store.state.components.push(tagName);
        const element = document.createElement(tagName);
        element.style.display = 'none';
        element.style.opacity = '0';
        element.style.visibility = 'hidden';
        element.style.pointerEvents = 'none';
        element.style.position = 'absolute';
        element.style.top = '- 100000px';
        element.style.left = '- 100000px';
        const renderedElement = document.body.appendChild(element);
        renderedElement.remove();
      }
    });

  }
}
