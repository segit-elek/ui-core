import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

const selector = 'eui-input';

describe('render', () => {
  it(`should render a ${selector}`, async () => {
    const page: E2EPage = await newE2EPage();
    await page.setContent(`<${selector}></${selector}>`);
    const el: E2EElement = await page.find(`${selector}`);
    expect(el).not.toBeNull();
  });
});

describe('events', () => {
  let page: E2EPage;
  let el: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<${selector}></${selector}>`);
    el = await page.find(`${selector}`);
    await page.waitForChanges();
  });

  it('should fire euiFocus on input focus', async () => {
    const input = await el.find('input');

    const spy = await el.spyOnEvent('euiFocus');
    // await page.$eval("eel-input input", (elm: any) => {
    //   console.log('\n\n\n\n\n############# elm', elm.blur);
    //   elm.blur();
    // });
    await input.focus();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });

  it('should fire euiChange on input change', async () => {
    const input = await el.find('input');

    const spy = await el.spyOnEvent('euiChange');
    // await page.$eval("eel-input input", (elm: any) => {
    //   console.log('\n\n\n\n\n############# elm', elm.blur);
    //   elm.blur();
    // });
    await input.focus();
    await input.type('test');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });

  it('should fire euiInput on input input', async () => {
    const input = await el.find('input');

    const spy = await el.spyOnEvent('euiInput');
    // await page.$eval("eel-input input", (elm: any) => {
    //   console.log('\n\n\n\n\n############# elm', elm.blur);
    //   elm.blur();
    // });
    await input.focus();
    await input.type('test');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });

  it('should fire euiBlur on input blur', async () => {
    const input = await el.find('input');

    const spy = await el.spyOnEvent('euiBlur');
    await input.focus();
    await page.$eval('eui-input input', (elm: HTMLEuiInputElement) => {
      // console.log('\n\n\n\n\n############# elm', elm.blur);
      elm.blur();
    });
    // await input.triggerEvent('blur');
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
    await el.setProperty('disabled', true);
    await el.setProperty('readonly', true);
    await page.waitForChanges();
    expect(el).toHaveClass('is-disabled');
    expect(el).toHaveClass('is-readonly');
  });

  it('should set classes based on properties', async () => {
    await el.setProperty('clearErrorOnFocus', false);
    await el.setProperty('error', true);
    await el.setProperty('value', 'test');
    await page.waitForChanges();
    await (await el.find('input')).focus();
    await page.waitForChanges();
    expect(el).toHaveClass('has-value');
    expect(el).toHaveClass('has-focus');
    expect(el).toHaveClass('has-error');
  });

  it('should clear error on focus', async () => {
    await el.setProperty('clearErrorOnFocus', true);
    await el.setProperty('error', true);
    await el.setProperty('value', 'test');
    await page.waitForChanges();
    await (await el.find('input')).focus();
    await page.waitForChanges();
    expect(el).toHaveClass('has-value');
    expect(el).toHaveClass('has-focus');
    expect(el).not.toHaveClass('has-error');
  });

  it('passes properties to input', async () => {
    const input = await el.find('input');
    await el.setProperty('disabled', true);
    await el.setProperty('accept', 'test');
    // await el.setProperty('autocomplete', 'on');
    // await el.setProperty('autocorrect', 'on');
    // await el.setProperty('autofocus', true);
    await el.setProperty('inputmode', 'decimal');
    await el.setProperty('min', '3');
    await el.setProperty('max', '6');
    await el.setProperty('minlength', 1);
    await el.setProperty('maxlength', 10);
    await el.setProperty('multiple', false);
    await el.setProperty('name', 'test');
    await el.setProperty('pattern', 'string');
    await el.setProperty('placeholder', 'test');
    await el.setProperty('readonly', false);
    await el.setProperty('required', true);
    // await el.setProperty('spellcheck', false);
    await el.setProperty('step', '1');
    await el.setProperty('type', 'text');
    await page.waitForChanges();
    expect(await input.getProperty('disabled')).toBe(true);
    expect(await input.getProperty('accept')).toBe('test');
    // expect(await input.getProperty('autoComplete')).toBe( 'on');
    // expect(await input.getProperty('autoCorrect')).toBe( 'on');
    // expect(await input.getProperty('autoFocus')).toBe( true);
    expect(await input.getProperty('inputMode')).toBe('decimal');
    expect(await input.getProperty('min')).toBe('3');
    expect(await input.getProperty('max')).toBe('6');
    expect(await input.getProperty('minLength')).toBe(1);
    expect(await input.getProperty('maxLength')).toBe(10);
    expect(await input.getProperty('multiple')).toBe(false);
    expect(await input.getProperty('name')).toBe('test');
    expect(await input.getProperty('pattern')).toBe('string');
    expect(await input.getProperty('placeholder')).toBe('test');
    expect(await input.getProperty('readOnly')).toBe(false);
    expect(await input.getProperty('required')).toBe(true);
    // expect(await input.getProperty('spellCheck')).toBe( false);
    expect(await input.getProperty('step')).toBe('1');
    expect(await input.getProperty('type')).toBe('text');
  });
});

describe('size', () => {
  let page: E2EPage;
  let el: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<${selector}></${selector}>`);
    el = await page.find(`${selector}`);
    await page.waitForChanges();
  });

  it('should set css variables based on size', async () => {
    await el.setProperty('size', 'large');
    await page.waitForChanges();
    let variables = await page.$eval('eui-input', async (euiInput: HTMLEuiInputElement) => {
      const innerStyles = await getComputedStyle(euiInput);
      return {
        paddingLeft: innerStyles.getPropertyValue('--padding-left'),
        paddingRight: innerStyles.getPropertyValue('--padding-right'),
        paddingTop: innerStyles.getPropertyValue('--padding-top'),
        paddingBottom: innerStyles.getPropertyValue('--padding-bottom'),
      };
    });

    const styles = await el.getComputedStyle();
    expect(variables.paddingLeft.trim()).toBe('5px');
    expect(variables.paddingRight.trim()).toBe('5px');
    expect(variables.paddingTop.trim()).toBe('4px');
    expect(variables.paddingBottom.trim()).toBe('4px');
    expect(styles.paddingLeft.trim()).toBe('5px');
    expect(styles.paddingRight.trim()).toBe('5px');
    expect(styles.paddingTop.trim()).toBe('4px');
    expect(styles.paddingBottom.trim()).toBe('4px');
  });
});
