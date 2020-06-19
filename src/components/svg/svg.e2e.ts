import { newE2EPage } from '@stencil/core/testing';

describe('render', () => {
  it('should not render anything if there is no content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-svg src="/invalid_svg.svg"></eui-svg>`);
    const element = await page.find('eui-svg');
    expect(element.innerHTML.trim()).toBe('');
  });
});
