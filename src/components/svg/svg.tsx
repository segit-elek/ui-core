import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { memoize } from '../../utils/!performance/memoize';

@Component({
  tag: 'eui-svg',
  styleUrl: 'svg.scss',
  shadow: true,
})
export class Svg {
  @Element() el: HTMLElement;
  /**
   * src of the svg that is to be fetched
   */
  @Prop({ reflect: true }) src: string = '';
  /**
   * content
   */
  @Prop() content?: string;

  @State()
  innerContent: string;

  async fetchSrc(): Promise<void> {
    this.innerContent = await memoize(fetch)(this.src).then((response: Response) =>
      response.clone().text()
    );
  }

  componentWillRender(): void {
    if (!this.content) {
      // noinspection JSIgnoredPromiseFromCall
      this.fetchSrc();
    } else if (this.innerContent !== this.content) {
      this.innerContent = this.content;
    }
  }

  render(): HTMLElement {
    return (
      this.innerContent && (
        <Host>
          <span innerHTML={this.innerContent} />
        </Host>
      )
    );
  }
}
