import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

const euiSelect = 'eui-select';
const dropdownSelector = 'eui-select-dropdown';

describe('render', () => {
  it('should render an eui-select', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <${euiSelect}></${euiSelect}>
    `);
    const parent = await page.find(euiSelect);
    await page.waitForChanges();
    expect(parent).not.toBeNull();
  });
  it('should render an eui-input inside the combobox', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <${euiSelect}></${euiSelect}>
    `);
    const el = await page.find(euiSelect);
    await page.waitForChanges();
    const input = await el.find('eui-input');
    expect(input).not.toBeNull();
  });
  it('should render an eui-select-dropdown when open is triggered', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <${euiSelect}></${euiSelect}>
    `);
    const parent = await page.find(euiSelect);
    await parent.callMethod('open');
    await page.waitForChanges();
    const el = await page.find(dropdownSelector);
    expect(el).not.toBeNull();
  });
  });

describe('dropdown options', () => {
  it('should have child opts', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <${euiSelect}>
          <eui-select-option>
            Menet Elek
          </eui-select-option>
          <eui-select-option>
            Menet Elek 2
          </eui-select-option>
          <eui-select-option>
            Menet Elek 3
          </eui-select-option>
          <eui-select-option>
            Menet Elek 4
          </eui-select-option>
          <eui-select-option>
            Menet Elek 5
          </eui-select-option>
        </${euiSelect}>
    `);
    const parent = await page.find(euiSelect);
    await parent.callMethod('open');
    await page.waitForChanges();
    let dropdownEl = await page.find(dropdownSelector);
    let options = await page.$eval(dropdownSelector, (dropdown: HTMLEuiSelectDropdownElement) => {
      return dropdown.options;
    });
    expect(options.filter((opt) => !opt.type || opt.type === 'option').length).toBe(5);

    parent.setProperty('options', [
      {
        textContent: 'Success',
        value: 'success',
        group: 'Test',
        params: {
          foo: 'bar',
        },
      },
    ]);
    await dropdownEl.callMethod('dismiss');
    await page.waitForChanges();
    await parent.callMethod('open');
    options = await page.$eval(dropdownSelector, (dropdown: HTMLEuiSelectDropdownElement) => {
      return dropdown.options;
    });
    expect(options.filter((opt) => !opt.type || opt.type === 'option').length).toBe(6);
    expect(options.filter((opt) => opt.type === 'group-title').length).toBe(2);
    expect(options.filter((opt) => opt.type === 'group-title')[0].label).toBe('Test');
    expect(options.filter((opt) => opt.type === 'group-title')[1].label).toBe('Ungrouped');
  });

  it('should set value on option click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <${euiSelect}>
          <eui-select-option>
            Test Elek
          </eui-select-option>
          <eui-select-option>
            Berez Elek 2
          </eui-select-option>
          <eui-select-option>
            Beviz Elek 3
          </eui-select-option>
          <eui-select-option>
            Menet Elek 4
          </eui-select-option>
          <eui-select-option>
            Feles Elek 5
          </eui-select-option>
        </${euiSelect}>
    `);
    const parent = await page.find(euiSelect);
    const onChangeSpy = await parent.spyOnEvent('euiChange');
    await parent.callMethod('open');
    await page.waitForChanges();
    let dropdownEl = await page.find(dropdownSelector);
    await page.waitForChanges();
    const options = await dropdownEl.findAll('eui-select-dropdown-option');
    await page.waitForChanges();
    options[4].click();
    await page.waitForChanges();
    expect((await parent.getProperty('value')).value).toBe('Menet Elek 4');
    expect(onChangeSpy).toHaveReceivedEvent();
  });

  it('should add dropdown absolute-dropdown class if interfaceOptions.position is absolute', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <${euiSelect}>
          <eui-select-option>
            Test Elek
          </eui-select-option>
          <eui-select-option>
            Berez Elek 2
          </eui-select-option>
          <eui-select-option>
            Beviz Elek 3
          </eui-select-option>
          <eui-select-option>
            Menet Elek 4
          </eui-select-option>
          <eui-select-option>
            Feles Elek 5
          </eui-select-option>
        </${euiSelect}>
    `);
    const parent = await page.find(euiSelect);
    await parent.setProperty('interfaceOptions', { position: 'absolute' });
    await page.waitForChanges();
    await parent.callMethod('open');
    await page.waitForChanges();
    let dropdownEl = await page.find(dropdownSelector);
    await page.waitForChanges();
    expect(dropdownEl).toHaveClass('absolute-dropdown');
  });
});

describe('property classes', () => {
  let page: E2EPage;
  let parent: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
        <${euiSelect}>
          <eui-select-option>
            Test Elek
          </eui-select-option>
          <eui-select-option>
            Berez Elek 2
          </eui-select-option>
          <eui-select-option>
            Beviz Elek 3
          </eui-select-option>
          <eui-select-option>
            Menet Elek 4
          </eui-select-option>
          <eui-select-option>
            Feles Elek 5
          </eui-select-option>
        </${euiSelect}>
    `);
    parent = await page.find(euiSelect);
    await page.waitForChanges();
  });
  it('should set classes based on interfaceOptions', async () => {
    await parent.setProperty('interfaceOptions', { position: 'absolute' });
    await page.waitForChanges();

    expect(parent).toHaveClass('absolute-dropdown');
  });
  it('should set classes based on disabled', async () => {
    await parent.setProperty('disabled', true);
    await page.waitForChanges();
    expect(parent).toHaveClass('is-disabled');
  });

  it('should set classes based on readonly', async () => {
    await parent.setProperty('readonly', true);
    await page.waitForChanges();

    expect(parent).toHaveClass('is-readonly');
  });

  it('should set classes based on error', async () => {
    await parent.setProperty('error', true);
    await page.waitForChanges();

    expect(parent).toHaveClass('has-error');
  });
});
describe('size', () => {
  let page: E2EPage;
  let el: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<${euiSelect}></${euiSelect}>`);
    el = await page.find(`${euiSelect}`);
    await page.waitForChanges();
  });

  it('should set css variables based on size', async () => {
    await el.setProperty('size', 'large');
    await page.waitForChanges();
    let variables = await page.$eval(euiSelect, async (euiInput: HTMLEuiInputElement) => {
      const innerStyles = await getComputedStyle(euiInput);
      return {
        paddingLeft: innerStyles.getPropertyValue('--padding-left'),
        paddingRight: innerStyles.getPropertyValue('--padding-right'),
        paddingTop: innerStyles.getPropertyValue('--padding-top'),
        paddingBottom: innerStyles.getPropertyValue('--padding-bottom'),
        fontSize: innerStyles.getPropertyValue('--font-size'),
        lineHeight: innerStyles.getPropertyValue('--line-height'),
        iconSize: innerStyles.getPropertyValue('--select-icon-size'),
        iconPadding: innerStyles.getPropertyValue('--select-icon-padding'),
      };
    });
    expect(variables.paddingLeft.trim()).toBe('5px');
    expect(variables.paddingRight.trim()).toBe('5px');
    expect(variables.paddingTop.trim()).toBe('4px');
    expect(variables.paddingBottom.trim()).toBe('4px');
    expect(variables.fontSize.trim()).toBe('16px');
    expect(variables.lineHeight.trim()).toBe('26px');
    expect(variables.iconSize.trim()).toBe('24px');
    expect(variables.iconPadding.trim()).toBe('3px');
  });
});

describe('event', () => {
  let page: E2EPage;
  let el: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<eui-chip id="test"></eui-chip><${euiSelect}></${euiSelect}>`);
    el = await page.find(`${euiSelect}`);
    await page.waitForChanges();
  });

  it('should set css variables based on size', async () => {
    const focus = await el.spyOnEvent('euiFocus');
    const blur = await el.spyOnEvent('euiBlur');
    await el.click();
    expect(focus).toHaveReceivedEvent();
    await (await page.find('eui-chip')).click();
    expect(blur).toHaveReceivedEvent();
  });
});
