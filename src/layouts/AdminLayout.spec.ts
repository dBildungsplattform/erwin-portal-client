import { beforeEach, describe, expect, test } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import AdminLayout from './AdminLayout.vue';

let wrapper: VueWrapper | null = null;

beforeEach(() => {
  document.body.innerHTML = `
    <div>
      <div id="app"></div>
    </div>
  `;

  wrapper = mount(AdminLayout, {
    attachTo: document.getElementById('app') || '',
    global: {
      stubs: {
        AdminMenuBar: {
          template: '<header data-test="admin-menu-bar">Menu</header>',
        },
        TheFooter: {
          template: '<footer data-test="admin-footer">Footer</footer>',
        },
        'v-container': {
          template: '<div class="v-container"><slot /></div>',
        },
      },
    },
    slots: {
      default: 'Main Content',
    },
  });
});

// TODO: we have to use v-layout as wrapper in AdminLayout.vue, which breaks the layout
//       we have to fix the broken layout before we can increase the coverage threshold for layouts
describe('AdminLayout', () => {
  test('it renders the slot content inside the admin layout', () => {
    expect(wrapper?.html()).toContain('Main Content');
  });

  test('it renders menu bar, container and footer', () => {
    expect(wrapper?.find('[data-test="admin-menu-bar"]').exists()).toBe(true);
    expect(wrapper?.find('.v-container').exists()).toBe(true);
    expect(wrapper?.find('[data-test="admin-footer"]').exists()).toBe(true);
  });
});
