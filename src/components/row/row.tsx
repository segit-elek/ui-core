import { Component, Element, h, Listen, Prop, State } from '@stencil/core';
import { Breakpoints } from '../../interface';

export interface Gutter {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  xxxl?: number;
}

@Component({
  tag: 'eui-row',
  styleUrl: 'row.scss',
})
export class Row {
  @Element() el: HTMLElement;
  /**
   * sets the max amount of spans that are to be displayed in the component
   * @type number
   */
  @Prop({ reflect: true }) spans: number = 12;
  /**
   * amount of space between cols horizontally
   */
  @Prop({ reflect: true }) gutter: number | Gutter = 12;
  /**
   * amount of space between cols vertically
   */
  @Prop({ reflect: true }) verticalGutter: number | Gutter = 12;
  /**
   * sets the breakpoint for window widths
   */
  @Prop({ reflect: true }) breakpoints: Breakpoints = {
    xs: 480,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
  };

  @State() renderTrigger: number;

  @Listen('resize', { target: 'window' }) async windowresizeListener(): Promise<void> {
    this.renderTrigger = Math.random();
  }

  componentWillRender(): void {
    let gutter;
    if (window.innerWidth <= this.breakpoints.xs) {
      gutter = this.getGutter('xs');
    }
    if (window.innerWidth > this.breakpoints.xs) {
      gutter = this.getGutter('sm');
    }
    if (window.innerWidth > this.breakpoints.sm) {
      gutter = this.getGutter('md');
    }
    if (window.innerWidth > this.breakpoints.md) {
      gutter = this.getGutter('lg');
    }
    if (window.innerWidth > this.breakpoints.lg) {
      gutter = this.getGutter('xl');
    }
    if (window.innerWidth > this.breakpoints.xl) {
      gutter = this.getGutter('xxl');
    }
    if (window.innerWidth > this.breakpoints.xxl) {
      gutter = this.getGutter('xxxl');
    }

    this.el.style.marginLeft = -gutter / 2 + 'px';
    this.el.style.marginRight = -gutter / 2 + 'px';
  }

  render(): HTMLEuiRowElement {
    return <slot />;
  }

  getGutter(gutterSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'): number {
    let gutter: number = 0;
    if (typeof this.gutter === 'object') {
      if (
        this.gutter.xs &&
        (gutterSize === 'xs' ||
          gutterSize === 'sm' ||
          gutterSize === 'md' ||
          gutterSize === 'lg' ||
          gutterSize === 'xl' ||
          gutterSize === 'xxl' ||
          gutterSize === 'xxxl')
      ) {
        gutter = this.gutter.xs;
      }
      if (
        this.gutter.sm &&
        (gutterSize === 'sm' ||
          gutterSize === 'md' ||
          gutterSize === 'lg' ||
          gutterSize === 'xl' ||
          gutterSize === 'xxl' ||
          gutterSize === 'xxxl')
      ) {
        gutter = this.gutter.sm;
      }
      if (
        this.gutter.md &&
        (gutterSize === 'md' ||
          gutterSize === 'lg' ||
          gutterSize === 'xl' ||
          gutterSize === 'xxl' ||
          gutterSize === 'xxxl')
      ) {
        gutter = this.gutter.md;
      }
      if (
        this.gutter.lg &&
        (gutterSize === 'lg' ||
          gutterSize === 'xl' ||
          gutterSize === 'xxl' ||
          gutterSize === 'xxxl')
      ) {
        gutter = this.gutter.lg;
      }
      if (
        this.gutter.xl &&
        (gutterSize === 'xl' || gutterSize === 'xxl' || gutterSize === 'xxxl')
      ) {
        gutter = this.gutter.xl;
      }
      if (this.gutter.xxl && (gutterSize === 'xxl' || gutterSize === 'xxxl')) {
        gutter = this.gutter.xxl;
      }
      if (this.gutter.xxxl && gutterSize === 'xxxl') {
        gutter = this.gutter.xxxl;
      }
    } else {
      gutter = this.gutter;
    }
    return gutter;
  }
}
