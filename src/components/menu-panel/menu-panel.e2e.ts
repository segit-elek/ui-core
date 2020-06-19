import { newE2EPage } from '@stencil/core/testing';

describe('headerless', () => {
  it('should render left and right header', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <eui-menu-panel>
            <div slot="header-left" id="left">Left</div>
            <div slot="header-right" id="right">Right</div>
        </eui-menu-panel>
    `);
    await page.waitForChanges();
    const left = await page.find('#left');
    const right = await page.find('#right');
    expect(left).not.toBeNull();
    expect((await left.getComputedStyle()).display).not.toBe('none');
    expect(right).not.toBeNull();
    expect((await right.getComputedStyle()).display).not.toBe('none');
  });

  it('should not render header if headerless', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <eui-menu-panel headerless="true">
            <div slot="header-left" id="left">left</div>
            <div slot="header-right" id="right">Right</div>
            <div id="main">main</div>
        </eui-menu-panel>
    `);
    await page.waitForChanges();
    const left = await page.find('#left');
    const right = await page.find('#right');
    const main = await page.find('#main');

    expect(left).not.toBeNull();
    expect((await left.getComputedStyle()).display).toBe('none');
    expect(right).not.toBeNull();
    expect((await right.getComputedStyle()).display).toBe('none');
    expect(main).not.toBeNull();
    expect((await main.getComputedStyle()).display).not.toBe('none');
  });
});

describe('title', () => {
  it('should title as panelTitle', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-menu-panel panel-title="It Works!"></eui-menu-panel>`);
    const menuItem = await page.find('eui-menu-panel .title');
    await page.waitForChanges();
    expect(menuItem).toEqualText('It Works!');
  });
});
