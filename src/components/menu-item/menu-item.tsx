import _ from 'lodash';
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  Watch,
} from '@stencil/core';
import uuid from 'uuid';
import {
  getOffsetLeft,
  getOffsetTop,
  getScrollLeft,
  getScrollTop,
} from '../../utils/position-helper';
import { ComponentSize } from '../../interface';

@Component({
  tag: 'eui-menu-item',
  styleUrl: 'menu-item.scss',
  scoped: true,
})
export class MenuItem {
  @Element() el: HTMLElement;

  /**
   * sets the type of component
   * if type is 'default' the component has no dropdown
   * if type is 'click' the component has dropdown and it opens when the component is clicked
   * if type is 'hover' the component has dropdown and it opens when the component is hovered
   * if type is 'icon' the component has dropdown and it opens when the chevron in the component is clicked
   *
   * @type {'default' | 'click' | 'hover' | 'icon'}
   */
  @Prop() type: 'default' | 'click' | 'hover' | 'icon' = 'default';

  /**
   * sets the size of the component can be 'small', 'medium' or 'large' defaults to 'small'
   */
  @Prop() size?: ComponentSize = 'small';

  /**
   * sets the open state of the dropdown of the component
   *
   * @type {boolean}
   */
  @Prop({ mutable: true }) isDropdownOpen: boolean = false;

  /**
   * sets the element to which the dropdown should be appended if present
   */
  @Prop({ mutable: true }) dropdownParent: HTMLElement = document.body;
  /**
   * sets the width of the dropdown if present
   */
  @Prop({ mutable: true }) dropdownWidth: number = 150;

  /**
   * sets the level of indent
   */
  @Prop() indent: number = 0;

  /**
   * the amount by which each level is indented to the previous level
   */
  @Prop() indentAmount: number = 12;
  /**
   * adds checked design to the component
   */
  @Prop() checked: boolean = false;
  /**
   * adds selected design to the component
   */
  @Prop() selected: boolean = false;
  /**
   * adds disabled design to the component prevents mouse click events and the opening of the dropdown
   */
  @Prop() disabled: boolean = false;

  /**
   * unique id of the menu item
   */
  @Prop({ mutable: true, reflect: true }) uuid: string = uuid.v4();

  /**
   * label that is to be displayed in the item
   */
  @Prop({ mutable: true, reflect: true }) itemLabel: string = '';
  /**
   * sets the position of selected line
   */
  @Prop({ mutable: true, reflect: true }) linePosition: 'left' | 'bottom' | 'top' | 'right' =
    'left';
  /**
   * sets the position of the dropdown
   */
  @Prop({ mutable: true, reflect: true }) nestPosition: 'bottom' | 'left' | 'right' | 'top' =
    'bottom';
  /**
   * sets the alignment of the dropdown
   */
  @Prop({ mutable: true, reflect: true }) nestAlignment: 'start' | 'center' | 'end' = 'start';

  /**
   * emitted when dropdown is opened or closed
   */
  @Event({ bubbles: true }) dropdownStateChange: EventEmitter<boolean>;

  /**
   * emitted when dropdown is closed
   */
  @Event({ bubbles: true }) closeDropdown: EventEmitter<string>;

  dropdownContentWrapper: HTMLElement;

  dropdown: HTMLEuiDropdownElement = null;

  @Listen('click') clickHandler(ev: MouseEvent): void {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    if (this.type === 'click') {
      this.toggleDropdown();
    }
  }

  @Listen('mouseenter') mouseEnterHandler(): void {
    if (this.disabled) {
      return;
    }
    if (this.type === 'hover') {
      this.isDropdownOpen = true;
    }
  }

  @Listen('click', { target: 'document' })
  documentClickListener(ev: MouseEvent): void {
    this.eventElsewhereHandler(ev);
  }

  @Listen('touchstart', { target: 'document' })
  documentTouchstartListener(ev: TouchEvent): void {
    this.eventElsewhereHandler(ev);
  }

  @Listen('mousemove', { target: 'document' })
  documentMousemoveListener(ev: MouseEvent): void {
    if (this.type === 'hover') {
      this.eventElsewhereHandler(ev);
    }
  }

  @Listen('closeDropdown', { target: 'document' })
  closeDropdownHandler(ev: CustomEvent<string>): void {
    if (this.type === 'default') {
      return;
    }
    if (this.uuid !== ev.detail) {
      let childOpen = false;
      if (this.dropdown) {
        Array.from(this.dropdown.children).forEach((child: HTMLEuiMenuItemElement) => {
          if (child.isDropdownOpen || ev.detail === child.uuid) {
            childOpen = true;
          }
        });
      }
      if (!childOpen) {
        this.isDropdownOpen = false;
      }
    }
  }

  @Listen('repositionDropdowns', { target: 'window' })
  parentScrolled(ev: CustomEvent<HTMLElement>): void {
    if (this.type === 'default') {
      return;
    }
    if (this.dropdownParent === ev.detail) {
      this.setDropdownDimensions();
    }
  }

  @Listen('scroll', { target: 'document', capture: true })
  scrollCapture(): void {
    if (this.type === 'default') {
      return;
    }
    this.setDropdownDimensions();
  }

  /**
   * @internal
   * @return {Promise<void>}
   */
  @Method()
  async triggerSetup(): Promise<void> {
    if (this.type === 'default') {
      return;
    }
    this.setUpDropDown();
    return;
  }

  @Watch('isDropdownOpen')
  isDropdownOpenChange(newVal: boolean): void {
    if (this.type === 'default') {
      return;
    }
    if (newVal !== null) {
      if (newVal) {
        if (this.dropdownWidth) {
          this.dropdown.width = this.dropdownWidth + 'px';
        }
        this.setDropdownDimensions();
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
      this.dropdownStateChange.emit(newVal);
    }
  }

  setDropdownDimensions(): void {
    if (this.type === 'default' || !this.dropdown) {
      return;
    }
    this.dropdown.position = {};
    if (this.nestPosition === 'bottom' || this.nestPosition === 'top') {
      if (this.nestAlignment === 'start') {
        this.dropdown.position.left = getOffsetLeft(this.el) - getScrollLeft(this.el);
      }
      if (this.nestAlignment === 'end') {
        this.dropdown.position.right =
          window.innerWidth -
          (getOffsetLeft(this.el) - getScrollLeft(this.el) + this.el.offsetWidth);
      }
      if (this.nestPosition === 'bottom') {
        this.dropdown.position.top =
          getOffsetTop(this.el) + this.el.offsetHeight - getScrollTop(this.el);
      }
      if (this.nestPosition === 'top') {
        this.dropdown.position.bottom =
          window.innerHeight - (getOffsetTop(this.el) - getScrollTop(this.el));
      }
    }
    if (this.nestPosition === 'left' || this.nestPosition === 'right') {
      if (this.nestAlignment === 'start') {
        this.dropdown.position.top = getOffsetTop(this.el) - getScrollTop(this.el);
      }
      if (this.nestAlignment === 'end') {
        this.dropdown.position.bottom =
          window.innerHeight -
          (getOffsetTop(this.el) - getScrollTop(this.el) + this.el.offsetHeight);
      }
      if (this.nestPosition === 'right') {
        this.dropdown.position.left =
          getOffsetLeft(this.el) + this.el.offsetWidth - getScrollLeft(this.el);
      }
      if (this.nestPosition === 'left') {
        this.dropdown.position.right =
          window.innerWidth - (getOffsetLeft(this.el) - getScrollLeft(this.el));
      }
    }
  }

  toggleDropdown(): void {
    if (this.type === 'default') {
      return;
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  eventElsewhereHandler(ev: MouseEvent | TouchEvent): void {
    if (this.type === 'default') {
      return;
    }
    let childOpen: boolean = false;
    if (this.dropdown && this.dropdown.children) {
      Array.from(this.dropdown.children).forEach((child: HTMLEuiMenuItemElement) => {
        if (child.isDropdownOpen) {
          childOpen = true;
        }
      });
    }
    const path = ev.composedPath();
    const itemIndex = path.indexOf(this.el);
    const match = _.isNumber(itemIndex) && itemIndex !== -1;
    const dropdownMatchArray = path.filter((item: HTMLElement) => {
      return (
        item.localName === 'eui-dropdown' && (item as HTMLEuiDropdownElement).openerId === this.uuid
      );
    });
    if (!childOpen && !match && dropdownMatchArray.length === 0) {
      this.isDropdownOpen = false;
    }
  }

  componentDidRender(): void {
    this.setUpDropDown();
  }
  componentDidLoad(): void {
    this.dropdown = document.createElement('eui-dropdown');
    this.dropdown.openerId = this.uuid;
  }

  setUpDropDown(): void {
    if (!this.dropdown) {
      return;
    }
    const dropdownContent = Array.from(this.dropdownContentWrapper.children).map((item) => {
      item.slot = '';
      return item;
    });
    dropdownContent.forEach((item) => {
      this.dropdown.appendChild(item);
    });
  }

  render(): HTMLEuiMenuItemElement {
    return (
      <Host
        class={{
          disabled: this.disabled,
          selected: this.selected,
          checked: this.checked,
          [this.linePosition + '-line']: true,
        }}
        style={{
          '--padding': 'var(--padding-' + this.size + ')',
          '--font-size': 'var(--font-size-' + this.size + ')',
          '--line-height': 'var(--line-height-' + this.size + ')',
          '--marker-width': 'var(--marker-width-' + this.size + ')',
          '--marker-height': 'var(--marker-height-' + this.size + ')',
          paddingLeft: this.indentAmount * ((this.indent || 0) + 1) + 'px'
        }}
      >
        <slot name="leading" />
        {this.itemLabel && <span class="item-label">{this.itemLabel}</span>}
        <slot />
        {this.type !== 'default' && (
          <eui-icon
            size="medium"
            icon={this.isDropdownOpen ? 'chevron-up' : 'chevron-down'}
            onClick={(ev) => {
              if (this.disabled) {
                return;
              }
              if (this.type === 'icon') {
                ev.preventDefault();
                ev.stopPropagation();
                this.toggleDropdown();
                this.closeDropdown.emit(this.uuid);
              }
            }}
          />
        )}
        <div class="trailing">
          <slot name="trailing" />
        </div>
        {this.type !== 'default' && (
          <div
            class="dropdown-wrapper"
            ref={(el) => {
              this.dropdownContentWrapper = el;
            }}
          >
            <slot name="dropdown" />
          </div>
        )}
      </Host>
    );
  }
}
