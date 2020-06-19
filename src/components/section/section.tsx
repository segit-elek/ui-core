import { Component, Element, h, Host, Prop } from '@stencil/core';
import { ComponentSize } from '../../interface';

@Component({
  tag: 'eui-section',
  styleUrl: 'section.scss',
  scoped: true,
})
export class Section {
  @Element() el: HTMLEuiSectionElement;

  /**
   * sets the label of the section required
   */
  @Prop({ mutable: true, reflect: true }) label!: string;

  /**
   * changes the size related styles of the component
   */
  @Prop() size: ComponentSize = 'small';

  /**
   * if set to true a click on the header collapses the body
   */
  @Prop() collapsible: boolean;

  /**
   * if the collapsible is set to true stores the state of the collapse
   */
  @Prop({ mutable: true }) collapsed: boolean;

  /**
   * changes the background color of the header
   */
  @Prop() headerStyle: 'light' | 'dark' = 'light';

  render(): HTMLEuiSectionElement {
    return (
      <Host
        class={{
          'dark-header': this.headerStyle === 'dark',
        }}
        style={{
          '--header-font-size': 'var(--header-font-size-' + this.size + ')',
          '--header-padding': 'var(--header-padding-' + this.size + ')',
          '--body-padding': 'var(--body-padding-' + this.size + ')',
          '--collapser-size': 'var(--collapser-size-' + this.size + ')',
          '--collapser-margin': 'var(--collapser-margin-' + this.size + ')',
          '--collapser-stroke': 'var(--collapser-stroke-' + this.size + ')',
        }}
      >
        <div
          class={{
            header: true,
            collapsible: this.collapsible,
            [this.headerStyle]: true,
            [this.size]: true,
          }}
          onClick={() => {
            this.collapsed = !this.collapsed;
          }}
        >
          {this.collapsible && (
            <eui-icon class="collapser" icon={this.collapsed ? 'chevron-up' : 'chevron-down'} />
          )}
          {this.label}
        </div>
        <div
          class={{
            body: true,
            'is-collapsed': this.collapsed && this.collapsible,
          }}
        >
          <slot />
        </div>
        {this.collapsible && this.collapsed && <div style={{ height: '6px' }} />}
      </Host>
    );
  }
}
