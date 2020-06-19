import { newE2EPage } from '@stencil/core/testing';

const selector = 'eui-icon';
const pageContent = `<${selector}></${selector}>`;

describe('render', () => {
  it('should render the appropriate tag for the source', async () => {
    const page = await newE2EPage();
    await page.setContent(pageContent);

    const element = await page.find(selector);
    expect(element).not.toBeNull();

    element.setProperty('src', '/activity.svg');
    await page.waitForChanges();
    expect((await element.find('eui-svg'))).not.toBeNull();
    expect((await element.find('img'))).toBeNull();
    element.setProperty('src', '/something.jpg');
    await page.waitForChanges();
    expect((await element.find('eui-svg'))).toBeNull();
    expect((await element.find('img'))).not.toBeNull();
  });
});
