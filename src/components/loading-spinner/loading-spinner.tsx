import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'eui-loading-spinner',
  styleUrl: 'loading-spinner.scss',
})
export class LoadingSpinner {
  /**
   * sets the stroke color of the animation
   * @type {string}
   */
  @Prop() color: string = 'var(--gray-6)';

  render(): HTMLEuiLoadingSpinnerElement {
    return (
      <svg class="spinner-android" viewBox="0 0 50 50">
        <circle
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={this.color}
          stroke-width="5"
        />
      </svg>
    );
  }
}
