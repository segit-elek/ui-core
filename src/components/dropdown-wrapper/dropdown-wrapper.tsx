import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  Watch
} from '@stencil/core';
import {
  getOffsetLeft,
  getOffsetTop,
  getScrollLeft,
  getScrollTop,
} from '../../utils/position-helper';
import _ from 'lodash';

@Component({
  tag: 'eui-dropdown-wrapper',
  styleUrl: 'dropdown-wrapper.scss',
  shadow: true,
})
export class DropdownWrapper implements ComponentInterface {
  @Element() el: HTMLElement;

  /**
   * sets and reflects the state of it's dropdown element
   * @type {boolean}
   */
  @Prop({ reflect: true, mutable: true }) isDropdownOpen?: boolean = false;

  /**
   * sets the parent element for the dropdown
   * @type {HTMLElement}
   */
  @Prop({ mutable: true }) dropdownParent?: HTMLElement = document.body;

  /**
   * sets the width of the dropdown
   * @type {(string | number)}
   */
  @Prop() dropdownWidth?: number | string = 150;

  /**
   * sets the alignment of the dropdown based on this element
   * @type {('left' | 'right')}
   */
  @Prop({ reflect: true }) dropdownAlignment?: 'left' | 'right' = 'left';

  dropdown: HTMLEuiDropdownElement = null;
  dropdownContent: Node[];

  /**
   * Triggers an event when the parent of  the dropdown is clicked
   */
  @Event({ bubbles: true }) clicked: EventEmitter;

  /**
   * Triggers an event after the dropdown state changed
   */
  @Event({ bubbles: true }) dropdownStateChanged: EventEmitter<boolean>;

  /**
   * @internal
   * @param {MouseEvent} ev
   */
  @Listen('click', { target: 'document' })
  documentClickListener(ev: MouseEvent): void {
    this.eventElsewhereHandler(ev);
  }

  /**
   * @internal
   * @param {TouchEvent} ev
   */
  @Listen('touchstart', { target: 'document' })
  documentTouchstartListener(ev: TouchEvent): void {
    this.eventElsewhereHandler(ev);
  }

  /**
   * Listens to event so it can reposition the dropdowns
   * @param {CustomEvent<HTMLElement>} ev
   */
  @Listen('repositionDropdowns', { target: 'document' })
  parentScrolled(ev: CustomEvent<HTMLElement>): void {
    if (this.dropdownParent === ev.detail && this.dropdown) {
      if (this.dropdownAlignment === 'left') {
        this.setDropdownDimensions();
      } else {
        this.setDropdownDimensions({left: (- this.dropdown.offsetWidth + this.el.offsetWidth)});
      }
    }
  }

  @Watch('isDropdownOpen')
  isDropdownOpenChange(newVal: boolean): void {
    if (newVal !== null && this.dropdown) {
      if (newVal) {
        if (this.dropdownWidth) {
          this.dropdown.width = this.dropdownWidth ? (_.isNumber(this.dropdownWidth) ? this.dropdownWidth : parseInt(this.dropdownWidth, 10)) + 'px' : '150px';
        }
        if (this.dropdownAlignment === 'left') {
          this.setDropdownDimensions();
        } else {
          this.setDropdownDimensions({left: (- this.dropdown.offsetWidth + this.el.offsetWidth)});
        }
        this.dropdownParent.appendChild(this.dropdown);
        setTimeout(() => {
          this.dropdown.isOpen = true;
        }, 50);
      } else {
        this.dropdown.isOpen = false;
        setTimeout(() => {
          this.dropdown.remove();
        }, 200);
      }
      this.dropdownStateChanged.emit(newVal);
    }
  }

  setDropdownDimensions(modifier: { top?: number; left?: number } = {}): void {
    this.dropdown.position = {
      top:
        getOffsetTop(this.el, this.dropdownParent) +
        this.el.offsetHeight +
        1 -
        getScrollTop(this.el, this.dropdownParent) +
        (modifier.top !== undefined ? 0 : +modifier.top),
      left:
        getOffsetLeft(this.el, this.dropdownParent) -
        1 -
        getScrollLeft(this.el, this.dropdownParent) +
        (modifier.left !== undefined ? 0 : +modifier.left),
    };
  }

  disconnectedCallback(): void {
    if (this.dropdown) {
      this.dropdown.remove();
    }
  }

  toggleDropdown(ev: MouseEvent): void {
    ev.stopPropagation();
    ev.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  eventElsewhereHandler(ev: MouseEvent | TouchEvent): void {
    const path = ev.composedPath();
    const match = path && path.indexOf(this.el) !== -1;
    const dropdownMatchArray = path.filter((item: HTMLElement) => {
      return item.localName === 'eui-dropdown';
    });
    if (!match && dropdownMatchArray.length === 0) {
      this.isDropdownOpen = false;
    }
  }

  componentDidLoad(): void {
    this.setUpDropDown();
  }

  setUpDropDown(): void {
    this.dropdown = document.createElement('eui-dropdown');
    this.dropdownContent = Array.from(this.el.children).filter((item) => item.slot === '');
    this.dropdownContent.forEach((item) => {
      this.dropdown.appendChild(item);
    });
  }

  render(): HTMLEuiDropdownWrapperElement {
    return (
      <Host>
        <div
          onClick={(ev) => {
            this.toggleDropdown(ev);
            this.clicked.emit(ev);
          }}
        >
          <slot name="parent" />
        </div>
        <div class="dropdown-wrapper">
          <slot />
        </div>
      </Host>
    );
  }
}
