import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { ComponentSize } from '../../interface';

@Component({
  tag: 'eui-pagination',
  styleUrl: 'pagination.scss',
  scoped: true,
})
export class Pagination {
  /**
   * sets the number of pages
   * @type {number}
   */
  @Prop({ reflect: true, mutable: true }) pages: number = 1;

  /**
   * sets the size of the component can be 'small', 'medium' or 'large' defaults to 'small'
   */
  @Prop() size?: ComponentSize = 'small';

  /**
   * sets the current page
   * @type {number}
   */
  @Prop({ reflect: true, mutable: true }) currentPage: number = 1;

  /**
   * Emits the page number after a navigation chevron is clicked
   */
  @Event({ bubbles: true }) selectedPageChange: EventEmitter<number>;

  render(): HTMLEuiPaginationElement {
    return (
      <Host
        style={{
          '--selected-margin': 'var(--selected-margin-' + this.size + ')',
          '--selected-padding': 'var(--selected-padding-' + this.size + ')',
          '--font-size': 'var(--font-size-' + this.size + ')',
          '--line-height': 'var(--line-height-' + this.size + ')',
          '--all-margin-left': 'var(--all-margin-left-' + this.size + ')',
          '--icon-margin': 'var(--icon-margin-' + this.size + ')',
        }}
      >
        <eui-icon
          onClick={() => {
            if (this.currentPage > 1) {
              this.currentPage--;
              this.selectedPageChange.emit(this.currentPage);
            }
          }}
          icon="chevron-left"
          size="small"
        />
        <span>Page </span>
        <span class="selected-page-number">{this.currentPage}</span>
        <span> of </span>
        <span class="all-page-number">{this.pages}</span>
        <eui-icon
          onClick={() => {
            if (this.currentPage < this.pages) {
              this.currentPage++;
              this.selectedPageChange.emit(this.currentPage);
            }
          }}
          icon="chevron-right"
          size="small"
        />
      </Host>
    );
  }
}
