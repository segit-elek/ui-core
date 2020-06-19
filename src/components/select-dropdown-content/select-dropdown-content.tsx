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
  State,
} from '@stencil/core';
import { BACKDROP } from '../../utils/overlays';
import { ComponentSize, EuiOptionInterface } from '../../interface';
import { Icons } from '../icon/icon';

@Component({
  tag: 'eui-select-dropdown-content',
  styleUrl: 'select-dropdown-content.scss',
  scoped: true,
})
export class SelectDropdownContent implements ComponentInterface {
  /**
   * component rendered for each option
   * @type string
   */
  @Prop() optionElement: string;
  /**
   * input to display loading state in the dropdown content
   */
  @Prop() isLoading: boolean = false;
  /**
   * size of the component
   */
  @Prop() size: ComponentSize = 'small';
  /**
   * data that is to be displayed
   */
  @Prop() options: EuiOptionInterface[] = [];

  /**
   * option's parameters
   */
  @Prop() params: {
    selectedIconPosition?: 'start' | 'end';
    selectedIconEnabled?: boolean;
    selectedIcon?: Icons;
    [key: string]: unknown
  } = {
    selectedIconPosition: 'end',
    selectedIconEnabled: true,
    selectedIcon: 'check'
  };

  @State() highlightedOptionIndex: number = null;
  @State() beingDismissed: boolean = false;

  @Element() el: HTMLEuiSelectDropdownContentElement;

  /**
   * emits when an option is clicked
   */
  @Event() buttonClick: EventEmitter;
  /**
   * emits when the dropdown should dismiss
   */
  @Event() dismiss: EventEmitter;

  private container: HTMLElement;

  @Listen('keydown', { target: 'document', capture: true })
  documentKeyupHandler(ev: KeyboardEvent): void {
    this.handleKeyDown(ev);
  }

  render(): HTMLElement {
    const Selector = this.optionElement;

    const options = this.options;
    return (
      <Host>
        <div class="action-sheet-container" role="dialog">
          <div
            class="action-sheet-group"
            ref={(el) => {
              this.container = el;
            }}
          >
            {this.isLoading ? (
              <eui-loading-spinner color={'var(--blue-6)'} />
            ) : (
              options.map((o, i) => {
                return (
                  <Selector
                    onMouseMove={() => {
                      if (!('ontouchstart' in document.documentElement)) {
                        this.highlightedOptionIndex = i;
                      }
                    }}
                    onMouseUp={() => {
                      this.buttonClickFN(o);
                    }}
                    option={o}
                    size={this.size}
                    params={{
                      ...this.params,
                      selected: o.checked,
                      isHighlighted: i === this.highlightedOptionIndex
                    }}
                  />
                );
              })
            )}
          </div>
        </div>
      </Host>
    );
  }

  buttonClickFN(o: EuiOptionInterface): void {
    this.buttonClick.emit(o);
  }

  private handleKeyDown(ev: KeyboardEvent): void {
    switch (ev.key) {
      case 'Esc':
      case 'Escape': {
        this.dismiss.emit([undefined, BACKDROP]);
        break;
      }
      case 'ArrowUp': {
        ev.stopPropagation();
        ev.preventDefault();
        if (!this.highlightedOptionIndex && this.highlightedOptionIndex !== 0) {
          this.highlightedOptionIndex = this.options.length - 1;
          (this.el.querySelectorAll('.dropdown-item')[
            this.highlightedOptionIndex
          ] as HTMLElement).focus();
        } else {
          if (this.highlightedOptionIndex > 0) {
            this.highlightedOptionIndex--;
          }
        }
        this.scrollContent('up');
        break;
      }
      case 'ArrowDown': {
        ev.stopPropagation();
        ev.preventDefault();
        if (!this.highlightedOptionIndex && this.highlightedOptionIndex !== 0) {
          this.highlightedOptionIndex = 0;
        } else {
          if (this.highlightedOptionIndex < this.options.length - 1) {
            this.highlightedOptionIndex++;
          }
        }
        this.scrollContent('down');
        break;
      }
      case 'Enter': {
        ev.stopPropagation();
        ev.preventDefault();
        if (ev.ctrlKey) {
          this.dismiss.emit([undefined, BACKDROP]);
        } else {
          this.buttonClickFN(this.options[this.highlightedOptionIndex]);
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  private scrollContent(direction: 'up' | 'down'): void {
    const targetElement: HTMLElement = this.el.querySelectorAll('.dropdown-item')[
      this.highlightedOptionIndex
    ] as HTMLElement;
    const needsScroll =
      direction === 'down'
        ? targetElement.offsetTop -
            this.container.offsetHeight -
            this.container.scrollTop +
            targetElement.offsetHeight >
          0
        : targetElement.offsetTop < this.container.scrollTop;

    const value =
      direction === 'down'
        ? this.container.scrollTop + targetElement.offsetHeight
        : this.container.scrollTop - targetElement.offsetHeight;
    if (needsScroll) {
      this.container.scrollTop = value;
    }
  }
}
