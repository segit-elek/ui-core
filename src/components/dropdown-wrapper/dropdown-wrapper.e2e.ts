import { newE2EPage } from '@stencil/core/testing';

const selector = 'eui-dropdown-wrapper';
const pageContent = `
  <${selector}>
    <eui-button slot="parent">Label</eui-button>
    <div>
        <a href="#">Link</a>
    </div>
  </${selector}>
`;

describe('behaviour', () => {
  it(`should show the dropdown when the parent button is clicked`, async () => {
    const page = await newE2EPage();
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    await page.setContent(pageContent);
    await page.waitForChanges();
    const element = await page.find(selector);
    const button = await element.find(`eui-button`);
    let dropdown = await page.find('eui-dropdown');
    expect(button).not.toBeNull();
    expect(dropdown).toBeNull();
    await button.click();
    await page.waitForChanges();
    dropdown = await page.find('eui-dropdown');
    expect(dropdown).not.toBeNull();
  });
});
