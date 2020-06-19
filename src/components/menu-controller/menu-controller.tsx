import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'eui-menu-controller',
  styleUrl: 'menu-controller.scss',
  scoped: true,
})
export class MenuController {
  @Element() el: HTMLElement;

  /**
   * Name of the selected panel
   */
  @Prop({ mutable: true, reflect: true }) selectedPanel: string;

  @State() activeIndex: number = 0;

  private panelsElement: HTMLElement;

  @Listen('collapseToggled')
  resizePanel(): void {
    const children = this.el.querySelectorAll('eui-menu-panel');
    children.forEach((child: HTMLElement, index: number) => {
      if (index === this.activeIndex) {
        this.panelsElement.style.height =
          child.offsetHeight !== 0 ? child.offsetHeight + 'px' : 'auto';
      }
    });
  }

  @Watch('selectedPanel')
  panelChange(newPanel: string, oldPanel: string): void {
    let oldPanelIndex;
    let newPanelIndex;
    const children = this.el.querySelectorAll('eui-menu-panel');
    children.forEach((child: HTMLEuiMenuPanelElement, index: number) => {
      if (child.panelName === oldPanel) {
        oldPanelIndex = index;
      }
      if (child.panelName === newPanel) {
        newPanelIndex = index;
      }

      if (index === oldPanelIndex) {
        if (this.panelsElement.style.height === 'auto') {
          this.panelsElement.style.height =
            child.offsetHeight !== 0 ? child.offsetHeight + 'px' : 'auto';
        }
      }
    });
    if (oldPanelIndex !== undefined && newPanelIndex !== undefined) {
      this.activeIndex = newPanelIndex;
      this.changePanels();
    }
  }

  componentDidLoad(): void {
    const children = this.el.querySelectorAll('eui-menu-panel');
    children.forEach((child: HTMLEuiMenuPanelElement, index: number) => {
      if (this.selectedPanel && child.panelName === this.selectedPanel) {
        this.activeIndex = index;
      }
    });
    this.changePanels();
  }

  changePanels(): void {
    const children = this.el.querySelectorAll('eui-menu-panel');

    children.forEach((child: HTMLElement, index: number) => {
      child.style.transition = '200ms all ease-in-out';
      child.style.display = 'block';
      if (index === this.activeIndex) {
        child.style.left = '0px';
        child.style.top = 'initial';
        child.style.right = '0px';
        child.style.opacity = '1';
        child.style.pointerEvents = 'all';
        child.style.position = 'relative';
        this.panelsElement.style.height =
          child.offsetHeight !== 0 ? child.offsetHeight + 'px' : 'auto';
      } else {
        child.style.pointerEvents = 'none';
        child.style.position = 'absolute';
        child.style.opacity = '0';

        child.style.top = 0 + 'px';

        if (index < this.activeIndex) {
          child.style.right = '20px';
          child.style.left = '-20px';
        } else {
          child.style.right = '-20px';
          child.style.left = '20px';
        }
      }
    });
  }

  render(): HTMLEuiMenuControllerElement {
    return (
      <Host>
        <div class="header">
          <slot name="header" />
        </div>
        <div ref={(el) => (this.panelsElement = el)} class="panels">
          <slot />
        </div>

        <slot name="footer" />
      </Host>
    );
  }
}
