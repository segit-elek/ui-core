import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
} from '@stencil/core';

@Component({
  tag: 'eui-menu-section',
  styleUrl: 'menu-section.scss',
  scoped: true,
})
export class MenuSection implements ComponentInterface {
  /**
   * sets the title of the section
   */
  @Prop({ reflect: true }) sectionTitle?: string;

  /**
   * makes the menu section collapsible
   */
  @Prop({ reflect: true }) collapsible?: boolean;

  /**
   * sets the indent for the menu item
   */
  @Prop() menuHeaderIndent?: number;

  @State() collapsed: boolean = false;

  /**
   * emits an event after the state of the collapse change
   * @type {EventEmitter<boolean>}
   */
  @Event({ bubbles: true }) collapseToggled: EventEmitter<boolean>;

  private collapseChanged: boolean = false;

  collapse(): void {
    if (this.collapsible) {
      this.collapsed = !this.collapsed;
      this.collapseChanged = true;
    }
  }

  componentDidUpdate(): void {
    if (this.collapsible && this.collapseChanged) {
      this.collapseChanged = false;
      this.collapseToggled.emit(this.collapsed);
    }
  }

  render(): HTMLEuiMenuSectionElement {
    return (
      <Host>
        {
          this.sectionTitle &&
          <eui-menu-header indent={this.menuHeaderIndent} onClick={this.collapse.bind(this)}>
            {this.sectionTitle}
          </eui-menu-header>
        }
        <div class={{
          'content': true,
          'collapsed': this.collapsed
        }}>
          <slot />
        </div>
      </Host>
    );
  }
}
