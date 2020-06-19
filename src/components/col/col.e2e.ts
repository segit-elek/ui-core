import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

const selector = 'eui-col';
const pageContent = `
  <eui-row>
    <${selector}/>
  </eui-row>
`;

describe('parent communication', () => {
  let page: E2EPage;
  let row: E2EElement;
  let col: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(pageContent);
    row = await page.find(`eui-row`);
    col = await page.find(`eui-col`);
    await page.waitForChanges();
  });

  it('should set gutter according to parent', async () => {

    await row.setProperty('gutter', {
      xs: 10,
      sm: 14,
      md: 18,
      lg: 22,
      xl: 26,
      xxl: 30,
      xxxl: 34,
    });
    await page.waitForChanges();
    let style;
    await page.setViewport({width: 300, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    expect(style.paddingLeft).toBe('5px');
    expect(style.paddingRight).toBe('5px');
    await page.setViewport({width: 500, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    expect(style.paddingLeft).toBe('7px');
    expect(style.paddingRight).toBe('7px');
    await page.setViewport({width: 700, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    expect(style.paddingLeft).toBe('9px');
    expect(style.paddingRight).toBe('9px');
    await page.setViewport({width: 900, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    expect(style.paddingLeft).toBe('11px');
    expect(style.paddingRight).toBe('11px');
    await page.setViewport({width: 1100, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    expect(style.paddingLeft).toBe('13px');
    expect(style.paddingRight).toBe('13px');
    await page.setViewport({width: 1300, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    expect(style.paddingLeft).toBe('15px');
    expect(style.paddingRight).toBe('15px');
    await page.setViewport({width: 1900, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    expect(style.paddingLeft).toBe('17px');
    expect(style.paddingRight).toBe('17px');

  });

  it('should set width based on span and parent', async () => {

    row.setProperty('spans', 20);
    col.setProperty('span', 2);
    await page.waitForChanges();
    let style = await col.getComputedStyle();
    let rowWidthString = (await row.getComputedStyle()).width;
    let rowWidth = parseFloat(rowWidthString);

    await page.waitForChanges();
    expect(Math.round(parseFloat(style.width))).toBeCloseTo(Math.round(rowWidth * 2 / 20));

  });

  it('should responsively set width based on span and parent', async () => {
    row.setProperty('spans', 12);
    col.setProperty('xsSpan', 12);
    col.setProperty('smSpan', 10);
    col.setProperty('mdSpan', 8);
    col.setProperty('lgSpan', 6);
    col.setProperty('xlSpan', 4);
    col.setProperty('xxlSpan', 3);
    col.setProperty('xxxlSpan', 2);
    await page.setViewport({width: 300, height: 500});
    await page.waitForChanges();
    let style = await col.getComputedStyle();
    let rowWidthString = (await row.getComputedStyle()).width;
    let rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.width))).toBeCloseTo(Math.round(rowWidth * 12 / 12));
    await page.setViewport({width: 500, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    rowWidthString = (await row.getComputedStyle()).width;
    rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.width))).toBeCloseTo(Math.round(rowWidth * 10 / 12));
    await page.setViewport({width: 700, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    rowWidthString = (await row.getComputedStyle()).width;
    rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.width))).toBeCloseTo(Math.round(rowWidth * 8 / 12));
    await page.setViewport({width: 900, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    rowWidthString = (await row.getComputedStyle()).width;
    rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.width))).toBeCloseTo(Math.round(rowWidth * 6 / 12));
    await page.setViewport({width: 1100, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    rowWidthString = (await row.getComputedStyle()).width;
    rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.width))).toBeCloseTo(Math.round(rowWidth * 4 / 12));
    await page.setViewport({width: 1300, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    rowWidthString = (await row.getComputedStyle()).width;
    rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.width))).toBeCloseTo(Math.round(rowWidth * 3 / 12));
    await page.setViewport({width: 1900, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    rowWidthString = (await row.getComputedStyle()).width;
    rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.width))).toBeCloseTo(Math.round(rowWidth * 2 / 12));

  });

  it('should responsively set offset based on offset and parent', async () => {
    row.setProperty('spans', 12);
    col.setProperty('xsOffset', 12);
    col.setProperty('smOffset', 10);
    col.setProperty('mdOffset', 8);
    col.setProperty('lgOffset', 6);
    col.setProperty('xlOffset', 4);
    col.setProperty('xxlOffset', 3);
    col.setProperty('xxxlOffset', 2);
    await page.setViewport({width: 300, height: 500});
    await page.waitForChanges();
    let style = await col.getComputedStyle();
    let rowWidthString = (await row.getComputedStyle()).width;
    let rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.marginLeft))).toBeCloseTo(Math.round(rowWidth * 12 / 12));
    await page.setViewport({width: 500, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    rowWidthString = (await row.getComputedStyle()).width;
    rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.marginLeft))).toBeCloseTo(Math.round(rowWidth * 10 / 12));
    await page.setViewport({width: 700, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    rowWidthString = (await row.getComputedStyle()).width;
    rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.marginLeft))).toBeCloseTo(Math.round(rowWidth * 8 / 12));
    await page.setViewport({width: 900, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    rowWidthString = (await row.getComputedStyle()).width;
    rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.marginLeft))).toBeCloseTo(Math.round(rowWidth * 6 / 12));
    await page.setViewport({width: 1100, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    rowWidthString = (await row.getComputedStyle()).width;
    rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.marginLeft))).toBeCloseTo(Math.round(rowWidth * 4 / 12));
    await page.setViewport({width: 1300, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    rowWidthString = (await row.getComputedStyle()).width;
    rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.marginLeft))).toBeCloseTo(Math.round(rowWidth * 3 / 12));
    await page.setViewport({width: 1900, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    rowWidthString = (await row.getComputedStyle()).width;
    rowWidth = parseFloat(rowWidthString);
    await page.waitForChanges();
    expect(Math.round(parseFloat(style.marginLeft))).toBeCloseTo(Math.round(rowWidth * 2 / 12));

  });

  it('should set pull order on order', async () => {

    col.setProperty('order', 2);
    await page.waitForChanges();
    let style = await col.getComputedStyle();
    await page.waitForChanges();
    expect(style.order).toBe('2');

  });

  it('should responsively set order based on order', async () => {
    col.setProperty('xsOrder', 12);
    col.setProperty('smOrder', 10);
    col.setProperty('mdOrder', 8);
    col.setProperty('lgOrder', 6);
    col.setProperty('xlOrder', 4);
    col.setProperty('xxlOrder', 3);
    col.setProperty('xxxlOrder', 2);
    await page.setViewport({width: 300, height: 500});
    await page.waitForChanges();
    let style = await col.getComputedStyle();
    await page.waitForChanges();
    expect(style.order).toBe('12');
    await page.setViewport({width: 500, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    await page.waitForChanges();
    expect(style.order).toBe('10');
    await page.setViewport({width: 700, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    await page.waitForChanges();
    expect(style.order).toBe('8');
    await page.setViewport({width: 900, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    await page.waitForChanges();
    expect(style.order).toBe('6');
    await page.setViewport({width: 1100, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    await page.waitForChanges();
    expect(style.order).toBe('4');
    await page.setViewport({width: 1300, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    await page.waitForChanges();
    expect(style.order).toBe('3');
    await page.setViewport({width: 1900, height: 500});
    await page.waitForChanges();
    style = await col.getComputedStyle();
    await page.waitForChanges();
    expect(style.order).toBe('2');

  });
});
