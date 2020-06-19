import { newE2EPage } from '@stencil/core/testing';

describe('render', () => {
  it('should render eui-radio', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-radio label="A"></eui-radio>`);
    await page.waitForChanges();
    const container = await page.find('eui-radio');
    expect(container.textContent).toBe('A');
  });
});

describe('check', () => {
  it('should fire euiRadioChange event on value change', async () => {
    const page = await newE2EPage();
    await page.setContent('<eui-radio name="radio" label="A" value="a"></eui-radio>');
    const changeEvent = await page.spyOnEvent('euiRadioChange');
    const el = await page.find('eui-radio');

    await page.waitForChanges();
    const label = await el.find('label');
    await label.click();
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventDetail({'name': 'radio', 'value': 'a'});
  });
});
