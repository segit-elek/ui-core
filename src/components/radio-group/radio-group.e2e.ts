import { newE2EPage } from '@stencil/core/testing';

describe('render', () => {
  it('should render an eui-radio-group', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-radio-group></eui-radio-group>`);
    const el = await page.find('eui-radio-group');
    expect(el).not.toBeNull();
  });
  it('should render options when values is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-radio-group></eui-radio-group>`);
    const el = await page.find('eui-radio-group');
    el.setProperty('values', [{ value: 'a', label: 'A' }]);
    await page.waitForChanges();
    const container = await page.find('eui-radio-group .container');
    expect(container).not.toBeNull();
  });
});

describe('check', () => {
  it('should set value attr when label is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<eui-radio-group></eui-radio-group>`);
    const el = await page.find('eui-radio-group');
    el.setProperty('values', [{ value: 'a', label: 'A' }]);
    await page.waitForChanges();
    const container = await page.find('eui-radio-group .container');
    await container.click();
    expect(await el.getAttribute('value')).toBe('a');
  });

  it('should fire onChange event on value change', async () => {
    const page = await newE2EPage();
    await page.setContent('<eui-radio-group></eui-radio-group>');
    const changeEvent = await page.spyOnEvent('euiRadioGroupChange');
    const el = await page.find('eui-radio-group');
    el.setProperty('values', [{ value: 'a', label: 'A' }]);
    await page.waitForChanges();
    const label = await el.find('label');
    await label.click();
    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventDetail({value: 'a'});
  });
});
