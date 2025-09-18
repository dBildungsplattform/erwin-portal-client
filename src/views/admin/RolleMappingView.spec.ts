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

  test('renders correct number of rows based on erWInPortalRoles', () => {
    const rows = wrapper?.findAll('tbody tr');
    expect(rows?.length).toBe(5); // erWInPortalRoles has 5 roles
    const expectedRoles = ['USER', 'LERN', 'LEHR', 'LEIT', 'SYSADMIN'];
    rows?.forEach((row, index) => {
      expect(row.find('td:first-child').text()).toBe(expectedRoles[index]);
    });
  });

  test('renders empty select options when no roles are available', async () => {
    await router.push({ path: '/admin/rolle/mapping', query: { instance: 'UnknownInstance' } });
    await router.isReady();
    const selects = wrapper?.findAll('tbody tr td:nth-child(2) v-select');
    selects?.forEach((select) => {
      expect(select.attributes('items')).toBe('[]');
    });
  });

  test('displays placeholder when no instance is selected', async () => {
    await router.push({ path: '/admin/rolle/mapping', query: {} });
    await router.isReady();
    expect(wrapper?.find('th:nth-child(2) strong').text()).toBe('...');
  });
});
