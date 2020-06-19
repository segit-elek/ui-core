import { newE2EPage } from '@stencil/core/testing';

describe('render', () => {
  it('should render an eui-item-counter', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-item-counter></eui-item-counter>`);
    const menuItem = await page.find('eui-item-counter');
    expect(menuItem.textContent).toBe('1 of 1 item');
  });
});
