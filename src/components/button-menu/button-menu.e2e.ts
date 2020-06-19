import { newE2EPage } from '@stencil/core/testing';

describe('button', () => {
  it('should render an eui-button', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button-menu></eui-button-menu>`);
    const el = await page.find('eui-button-menu eui-button');
    expect(el).not.toBeNull();
  });

  it('should set text as text of eui-button', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button-menu text="Test"></eui-button-menu>`);
    const button = await page.find('eui-button-menu eui-button');
    expect(button.getAttribute('text')).toBe('Test');
  });
});

describe('dropdown', () => {
  it('should render an eui-dropdown', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button-menu></eui-button-menu>`);
    const menu = await page.find('eui-button-menu');
    menu.setProperty('isDropdownOpen', true);
    await page.waitForChanges();
    const el = await page.find('eui-dropdown');
    expect(el).not.toBeNull();
  });

  it('should open dropdown if button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button-menu></eui-button-menu>`);
    await page.waitForChanges();
    const button = await page.find('eui-button-menu eui-button');
    await button.click();
    await page.waitForChanges();
    const dropdown = await page.find('eui-dropdown');
    // await comp.callMethod('toggleDropdown');
    expect(dropdown).not.toBeNull();
    expect(dropdown.getAttribute('is-open')).not.toBeNull();
  });
});
