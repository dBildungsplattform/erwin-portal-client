import { describe, expect, test, beforeEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import HelpView from '@/views/HelpView.vue';
import { createMemoryHistory, createRouter, type Router } from 'vue-router';
import routes from '@/router/routes';

describe('HelpView', () => {
  let router: Router;

  beforeEach(() => {
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
  });

  test('help view renders view with correct title', async () => {
    router.push('/hilfe');
    await router.isReady();

    const wrapper: VueWrapper = mount(HelpView, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Hilfe');
  });
});
