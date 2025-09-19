import { mount } from '@vue/test-utils';
import { VApp } from 'vuetify/components';
import { describe, test, expect, beforeEach } from 'vitest';
import AdminLayout from './AdminLayout.vue';
import 'vuetify/styles';
import vuetify from '@/plugins/vuetify';

let wrapper: ReturnType<typeof mount>;

beforeEach(() => {
  document.body.innerHTML = `
    <div>
      <div id="app"></div>
    </div>
  `;

  wrapper = mount(
    {
      components: { VApp, AdminLayout },
      template: `
      <v-app>
        <admin-layout>
          Main Content
        </admin-layout>
      </v-app>
    `,
    },
    {
      attachTo: document.getElementById('app') || undefined,
      global: {
        plugins: [vuetify],
        provide: {
          cspNonce: '',
        },
      },
    },
  );
});

describe('AdminLayout', () => {
  test('renders slot content inside the admin layout', () => {
    expect(wrapper.html()).toContain('Main Content');
  });
});
