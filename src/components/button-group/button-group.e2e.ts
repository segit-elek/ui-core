import { newE2EPage } from '@stencil/core/testing';

describe('grouped', () => {
  it('should add grouped class to children', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button-group><div></div><div></div><div></div></eui-button-group>`);
    const els = await page.findAll('eui-button-group div');
    let allHasClassGrouped = true;
    els.forEach((el) => {
      if (!el.classList.contains('grouped')) {
        allHasClassGrouped = false;
      }
    });
    expect(allHasClassGrouped).toBeTruthy();
  });
  it('should add first class to first child', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button-group><div></div><div></div><div></div></eui-button-group>`);
    const els = await page.findAll('eui-button-group div');
    let hasFirstClass = els[0].classList.contains('first');
    expect(hasFirstClass).toBeTruthy();
  });
  it('should add last class to last child', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button-group><div></div><div></div><div></div></eui-button-group>`);
    const els = await page.findAll('eui-button-group div');
    let hasFirstClass = els[els.length - 1].classList.contains('last');
    expect(hasFirstClass).toBeTruthy();
  });
});
