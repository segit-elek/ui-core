import { newE2EPage } from '@stencil/core/testing';

describe('render', () => {
  it('should render an eui-menu-controller', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-menu-controller></eui-menu-controller>`);
    const element = await page.find('eui-menu-controller');
    expect(element).not.toBeNull();
    expect(element).toHaveClass('hydrated');
  });
});

describe('children', () => {
  it('should hide all children except the first', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<eui-menu-controller><eui-menu-panel id="a" panel-name="a"></eui-menu-panel><eui-menu-panel id="b"></eui-menu-panel><eui-menu-panel id="c" panel-name="c"></eui-menu-panel></eui-menu-controller>`
    );
    const children = await page.findAll('eui-menu-controller eui-menu-panel');
    await page.waitForChanges();
    expect((await children[0].getComputedStyle()).opacity).toBe('1');
    expect((await children[1].getComputedStyle()).opacity).not.toBe('1');
    expect((await children[2].getComputedStyle()).opacity).not.toBe('1');
  });
  it('should hide all children except the selected one', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<eui-menu-controller selected-panel="b"><eui-menu-panel id="a" panel-name="a"></eui-menu-panel><eui-menu-panel id="b" panel-name="b"></eui-menu-panel><eui-menu-panel id="c" panel-name="c"></eui-menu-panel></eui-menu-controller>`
    );
    const children = await page.findAll('eui-menu-controller eui-menu-panel');
    await page.waitForChanges();
    expect((await children[0].getComputedStyle()).opacity).not.toBe('1');
    expect((await children[1].getComputedStyle()).opacity).toBe('1');
    expect((await children[2].getComputedStyle()).opacity).not.toBe('1');
  });
  it('should change displayed eui-menu-panel when selected-panel changes', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<eui-menu-controller selected-panel="a"><eui-menu-panel id="a" panel-name="a"></eui-menu-panel><eui-menu-panel id="b" panel-name="b"></eui-menu-panel><eui-menu-panel id="c" panel-name="c"></eui-menu-panel></eui-menu-controller>`
    );
    const children = await page.findAll('eui-menu-controller eui-menu-panel');
    expect((await children[0].getComputedStyle()).opacity).toBe('1');
    expect((await children[1].getComputedStyle()).opacity).not.toBe('1');
    expect((await children[2].getComputedStyle()).opacity).not.toBe('1');

    await page.$eval('eui-menu-controller', (elm: HTMLEuiMenuControllerElement) => {
      elm.selectedPanel = 'c';
    });
    await page.waitForChanges();

    expect((await children[0].getComputedStyle()).opacity).not.toBe('1');
    expect((await children[0].getComputedStyle()).position).toBe('absolute');
    expect((await children[1].getComputedStyle()).opacity).not.toBe('1');
    expect((await children[2].getComputedStyle()).opacity).not.toBe('0');
    expect((await children[2].getComputedStyle()).position).toBe('relative');
  });
});
