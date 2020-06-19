import { newE2EPage } from '@stencil/core/testing';

describe('render', () => {
  it('should render an eui-pagination', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-pagination></eui-pagination>`);
    const menuItem = await page.find('eui-pagination');
    expect(menuItem.textContent).toBe('Page 1 of 1');
  });
});
