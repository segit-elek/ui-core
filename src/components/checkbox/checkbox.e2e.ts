import { newE2EPage } from '@stencil/core/testing';

describe('label', () => {

  it('should not render an checkbox-label in there is no label', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-checkbox></eui-checkbox>`);
    const el = await page.find('eui-checkbox .checkbox-label');
    expect(el).toBeNull();
  });
  it('should render an checkbox-label in there is label', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-checkbox label="Test"></eui-checkbox>`);
    const el = await page.find('eui-checkbox .checkbox-label');
    expect(el).not.toBeNull();
  });
  it('should set label as text of .checkbox-label', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-checkbox label="Test"></eui-checkbox>`);
    const el = await page.find('eui-checkbox .checkbox-label');
    expect(el).toEqualText('Test');
  });
});

describe('check', () => {

  it('should set checked atrr when label is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-checkbox></eui-checkbox>`);
    const el = await page.find('eui-checkbox');
    const container = await page.find('eui-checkbox .container');
    await container.click();
    expect(await el.getAttribute('checked')).not.toBeNull();
  });

  it('should fire onChanged event if change happen inside the component', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-checkbox></eui-checkbox>`);
    const changeEvent = await page.spyOnEvent('changed');
    const el = await page.find('eui-checkbox');
    el.setAttribute('checked', true);

    await page.waitForChanges();

    expect(changeEvent).not.toHaveReceivedEvent();
    const label = await el.find('label');
    await label.click();
    await page.waitForChanges();
    expect(changeEvent).toHaveReceivedEventDetail(false);
  });
});
