import { newE2EPage } from '@stencil/core/testing';

const selector = 'eui-drawer';
const pageContent = `
  <${selector}>
  </${selector}>
`;

describe('methods', () => {
  it(`should toggle the sides of the ${selector} if toggleDrawer called`, async () => {
    const page = await newE2EPage();
    await page.setContent(pageContent);
    const element = await page.find(selector);
    await element.callMethod('toggleDrawer', 'left', true);
    await page.waitForChanges();
    expect(await (element.getProperty('leftDrawerIsOpen'))).toBeTruthy();
    await element.callMethod('toggleDrawer', 'right', true);
    await page.waitForChanges();
    expect(await (element.getProperty('rightDrawerIsOpen'))).toBeTruthy();
  });
});

describe('behaviour', () => {
  it(`should close the other side if the type is push`, async () => {
    const page = await newE2EPage();
    await page.setContent(pageContent);
    const element = await page.find(selector);
    element.setProperty('type', 'push');
    element.setProperty('leftDrawerIsOpen', true);
    await element.callMethod('toggleDrawer', 'right', true);
    expect(await (element.getProperty('leftDrawerIsOpen'))).toBeFalsy();
  });
  it(`should close the other side if the type is push`, async () => {
    const page = await newE2EPage();
    await page.setContent(pageContent);
    const element = await page.find(selector);
    element.setProperty('type', 'squish');
    element.setProperty('leftDrawerIsOpen', true);
    await element.callMethod('toggleDrawer', 'right', true);
    expect(await (element.getProperty('leftDrawerIsOpen'))).toBeTruthy();
  });
});

describe('events', () => {
  it(`should toggle the right side when it hears a toggleRightDrawer on the document`, async () => {
    const page = await newE2EPage();
    await page.setContent(pageContent);
    const element = await page.find(selector);
    element.setProperty('name', 'drawer');
    element.setProperty('rightDrawerIsOpen', true);
    await page.waitForChanges();
    expect(await (element.getProperty('rightDrawerIsOpen'))).toBeTruthy();
    await page.evaluate(() => {
      document.dispatchEvent(new CustomEvent('toggleRightDrawer', {detail: {drawerName: 'drawer', isOpen: false}}));
    });
    await page.waitForChanges();
    expect(await (element.getProperty('rightDrawerIsOpen'))).toBeFalsy();
  });
  it(`should toggle the left side when it hears a toggleLeftDrawer on the document`, async () => {
    const page = await newE2EPage();
    await page.setContent(pageContent);
    const element = await page.find(selector);
    element.setProperty('name', 'drawer');
    element.setProperty('leftDrawerIsOpen', true);
    await page.waitForChanges();
    expect(await (element.getProperty('leftDrawerIsOpen'))).toBeTruthy();
    await page.evaluate(() => {
      document.dispatchEvent(new CustomEvent('toggleLeftDrawer', {detail: {drawerName: 'drawer', isOpen: false}}));
    });
    await page.waitForChanges();
    expect(await (element.getProperty('leftDrawerIsOpen'))).toBeFalsy();
  });
  it(`should toggle the specified side when it hears a toggleDrawer on the document`, async () => {
    const page = await newE2EPage();
    await page.setContent(pageContent);
    const element = await page.find(selector);
    element.setProperty('name', 'drawer');
    element.setProperty('type', 'squish');
    element.setProperty('rightDrawerIsOpen', true);
    element.setProperty('leftDrawerIsOpen', true);
    await page.waitForChanges();
    expect(await (element.getProperty('rightDrawerIsOpen'))).toBeTruthy();
    expect(await (element.getProperty('leftDrawerIsOpen'))).toBeTruthy();
    await page.evaluate(() => {
      document.dispatchEvent(new CustomEvent('toggleDrawer', {detail: {drawerName: 'drawer', side: 'left', isOpen: false}}));
      document.dispatchEvent(new CustomEvent('toggleDrawer', {detail: {drawerName: 'drawer', side: 'right', isOpen: false}}));
    });
    await page.waitForChanges();
    expect(await (element.getProperty('rightDrawerIsOpen'))).toBeFalsy();
    expect(await (element.getProperty('leftDrawerIsOpen'))).toBeFalsy();
  });
});
