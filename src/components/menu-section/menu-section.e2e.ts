import { newE2EPage } from '@stencil/core/testing';

describe('render', () => {
  it('should render content in content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-menu-section><div class="test"></div></eui-menu-section>`);
    const element = await page.find('eui-menu-section .content .test');
    expect(element).not.toBeNull();
  });
});

describe('sectionTitle', () => {
  it('should not render header if there is no sectionTitle', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-menu-section></eui-menu-section>`);
    const element = await page.find('eui-menu-section eui-menu-header');
    expect(element).toBeNull();
  });
  it('should render header if there is a sectionTitle', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-menu-section section-title="Test"></eui-menu-section>`);
    const element = await page.find('eui-menu-section eui-menu-header');
    expect(element).not.toBeNull();
  });
  it('should set sectionTitle as title if set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-menu-section section-title="Test"></eui-menu-section>`);
    const element = await page.find('eui-menu-section eui-menu-header');
    expect(element.innerText).toBe('Test');
  });
});

describe('collapsible / collapsed', () => {
  it('should hide content if collapsible and collapsed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<eui-menu-section section-title="Test" collapsible="true"></eui-menu-section>`
    );
    const header = await page.find('eui-menu-section eui-menu-header');
    const content = await page.find('eui-menu-section .content');
    await header.click();
    await page.waitForChanges();
    expect(await content.isVisible()).not.toBeTruthy();
  });
});
