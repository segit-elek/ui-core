import { newE2EPage } from '@stencil/core/testing';

const selector = 'eui-dropdown';
const pageContent = `
  <${selector}>
  </${selector}>
`;

describe('behaviour', () => {
  it('should not render content if not isOpen', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-dropdown><div class="content"></div></eui-dropdown>`);
    const content = await page.find(selector);
    await page.waitForChanges();
    const styles: CSSStyleDeclaration = await content.getComputedStyle();
    expect(styles.opacity).toBe('0');
  });
  it('should not render content if isOpen', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<eui-dropdown is-open="true"><div class="content"></div></eui-dropdown>`
    );
    const content = await page.find(selector);
    await page.waitForChanges();
    const styles: CSSStyleDeclaration = await content.getComputedStyle();
    expect(styles.display).toBe('block');
    expect(styles.opacity).toBe('1');
  });

  it('should fire openStateChange event on isOpen change', async () => {
    const page = await newE2EPage();
    await page.setContent(pageContent);
    const changeEvent = await page.spyOnEvent('openStateChange');
    const el = await page.find(selector);
    el.setAttribute('is-open', true);
    await page.waitForChanges();
    expect(changeEvent).toHaveReceivedEventDetail(true);
  });
});
