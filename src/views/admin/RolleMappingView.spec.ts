import { expect, test } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import RolleMappingView from './RolleMappingView.vue';

let wrapper: VueWrapper | null = null;

beforeEach(() => {
  document.body.innerHTML = `
    <div>
      <div id="app"></div>
    </div>
  `;
});

describe('RolleMappingView', () => {
  test('it renders the headline and table', () => {
    wrapper = mount(RolleMappingView, {
      attachTo: document.body,
      global: {
        components: { RolleMappingView },
        mocks: {
          route: {
            fullPath: 'full/path',
          },
        },
      },
    });
    expect(wrapper.find('[data-testid="admin-headline"]').text()).toBe('admin.headline');
    expect(wrapper.find('[data-testid="rolle-table"]').exists()).toBe(true);
    expect(wrapper.findAll('tbody tr').length).toBe(5);
  });

  test('it shows correct LMS column header for Schulcloud', () => {
    wrapper = mount(RolleMappingView, {
      attachTo: document.body,
      global: {
        components: { RolleMappingView },
        mocks: {
          route: {
            query: { instance: 'Schulcloud' },
            fullPath: 'full/path',
          },
        },
      },
    });

    expect(wrapper.find('th:nth-child(2) strong').text()).toBe('Schulcloud');
  });

  test('it shows correct LMS column header for Moodle', () => {
    wrapper = mount(RolleMappingView, {
      attachTo: document.body,
      global: {
        components: { RolleMappingView },
        mocks: {
          route: {
            query: { instance: 'Moodle' },
            fullPath: 'full/path',
          },
        },
      },
    });

    expect(wrapper.find('th:nth-child(2) strong').text()).toBe('Moodle');
  });

  test('it shows correct select options for Schulcloud', async () => {
    const selects: VueWrapper[] = wrapper?.findAllComponents({ name: 'VSelect' }) ?? [];

    expect(selects.length).toBe(6);

    const schulcloudOptions: string[] = ['user', 'Student', 'Teacher', 'Administrator', 'Superhero', 'Expert'];

    schulcloudOptions.forEach((option: string) => {
      expect(wrapper?.html()).toContain(option);
    });
  });

  test('it shows correct select options for Moodle', async () => {
    const selects: VueWrapper[] = wrapper?.findAllComponents({ name: 'VSelect' }) ?? [];

    expect(selects.length).toBe(5);

    const moodleOptions: string[] = ['Authenticated User', 'Student', 'Teacher', 'Manager', 'Site Administrator'];

    moodleOptions.forEach((option: string) => {
      expect(wrapper?.html()).toContain(option);
    });
  });
});
