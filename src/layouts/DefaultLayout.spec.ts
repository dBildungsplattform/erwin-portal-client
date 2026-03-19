import { beforeEach, describe, expect, test } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import DefaultLayout from './DefaultLayout.vue';

let wrapper: VueWrapper | null = null;

beforeEach(() => {
  document.body.innerHTML = `
    <div>
      <div id="app"></div>
    </div>
  `;

  wrapper = mount(DefaultLayout, {
    attachTo: document.getElementById('app') || '',
    global: {
      stubs: {
        TheFooter: {
          template: '<footer data-test="default-footer">Footer</footer>',
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

// TODO: we have to use v-layout as wrapper in DefaultLayout.vue, which breaks the layout
//       we have to fix the broken layout before we can increase the coverage threshold for layouts
describe('DefaultLayout', () => {
  test('it renders the slot content inside the default layout', () => {
    expect(wrapper?.html()).toContain('Main Content');
  });

  test('it renders container and footer', () => {
    expect(wrapper?.find('.v-container').exists()).toBe(true);
    expect(wrapper?.find('[data-test="default-footer"]').exists()).toBe(true);
  });
});
