import { expect, test, vi, beforeEach, describe } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import RolleMappingView from './RolleMappingView.vue';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import routes from '@/router/routes';

vi.mock('@/stores/RollenartStore', () => ({
  useRollenartStore: vi.fn(() => ({
    getAllRollenart: vi.fn().mockResolvedValue(['Student', 'Teacher', 'Admin']),
  })),
}));

vi.mock('@/main', () => ({
  retrievedLmsOrganisations: {
    value: [{ name: 'SVS' }, { name: 'Moodle' }],
  },
}));

let wrapper: VueWrapper | null = null;
let router: Router;

describe('RolleMappingView', () => {
  beforeEach(async () => {
    document.body.innerHTML = `<div><div id="app"></div></div>`;

    router = createRouter({
      history: createWebHistory(),
      routes,
    });

    router.push('/');
    await router.isReady();

    wrapper = mount(RolleMappingView, {
      attachTo: document.getElementById('app') || '',
      global: {
        plugins: [router],
      },
    });
  });

  test('renders headline and table', () => {
    expect(wrapper?.find('[data-testid="admin-headline"]').text()).toBe('Administrationsbereich');
    expect(wrapper?.find('[data-testid="rolle-table"]').exists()).toBe(true);
    expect(wrapper?.findAll('tbody tr').length).toBe(5);
  });

  test('updates LMS column header based on route query', async () => {
    await router.push({ path: '/admin/rolle/mapping', query: { instance: 'Moodle' } });
    await router.isReady();
    expect(wrapper?.find('th:nth-child(2) strong').text()).toBe('Moodle');
  });
});
