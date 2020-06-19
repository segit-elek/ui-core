import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

const selector = 'eui-textarea';

describe('events', () => {
  let page: E2EPage;
  let el: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<${selector}></${selector}>`);
    el = await page.find(selector);
    await page.waitForChanges();
  });

  it('should fire euiFocus on textarea focus', async () => {
    const textarea = await el.find('textarea');

    const spy = await el.spyOnEvent('euiFocus');
    // await page.$eval("eel-textarea textarea", (elm: any) => {
    //   console.log('\n\n\n\n\n############# elm', elm.blur);
    //   elm.blur();
    // });
    await textarea.focus();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });

  it('should fire euiChange on textarea change', async () => {
    const textarea = await el.find('textarea');

    const spy = await el.spyOnEvent('euiChange');
    // await page.$eval("eel-textarea textarea", (elm: any) => {
    //   console.log('\n\n\n\n\n############# elm', elm.blur);
    //   elm.blur();
    // });
    await textarea.focus();
    await textarea.type('test');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });

  it('should fire euiInput on textarea input', async () => {
    const textarea = await el.find('textarea');

    const spy = await el.spyOnEvent('euiInput');
    // await page.$eval("eel-textarea textarea", (elm: any) => {
    //   console.log('\n\n\n\n\n############# elm', elm.blur);
    //   elm.blur();
    // });
    await textarea.focus();
    await textarea.type('test');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });

  it('should fire euiBlur on textarea blur', async () => {
    const textarea = await el.find('textarea');

    const spy = await el.spyOnEvent('euiBlur');
    await textarea.focus();
    await page.$eval('eui-textarea textarea', (elm: HTMLTextAreaElement) => {
      // console.log('\n\n\n\n\n############# elm', elm.blur);
      elm.blur();
    });
    // await textarea.triggerEvent('blur');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });
});

describe('classes', () => {
  let page: E2EPage;
  let el: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<${selector}></${selector}>`);
    el = await page.find(`${selector}`);
    await page.waitForChanges();
  });

  it('should set classes based on properties', async () => {
    await el.setProperty('error', true);
    await el.setProperty('readonly', true);
    await el.setProperty('disabled', true);
    await el.setProperty('value', 'test');
    await page.waitForChanges();
    expect(el).toHaveClass('has-value');
    expect(el).toHaveClass('has-error');
    expect(el).toHaveClass('is-readonly');
    expect(el).toHaveClass('is-disabled');
  });

  it('should set classes based on properties, but if the textarea focused and it should clear on focus, `has-error` shouldn\'t be added', async () => {
    await el.setProperty('clearErrorOnFocus', true);
    await el.setProperty('error', true);
    await el.setProperty('readonly', true);
    await el.setProperty('value', 'test');
    await page.waitForChanges();
    await (await el.find('textarea')).focus();
    await page.waitForChanges();
    expect(el).toHaveClass('has-value');
    expect(el).not.toHaveClass('has-error');
    expect(el).toHaveClass('has-focus');
    expect(el).toHaveClass('is-readonly');
  });

  it('passes properties to textarea', async () => {
    const textarea = await el.find('textarea');
    await el.setProperty('disabled', true);
    await el.setProperty('name', 'test');
    await el.setProperty('placeholder', 'test');
    await el.setProperty('readonly', true);
    await el.setProperty('required', true);
    await page.waitForChanges();
    expect(await textarea.getProperty('disabled')).toBe(true);
    expect(await textarea.getProperty('name')).toBe('test');
    expect(await textarea.getProperty('placeholder')).toBe('test');
    expect(await textarea.getAttribute('readonly')).not.toBeNull();
    expect(await textarea.getProperty('required')).toBe(true);
  });
});
