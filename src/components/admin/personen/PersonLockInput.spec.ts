import { describe, expect, beforeEach, vi } from 'vitest';
import PersonLockInput from './PersonLockInput.vue'; // Replace with actual component name
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils';
import { nextTick } from 'vue';

describe('PersonLockInput', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(PersonLockInput, {
      props: {
        befristungProps: {
          error: false,
          'error-messages': [],
          onBlur: () => vi.fn(),
          onChange: () => vi.fn(),
          onInput: () => vi.fn(),
        },
        befristung: '2024-10-23',
        isUnbefristet: false,
      },
      global: {
        mocks: {
          $t: (key: string) => key, // Mock translation function
        },
      },
    });
  });

  test('it renders the radio buttons', () => {
    expect(wrapper.find('[data-testid="unbefristet-radio-button"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="befristet-radio-button"]').exists()).toBe(true);
  });

  test('it handles option changes', async () => {
    const befristetRadioButton: DOMWrapper<HTMLInputElement> = wrapper.find(
      '[data-testid="befristet-radio-button"] input[type="radio"]',
    );
    expect(befristetRadioButton.isVisible()).toBe(true);
    const unbefristetRadioButton: DOMWrapper<HTMLInputElement> = wrapper.find(
      '[data-testid="unbefristet-radio-button"] input[type="radio"]',
    );
    expect(unbefristetRadioButton.isVisible()).toBe(true);
    const radioGroup: DOMWrapper<HTMLInputElement> = wrapper.find('[data-testid="befristung-radio-group"]');
    expect(radioGroup.isVisible()).toBe(true);

    expect(befristetRadioButton.element.checked).toBe(true);
    expect(unbefristetRadioButton.element.checked).toBe(false);

    await unbefristetRadioButton.setValue(true);
    await nextTick();

    expect(befristetRadioButton.element.checked).toBe(false);
    expect(unbefristetRadioButton.element.checked).toBe(true);

    const emitted: Record<string, unknown[][]> = wrapper.emitted();
    const handleSelectedEvents: unknown[][] | undefined = emitted['handleSelectedRadioButtonChange'];

    expect(handleSelectedEvents).toBeTruthy();
    expect(handleSelectedEvents && handleSelectedEvents[0]).toEqual([true]);

    // When "unbefristet" is selected, the date input should disappear
    expect(wrapper.find('[data-testid="befristung-input"]').exists()).toBe(false);
  });

  test('it handles no befristung and isUnbefristet = true', async () => {
    wrapper = mount(PersonLockInput, {
      props: {
        befristungProps: {
          error: false,
          'error-messages': [],
          onBlur: () => vi.fn(),
          onChange: () => vi.fn(),
          onInput: () => vi.fn(),
        },
        befristung: '',
        isUnbefristet: true,
      },
      global: {
        mocks: {
          $t: (key: string) => key, // Mock translation function
        },
      },
    });

    const befristetRadioButton: DOMWrapper<HTMLInputElement> = wrapper.find(
      '[data-testid="befristet-radio-button"] input[type="radio"]',
    );
    const unbefristetRadioButton: DOMWrapper<HTMLInputElement> = wrapper.find(
      '[data-testid="unbefristet-radio-button"] input[type="radio"]',
    );

    expect(befristetRadioButton.element.checked).toBe(false);
    expect(unbefristetRadioButton.element.checked).toBe(true);

    await befristetRadioButton.setValue(true);
    await nextTick();

    expect(befristetRadioButton.element.checked).toBe(true);
    expect(unbefristetRadioButton.element.checked).toBe(false);

    const emitted: Record<string, unknown[][]> = wrapper.emitted();
    const handleSelectedEvents: unknown[][] | undefined = emitted['handleSelectedRadioButtonChange'];

    expect(handleSelectedEvents).toBeTruthy();
    expect(handleSelectedEvents && handleSelectedEvents[0]).toEqual([false]);

    // When "befristet" is selected, the date input should be visible
    expect(wrapper.find('[data-testid="befristung-input"]').exists()).toBe(true);
  });

  test('it emits update:befristung when date is changed', async () => {
    const inputWrapper: DOMWrapper<HTMLInputElement> = wrapper.find('[data-testid="befristung-input"] input');

    const newDate: string = '2025-01-01';
    await inputWrapper.setValue(newDate);
    await nextTick();

    const emitted: Record<string, unknown[][]> = wrapper.emitted();
    const updateBefristungEvents: unknown[][] | undefined = emitted['update:befristung'];

    expect(updateBefristungEvents).toBeTruthy();
    expect(updateBefristungEvents && updateBefristungEvents[0]).toEqual([newDate]);
  });
});
