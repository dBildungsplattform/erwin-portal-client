import { describe, expect, test, beforeEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import InfoPlaceholderView from '@/views/InfoPlaceholderView.vue';
import { createMemoryHistory, createRouter, type Router } from 'vue-router';
import routes from '@/router/routes';

describe('InfoPlaceholderView', () => {
  let router: Router;

  beforeEach(() => {
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
  });

  test('help renders placeholder view with correct title', async () => {
    router.push('/hilfe');
    await router.isReady();

    const wrapper: VueWrapper = mount(InfoPlaceholderView, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Hilfe - ErWIn Portal');
  });

  test('instructions renders placeholder view with correct title', async () => {
    router.push('/anleitungen');
    await router.isReady();

    const wrapper: VueWrapper = mount(InfoPlaceholderView, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Anleitungen - ErWIn Portal');
  });
});
