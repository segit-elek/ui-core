import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import _ from 'lodash';
import { Breakpoints, ColDescriptor } from '../../interface';

@Component({
  tag: 'eui-col',
  styleUrl: 'col.scss',
  scoped: true,
})
export class Col2 {
  @Element() el: HTMLElement;
  /**
   * sets the width of the col according to the parent row's `spans`
   *
   * @type number
   */
  @Prop({ reflect: true }) span: number;
  /**
   * sets the ordering of the columns
   *
   * @type number
   */
  @Prop({ reflect: true }) order: number;
  /**
   * sets left of the col proportionately to the spans of the parent
   *
   * @type number
   */
  @Prop({ reflect: true }) offset: number;

  /**
   * sets the width of the col according to the parent row's `spans` for below xs breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) xsSpan: number;
  /**
   * sets the width of the col according to the parent row's `spans` for below sm breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) smSpan: number;
  /**
   * sets the width of the col according to the parent row's `spans` for below md breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) mdSpan: number;
  /**
   * sets the width of the col according to the parent row's `spans` for below lg breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) lgSpan: number;
  /**
   * sets the width of the col according to the parent row's `spans` for below xl breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) xlSpan: number;
  /**
   * sets the width of the col according to the parent row's `spans` for below xxl breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) xxlSpan: number;
  /**
   * sets the width of the col according to the parent row's `spans` for xxl breakpoint and over
   *
   * @type number
   */
  @Prop({ reflect: true }) xxxlSpan: number;

  /**
   * sets the ordering of the columns for below xs breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) xsOrder: number;
  /**
   * sets the ordering of the columns for below sm breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) smOrder: number;
  /**
   * sets the ordering of the columns for below md breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) mdOrder: number;
  /**
   * sets the ordering of the columns for below lg breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) lgOrder: number;
  /**
   * sets the ordering of the columns for below xl breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) xlOrder: number;
  /**
   * sets the ordering of the columns for below xxl breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) xxlOrder: number;
  /**
   * sets the ordering of the columns for xxl breakpoint and over
   *
   * @type number
   */
  @Prop({ reflect: true }) xxxlOrder: number;

  /**
   * sets left of the col proportionately to the spans of the parent for below xs breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) xsOffset: number;
  /**
   * sets left of the col proportionately to the spans of the parent for below sm breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) smOffset: number;
  /**
   * sets left of the col proportionately to the spans of the parent for below md breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) mdOffset: number;
  /**
   * sets left of the col proportionately to the spans of the parent for below lg breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) lgOffset: number;
  /**
   * sets left of the col proportionately to the spans of the parent for below xl breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) xlOffset: number;
  /**
   * sets left of the col proportionately to the spans of the parent for below xxl breakpoint
   *
   * @type number
   */
  @Prop({ reflect: true }) xxlOffset: number;
  /**
   * sets left of the col proportionately to the spans of the parent for xxl breakpoint and over
   *
   * @type number
   */
  @Prop({ reflect: true }) xxxlOffset: number;

  /**
   * sets all parameters of the component for below xs breakpoint when an object is passed
   * or sets the span of the component when number is passed
   *
   * @type (number | ColDescriptor)
   */
  @Prop({ reflect: true }) xs: number | ColDescriptor;
  /**
   * sets all parameters of the component for below sm breakpoint when an object is passed
   * or sets the span of the component when number is passed
   *
   * @type (number | ColDescriptor)
   */
  @Prop({ reflect: true }) sm: number | ColDescriptor;
  /**
   * sets all parameters of the component for below md breakpoint when an object is passed
   * or sets the span of the component when number is passed
   *
   * @type (number | ColDescriptor)
   */
  @Prop({ reflect: true }) md: number | ColDescriptor;
  /**
   * sets all parameters of the component for below lg breakpoint when an object is passed
   * or sets the span of the component when number is passed
   *
   * @type (number | ColDescriptor)
   */
  @Prop({ reflect: true }) lg: number | ColDescriptor;
  /**
   * sets all parameters of the component for below xl breakpoint when an object is passed
   * or sets the span of the component when number is passed
   *
   * @type (number | ColDescriptor)
   */
  @Prop({ reflect: true }) xl: number | ColDescriptor;
  /**
   * sets all parameters of the component for below xxl breakpoint when an object is passed
   * or sets the span of the component when number is passed
   *
   * @type (number | ColDescriptor)
   */
  @Prop({ reflect: true }) xxl: number | ColDescriptor;
  /**
   * sets all parameters of the component for xxl breakpoint and over when an object is passed
   * or sets the span of the component when number is passed
   *
   * @type (number | ColDescriptor)
   */
  @Prop({ reflect: true }) xxxl: number | ColDescriptor;

  breakpoints: Breakpoints = null;
  maxSpan: number = 12;
  parent: HTMLEuiRowElement = null;

  sizes: string[] = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
    'xxxl'
  ];

  @State() renderTrigger: number;
  @Listen('resize', { target: 'window' }) windowResizeListener(): void {
    this.renderTrigger = Math.random();
  }

  componentWillRender(): void {
    this.parent = this.el.parentElement as HTMLEuiRowElement;
    this.maxSpan = this.parent.spans || 12;
    this.breakpoints = this.parent.breakpoints;
  }

  render(): HTMLEuiColElement {
    const span: number =  this.getPropertyValue('span', 'Span');
    const spanText: string =  'calc(100% * ' +  (span || this.maxSpan) / this.maxSpan + ')';
    const offset: number = this.getPropertyValue('offset', 'Offset');
    const offsetText: string = 'calc(100% * ' +  (offset || 0) / this.maxSpan + ')';
    const order: number = this.getPropertyValue('order', 'Order');
    const orderText: string = order + '';
    const gutter: number = this.getGutters('gutter');
    const gutterText: string = gutter / 2 + 'px';
    const verticalGutter: number = this.getGutters('verticalGutter');
    const verticalGutterText: string = verticalGutter / 2 + 'px';
    return (
      <Host
        style={{
          'width': spanText,
          'margin-left': offsetText,
          'padding-left': gutterText,
          'padding-right': gutterText,
          'padding-bottom': verticalGutterText,
          'padding-top': verticalGutterText,
          'order': _.isNumber(order) ? orderText : 'initial'
        }}
      >
        <slot/>
      </Host>
    );
  }

  getCurrentBreakpoint(): 'xs' |  'sm' |  'md' |  'lg' |  'xl' |  'xxl' |  'xxxl' {
    const windowWidth = window.innerWidth;
    let result: 'xs' |  'sm' |  'md' |  'lg' |  'xl' |  'xxl' |  'xxxl' = 'xxxl';
    Object.entries(this.breakpoints).reverse().forEach(([key, value]: ['xs' |  'sm' |  'md' |  'lg' |  'xl' |  'xxl' |  'xxxl', number]) => {
      if (windowWidth < value) {
        result = key;
      }
    });
    return result;
  }

  getGutters(gutterType: 'gutter' | 'verticalGutter'): number {
    let returnValue: number = 0;
    if (this.parent[gutterType]) {
      if (typeof this.parent[gutterType] === 'object') {
        const currentBreakpoint = this.getCurrentBreakpoint();
        let match = false;
        this.sizes.forEach((size) => {
          if (!match) {
            match = size === currentBreakpoint;
            returnValue = this.parent[gutterType][size];
          }
        });
      } else {
        returnValue = (this.parent[gutterType] as number);
      }
    }
    return returnValue;

  }

  getPropertyValue(param: 'span' | 'order' | 'offset', paramConjoined: 'Span' | 'Order' | 'Offset'): number {
    const that = this;
    let returnValue: number = that[param];
    const currentBreakpoint = this.getCurrentBreakpoint();
    let match = false;
    this.sizes.forEach((size) => {
      if (!match) {
        match = size === currentBreakpoint;
        if (that[size]) {
          if (typeof that[size] === 'object') {
            returnValue = _.isNumber(that[size][param])
              ? that[size][param]
              : _.isNumber(that[size + paramConjoined])
                ? that[size + paramConjoined]
                : returnValue;
          } else {
            returnValue = (that[param] as number) || returnValue;
          }
        } else {
          returnValue = _.isNumber(that[size + paramConjoined]) ? that[size + paramConjoined] : returnValue;
        }
      }
    });
    return returnValue;
  }

}
