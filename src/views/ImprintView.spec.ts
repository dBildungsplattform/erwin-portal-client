import { describe, expect, test, beforeEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createMemoryHistory, createRouter, type Router } from 'vue-router';
import routes from '@/router/routes';
import ImprintView from './ImprintView.vue';

describe('ImprintView', () => {
  let router: Router;

  beforeEach(() => {
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
  });

  test('impressum renders view with correct title', async () => {
    router.push('/impressum');
    await router.isReady();

    const wrapper: VueWrapper = mount(ImprintView, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Impressum');
  });
});
