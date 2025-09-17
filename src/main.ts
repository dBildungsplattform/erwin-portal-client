import { createApp, ref, type Ref, type App as VueApp } from 'vue';
import App from './App.vue';
import i18n from './plugins/i18n';
import router from './router';
import vuetify from './plugins/vuetify';
import pinia from './plugins/pinia';
import { useConfigStore, type ConfigStore } from './stores/ConfigStore';
import { StepUpLevel } from './stores/AuthStore';
import { useOrganisationStore, type Organisation, type OrganisationStore } from './stores/OrganisationStore';
import type { RouteRecordRaw } from 'vue-router';

// prettier-ignore
const app: VueApp<Element> = createApp(App)
  .use(i18n)
  .use(pinia)
  .use(vuetify)

// Fetch feature flags on app startup
const configStore: ConfigStore = useConfigStore();
configStore.getFeatureFlags();

// fetch dynamic routes on app startup
export const retrievedLmsOrganisations: Ref<Organisation[]> = ref([]);
const organisationStore: OrganisationStore = useOrganisationStore();

(async function createLmsPaths(): Promise<void> {
  // Create paths for each LMS organisation
  retrievedLmsOrganisations.value = await organisationStore.getLmsOrganisations();
  retrievedLmsOrganisations.value.forEach((org: Organisation) => {
    const newRoute: RouteRecordRaw = {
      path: `/admin/rolle/mapping/${org.name.toLowerCase()}`,
      name: `rolle-mapping-${org.name.toLowerCase()}`,
      component: () => import('@/views/admin/RolleMappingView.vue'),
      meta: {
        layout: 'AdminLayout',
        requiresAuth: true,
        requiredStepUpLevel: StepUpLevel.GOLD,
        requiresPermission: 'rollenverwaltung',
      },
    };

    if (!router.hasRoute(newRoute.name as string)) router.addRoute(newRoute);
  });

  app.use(router);
  app.mount('#app');
})();
