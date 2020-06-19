import { newE2EPage } from '@stencil/core/testing';

describe('screenshot', () => {
  it('should render an eui-button', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button text="Test - dsfnjksdhfjsdjkaF"></eui-button>`);
    const results = await page.compareScreenshot({});
    expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 });
    expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.2 });
  });
});

describe('label', () => {
  it('should render span.button-label if text is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button text="Test"></eui-button>`);
    const buttonLabel = await page.find('eui-button span.button-label');
    expect(buttonLabel).not.toBeNull();
  });

  it('should render label string as a content of the eui-button', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button text="Test"></eui-button>`);
    // const el = await page.find('eui-button');
    const buttonLabel = await page.find('eui-button span.button-label');
    expect(buttonLabel).toEqualText('Test');
  });

  it('should overwrite button label if attribute is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button text="Test"></eui-button>`);
    // const el = await page.find('eui-button');
    const buttonLabel = await page.find('eui-button span.button-label');
    await page.$eval('eui-button', (elm: HTMLEuiButtonElement) => {
      // within the browser's context
      // let's set new property values on the component
      elm.text = 'It Works!';
    });
    await page.waitForChanges();
    expect(buttonLabel).toEqualText('It Works!');
  });

  it('should not render span.button-title if buttonTitle is not set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button></eui-button>`);
    const buttonLabel = await page.find('eui-button span.button-label');
    expect(buttonLabel).toBeNull();
  });
});

describe('type', () => {
  it('should have outlined as type if type is not set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-button text="Test"></eui-button>`);
    const el = await page.find('eui-button');
    expect(el.getAttribute('type')).toBe('outlined');
  });
});
