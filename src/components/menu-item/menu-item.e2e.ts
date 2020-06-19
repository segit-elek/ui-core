import { newE2EPage } from '@stencil/core/testing';

describe('label', () => {
  it('should render span.item-label if itemLabel is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-menu-item item-label="Test"></eui-menu-item>`);
    const menuItemLabel = await page.find('eui-menu-item span.item-label');
    expect(menuItemLabel).not.toBeNull();
  });

  it('should render label string as a content of the eui-menu-item', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-menu-item item-label="Test"></eui-menu-item>`);
    // const el = await page.find('eui-menu-item');
    const menuItemLabel = await page.find('eui-menu-item span.item-label');
    expect(menuItemLabel).toEqualText('Test');
  });

  it('should overwrite item label if attribute is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-menu-item item-label="Test"></eui-menu-item>`);
    // const el = await page.find('eui-menu-item');
    const menuItemLabel = await page.find('eui-menu-item span.item-label');
    await page.$eval('eui-menu-item', (elm: HTMLEuiMenuItemElement) => {
      // within the browser's context
      // let's set new property values on the component
      elm.itemLabel = 'It Works!';
    });
    await page.waitForChanges();
    expect(menuItemLabel).toEqualText('It Works!');
  });

  it('should not render span.item-label if itemLabel is not set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-menu-item></eui-menu-item>`);
    const menuItemLabel = await page.find('eui-menu-item span.item-label');
    expect(menuItemLabel).toBeNull();
  });
});

describe('indent', () => {
  it('should be indented with amount set in indent parameter', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-menu-item indent="16"></eui-menu-item>`);
    const el = await page.find('eui-menu-item');
    const styles: CSSStyleDeclaration = await el.getComputedStyle();
    expect(styles.paddingLeft).toBe('204px');
  });
});
