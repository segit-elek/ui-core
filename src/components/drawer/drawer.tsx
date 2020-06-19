import { Component, Element, h, Host, Listen, Method, Prop, Watch } from '@stencil/core';
import { ComponentSize } from '../../interface';
import { DrawerToggleEventDetail } from './interface';
import uuid from 'uuid';

@Component({
  tag: 'eui-drawer',
  styleUrl: 'drawer.scss',
  scoped: true,
})
export class Drawer {
  @Element() el: HTMLElement;

  /**
   * sets the name of the drawer, it will be used in the events
   * @type {string}
   */
  @Prop({ mutable: true, reflect: true }) name?: string = `drawer-${uuid.v4()}`;

  /**
   * sets the type of the drawer
   * @type {string}
   */
  @Prop({ mutable: true, reflect: true }) type?: 'push' | 'squish' | 'overlay' = 'push';

  /**
   * sets the size of the component
   * @type {ComponentSize}
   */
  @Prop({ mutable: true, reflect: true }) size?: ComponentSize = 'small';

  /**
   * sets and reflects the state of the left drawer
   * @type {boolean}
   */
  @Prop({ mutable: true, reflect: true }) leftDrawerIsOpen?: boolean = false;

  /**
   * sets and reflects the state of the right drawer
   * @type {boolean}
   */
  @Prop({ mutable: true, reflect: true }) rightDrawerIsOpen?: boolean = false;

  @Watch('leftDrawerIsOpen')
  leftDrawerStateChange(newVal: boolean): void {
    if (this.type === 'push' && newVal) {
      this.rightDrawerIsOpen = false;
    }
  }

  @Watch('rightDrawerIsOpen')
  rightDrawerStateChange(newVal: boolean): void {
    if (this.type === 'push' && newVal) {
      this.leftDrawerIsOpen = false;
    }
  }

  /**
   * Listens to `toggleRightDrawer` event on the document
   * if the name of the drawer matches sets the right drawer to the given state
   * @param {CustomEvent<DrawerToggleEventDetail>} ev
   */
  @Listen('toggleRightDrawer', { target: 'document' })
  toggleRightDrawerHandler(ev: CustomEvent<DrawerToggleEventDetail>): void {
    if (ev.detail && ev.detail.drawerName === this.name) {
      this.rightDrawerIsOpen = ev.detail.isOpen;
      this.rightDrawerStateChange(ev.detail.isOpen);
    }
  }

  /**
   * Listens to `toggleLeftDrawer` event on the document
   * if the name of the drawer matches sets the left drawer to the given state
   * @param {CustomEvent<DrawerToggleEventDetail>} ev
   */
  @Listen('toggleLeftDrawer', { target: 'document' })
  toggleLeftDrawerHandler(ev: CustomEvent<DrawerToggleEventDetail>): void {
    if (ev.detail && ev.detail.drawerName === this.name) {
      this.leftDrawerIsOpen = ev.detail.isOpen;
      this.leftDrawerStateChange(ev.detail.isOpen);
    }
  }

  /**
   * Listens to `toggleDrawer` event on the document
   * if the name of the drawer matches sets the specified drawer to the given state
   * @param {CustomEvent<DrawerToggleEventDetail>} ev
   */
  @Listen('toggleDrawer', { target: 'document' })
  toggleDrawerHandler(ev: CustomEvent<DrawerToggleEventDetail>): void {
    if (ev.detail && ev.detail.side && ev.detail.drawerName === this.name) {
      if (ev.detail.side === 'left') {
        this.leftDrawerIsOpen = ev.detail.isOpen;
        this.leftDrawerStateChange(ev.detail.isOpen);
      } else if (ev.detail.side === 'right') {
        this.rightDrawerIsOpen = ev.detail.isOpen;
        this.rightDrawerStateChange(ev.detail.isOpen);
      }
    }
  }

  /**
   * Lets you set the state of the doors
   *
   * @param {("left" | "right")} side
   * @param {boolean} isOpen
   * @return {Promise<void>}
   */
  @Method()
  async toggleDrawer(side: 'left' | 'right', isOpen: boolean): Promise<void> {
    if (side === 'left') {
      this.leftDrawerIsOpen = isOpen;
    } else if (side === 'right') {
      this.rightDrawerIsOpen = isOpen;
    }
  }

  render(): HTMLEuiDrawerElement {
    return (
      <Host>
        <div class={{ 'left-drawer': true, open: this.leftDrawerIsOpen }}>
          <slot name="left-drawer" />
        </div>
        <div
          class={{
            main: true,
            'right-open': this.rightDrawerIsOpen,
            'left-open': this.leftDrawerIsOpen,
          }}
        >
          <slot />
        </div>
        <div class={{ 'right-drawer': true, open: this.rightDrawerIsOpen }}>
          <slot name="right-drawer" />
        </div>
        {this.type === 'overlay' && (this.leftDrawerIsOpen || this.rightDrawerIsOpen) ? (
          <div
            class="overlay"
            onClick={() => {
              this.closeDrawers();
            }}
          />
        ) : null}
      </Host>
    );
  }

  closeDrawers(): void {
    this.rightDrawerIsOpen = false;
    this.leftDrawerIsOpen = false;
  }
}
