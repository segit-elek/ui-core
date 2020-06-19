import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

const selector = 'eui-row';
const pageContent = `
  <${selector}>
  </${selector}>
`;

describe('should resize', () => {
  let page: E2EPage;
  let el: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(pageContent);
    el = await page.find(`${selector}`);
    await page.waitForChanges();
    el.setProperty('gutter', {
      xs: 10,
      sm: 14,
      md: 18,
      lg: 22,
      xl: 26,
      xxl: 30,
      xxxl: 34,
    });
  });

  it('should set it\'s left and right margin according to viewport and gutter param', async () => {
    let style;
    await page.setViewport({width: 300, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-5px');
    expect(style.marginRight).toBe('-5px');
    await page.setViewport({width: 500, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-7px');
    expect(style.marginRight).toBe('-7px');
    await page.setViewport({width: 700, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-9px');
    expect(style.marginRight).toBe('-9px');
    await page.setViewport({width: 900, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-11px');
    expect(style.marginRight).toBe('-11px');
    await page.setViewport({width: 1100, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-13px');
    expect(style.marginRight).toBe('-13px');
    await page.setViewport({width: 1300, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-15px');
    expect(style.marginRight).toBe('-15px');
    await page.setViewport({width: 1900, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-17px');
    expect(style.marginRight).toBe('-17px');
  });

  it('should set it\'s left and right margin according to viewport and gutter param accoding to breakpoints', async () => {
    el.setProperty('breakpoints', {
      xs: 500,
      sm: 510,
      md: 520,
      lg: 530,
      xl: 540,
      xxl: 550

    });
    await page.waitForChanges();
    let style;
    await page.setViewport({width: 495, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-5px');
    expect(style.marginRight).toBe('-5px');
    await page.setViewport({width: 505, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-7px');
    expect(style.marginRight).toBe('-7px');
    await page.setViewport({width: 515, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-9px');
    expect(style.marginRight).toBe('-9px');
    await page.setViewport({width: 525, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-11px');
    expect(style.marginRight).toBe('-11px');
    await page.setViewport({width: 535, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-13px');
    expect(style.marginRight).toBe('-13px');
    await page.setViewport({width: 545, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-15px');
    expect(style.marginRight).toBe('-15px');
    await page.setViewport({width: 555, height: 500});
    await page.waitForChanges();
    style = await el.getComputedStyle();
    expect(style.marginLeft).toBe('-17px');
    expect(style.marginRight).toBe('-17px');
  });
});
