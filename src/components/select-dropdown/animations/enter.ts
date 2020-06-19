import { Animation } from '../../../interface';
import { createAnimation } from '../../../utils/animation/animation';

/**
 * Select Dropdown Enter Animation
 */
export const enterAnimation = (baseEl: HTMLElement): Animation => {
  const baseAnimation = createAnimation();
  const wrapperAnimation = createAnimation();

  wrapperAnimation
    .addElement(baseEl.querySelector('.select-dropdown-wrapper')!)
    .fromTo('opacity', 0.01, 1);
    // .fromTo('transform', 'scale(0.85)', 'scale(1)');

  return baseAnimation
    .addElement(baseEl)
    .easing('ease')
    .duration(250)
    .addAnimation([wrapperAnimation]);
};
