import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core';
import { ComponentSize, CssClassMap, EuiOptionInterface } from '../../interface';
import { Icons } from '../icon/icon';

@Component({
  tag: 'eui-select-dropdown-option',
  styleUrl: 'select-dropdown-option.scss',
  scoped: true,
})
export class SelectDropdownOption implements ComponentInterface {

  /**
   * option that is to be rendered
   */
  @Prop() option!: EuiOptionInterface;
  /**
   * size of the component
   */
  @Prop() size: ComponentSize = 'small';
  /**
   * parameter of the component
   * selected: sets selected design on the component
   * selectedIconPosition: position of the selected icon
   * selectedIconEnabled: sets whether selected icon is displayed
   * selectedIcon: icon that is rendered
   * isHighlighted: adds bg overlay to the component
   */
  @Prop() params: {
    selected?: boolean;
    selectedIconPosition?: 'start' | 'end';
    selectedIconEnabled?: boolean;
    selectedIcon?: Icons;
    isHighlighted?: boolean;
  } = {};

  @Element() el: HTMLEuiSelectDropdownOptionElement;

  getType(): string {
    if (this.option && this.option.type === 'group-title') {
      return 'group-title';
    }
    return 'option';
  }

  generateStyles(): { [key: string]: string } {
    const styles = {
      '--padding-top':
        'var(--padding-top-' + this.getType() + '-' + this.size + ')',
      '--padding-left':
        'var(--padding-left-' + this.getType() + '-' + this.size + ')',
      '--padding-right':
        'var(--padding-right-' + this.getType() + '-' + this.size + ')',
      '--padding-bottom':
        'var(--padding-bottom-' + this.getType() + '-' + this.size + ')',
      '--font-size':
        'var(--font-size-' + this.getType() + '-' + this.size + ')',
      '--line-height':
        'var(--line-height-' + this.getType() + '-' + this.size + ')',
      '--font-style':
        'var(--font-style-' + this.getType() + ')',
      '--font-weight':
        'var(--font-weight-' + this.getType() + ')',
      '--selected-icon-size':
        'var(--selected-icon-size-' + this.size + ')',
      '--selected-icon-padding':
        'var(--selected-icon-padding-' + this.size + ')',
      '--height': 'var(--height-' + this.size + ')',
      '--color':
        'var(--color-' +
        (this.option.type === 'action'
          ? 'action'
          : this.params.selected && this.getType() === 'option'
          ? 'active'
          : 'default') +
        ')',
    };
    return styles;
  }

  render(): HTMLElement {
    if (!this.option) {
      return <Host/>;
    }
    return (
      <Host
        style={this.generateStyles()}
        class={{
          highlighted: this.params.isHighlighted,
          selected: this.params.selected,
          [this.option.type || 'option']: true,
          ...this.buttonClass(),
        }}
      >
        {this.params.selectedIconEnabled && this.params.selectedIconPosition === 'start' && (
          <div class="selected-icon-wrapper start">
            {this.params.selected && <eui-icon icon={this.params.selectedIcon} />}
          </div>
        )}
        <div class="dropdown-item-inner">
          {this.option.icon && (
            <ion-icon icon={this.option.icon} lazy={false} className="action-sheet-icon" />
          )}
          <span>{this.option.label}</span>
        </div>
        {this.params.selectedIconEnabled &&
          this.params.selectedIconPosition === 'end' &&
          this.params.selected && (
            <div class="selected-icon-wrapper end">
              <eui-icon icon={this.params.selectedIcon} />
            </div>
          )}
      </Host>
    );
  }

  private buttonClass(): CssClassMap {
    const button = this.option;
    return {
      'dropdown-item': true,
      disabled: button.disabled,
      'ion-activatable': true,
    };
  }
}
