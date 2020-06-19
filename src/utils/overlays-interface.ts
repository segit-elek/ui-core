import { EventEmitter } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';

import { AnimationBuilder } from '../interface';

export interface OverlayEventDetail<T = any> {
  data?: T;
  role?: string;
}

export interface OverlayInterface {
  el: HTMLElement;
  animated: boolean;
  keyboardClose: boolean;
  overlayIndex: number;
  presented: boolean;

  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;

  didPresent: EventEmitter<void>;
  willPresent: EventEmitter<void>;
  willDismiss: EventEmitter<OverlayEventDetail>;
  didDismiss: EventEmitter<OverlayEventDetail>;

  present(): Promise<void>;
  dismiss(data?: unknown, role?: string): Promise<boolean>;
}

export interface HTMLEuiOverlayElement extends HTMLStencilElement {
  overlayIndex: number;
  backdropDismiss?: boolean;

  position?: 'fixed' | 'absolute';
  wrapperElement?: HTMLElement | ShadowRoot;

  dismiss(data?: unknown, role?: string): Promise<boolean>;
}

// export type OverlaySelect = HTMLIonActionSheetElement | HTMLIonAlertElement | HTMLIonPopoverElement;
