import { Animation } from '../../../interface';
import { createAnimation } from '../../../utils/animation/animation';

/**
 * Select Dropdown Leave Animation
 */
export const leaveAnimation = (baseEl: HTMLElement): Animation => {
  const baseAnimation = createAnimation();
  const wrapperAnimation = createAnimation();

  wrapperAnimation
    .addElement(baseEl.querySelector('.select-dropdown-wrapper')!)
    .fromTo('opacity', 1, 0);
    // .fromTo('transform', 'scale(1)', 'scale(0.85)');

  return baseAnimation
    .addElement(baseEl)
    .easing('ease')
    .duration(250)
    .addAnimation([wrapperAnimation]);
};
