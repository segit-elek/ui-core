import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'eui-app-bar',
  styleUrl: 'app-bar.scss',
  scoped: true,
})
export class AppBar {
  @Element() el: HTMLElement;

  /**
   * location of the app-bar
   *
   * @type {('top' | 'bottom')}
   */
  @Prop() type: 'top' | 'bottom' = 'top';
  /**
   * styles of the app-bar
   */
  @Prop() styles: {
    position?: 'fixed' | 'absolute' | 'relative';
    height?: number;
    background?: string;
    endDistances?: number;
    boxShadows?: {
      top?: string;
      bottom?: string;
    };
  };

  render(): HTMLEuiAppBarElement {
    const styles = {
      position: 'fixed',
      height: 40,
      background: '#ffffff',
      endDistances: 0,
      boxShadows: {
        bottom: '0 -2px 2px 0 rgba(0,0,0,0.22)',
        top: '0 2px 2px 0 rgba(0,0,0,0.22)',
      },
      ...this.styles,
    };

    return (
      <Host
        class={{
          [this.type]: true,
        }}
        style={{
          '--background-color': styles.background,
          '--position': styles.position,
          '--box-shadow': styles.boxShadows[this.type],
          '--min-height': styles.height + 'px',
          '--horizontal-padding': styles.endDistances + 'px',
        }}
      >
        <slot />
      </Host>
    );
  }
}
