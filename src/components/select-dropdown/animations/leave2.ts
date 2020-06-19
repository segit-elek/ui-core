import { Animation } from '../../../interface';
import { createAnimation } from '../../../utils/animation/animation';

/**
 * Select Dropdown Leave Animation
 */
export const leave2Animation = (baseEl: HTMLElement): Animation => {
  const baseAnimation = createAnimation();
  const wrapperAnimation = createAnimation();

  wrapperAnimation
    .addElement(baseEl.querySelector('.select-dropdown-wrapper')!)
    .fromTo('backgroundColor', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)')
    // .fromTo('opacity', 1, 0.8)
    .fromTo('boxShadow', '0px 4px 12px rgba(60, 66, 87, 0.16), 0px 2px 6px rgba(60, 65, 92, 0.12)', '0px 0px 0px rgba(60, 66, 87, 0.16), 0px 0px 0px rgba(60, 65, 92, 0.12)')

  return baseAnimation
    .addElement(baseEl)
    .easing('ease')
    .duration(250)
    .addAnimation([wrapperAnimation]);
};
