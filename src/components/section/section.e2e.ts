import { newE2EPage } from '@stencil/core/testing';

const selector = 'eui-section';
const pageContent = `
  <${selector}>
  </${selector}>
`;

describe('render', () => {
  it(`should render the component`, async () => {
    const page = await newE2EPage();
    await page.setContent(pageContent);
    const element = await page.find(selector);
    const content = await element.find('.body');
    await page.waitForChanges();
    expect(content).not.toBeNull();
  });

  it(`should hide the content if it's collapsible and collapsed`, async () => {
    const page = await newE2EPage();
    await page.setContent(pageContent);
    const element = await page.find(selector);
    element.setProperty('collapsed', true);
    element.setProperty('collapsible', true);
    const content = await element.find('.body');
    await page.waitForChanges();
    expect((await content.getComputedStyle()).display).toBe('none');
  });
});
