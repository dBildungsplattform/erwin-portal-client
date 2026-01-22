<script setup lang="ts">
  import LayoutCard from '@/components/cards/LayoutCard.vue';
  import { erWInPortalRoles } from '@/enums/user-roles';
  import { useOrganisationStore, type Organisation, type OrganisationStore } from '@/stores/OrganisationStore';
  import { useRollenartStore, type RollenartListLms, type RollenartStore } from '@/stores/RollenartStore';
  import { useRollenMappingStore, type RollenMappingStore } from '@/stores/RollenMappingStore';
  import { useRolleStore, type RolleStore } from '@/stores/RolleStore';
  import {
    useServiceProviderStore,
    type ServiceProvider,
    type ServiceProviderStore,
  } from '@/stores/ServiceProviderStore';
  import { computed, onMounted, ref, watch, type Ref } from 'vue';
  import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';

  const route: RouteLocationNormalizedLoaded = useRoute();
  const rollenartStore: RollenartStore = useRollenartStore();
  const retrievedLmsOrganisations: Ref<Organisation[]> = ref([]);
  const organisationStore: OrganisationStore = useOrganisationStore();
  const serviceProviderStore: ServiceProviderStore = useServiceProviderStore();
  const rolleStore: RolleStore = useRolleStore();
  const rollenMappingStore: RollenMappingStore = useRollenMappingStore();
  const dynamicErWInPortalRoles: Ref<string[]> = ref([]);
  const neededServiceProviders: Ref<ServiceProvider[]> = ref([]);

  const retrievedRoles: Ref<string[]> = ref([]);
  const selectedInstance: Ref<string> = ref('');
  const selectedRoles: Ref<(string | null)[]> = ref(Array(erWInPortalRoles.length).fill(null));
  const roles: Ref<RollenartListLms[]> = ref([]);

  const currentRoleOptions: Ref<string[]> = computed((): string[] => {
    const foundRoles: RollenartListLms | undefined = roles.value.find(
      (role: RollenartListLms) => role.lmsName.toLowerCase() === selectedInstance.value.toLowerCase(),
    );
    return foundRoles ? Array.from(new Set(foundRoles.rollenartList)) : [];
  });

  onMounted(async (): Promise<void> => {
    await rollenartStore.getAllRollenart();
    retrievedRoles.value = rollenartStore.rollenartList;

    await organisationStore.getLmsOrganisations();
    retrievedLmsOrganisations.value = organisationStore.retrievedLmsOrganisations;

    roles.value = retrievedLmsOrganisations.value.map(
      (org: Organisation): RollenartListLms => ({
        lmsName: org.name,
        rollenartList: retrievedRoles.value,
      }),
    );

    const instanceLabel: string = String(route.query['instance'] || '');
    const matchedOrg: Organisation | undefined = retrievedLmsOrganisations.value.find(
      (org: Organisation) => org.name.toLowerCase() === instanceLabel.toLowerCase(),
    );

    selectedInstance.value = matchedOrg?.name || instanceLabel;
    selectedRoles.value = Array(retrievedRoles.value.length).fill(null);
  });

  async function saveChosenRolesForMapping(): Promise<void> {
    const serviceProvider: ServiceProvider | undefined = neededServiceProviders.value[0];
    if (!serviceProvider) {
      return;
    }

    selectedRoles.value.forEach(async (chosenRole: string | null, index: number) => {
      const erwInPortalRole: string | undefined = dynamicErWInPortalRoles.value[index];
      if (chosenRole && erwInPortalRole) {
        // TODO
        await rollenMappingStore.createRollenMapping({
          rolleId: erwInPortalRole,
          serviceProviderId: serviceProvider.id,
          mapToLmsRolle: chosenRole,
        });
      }
    });
  }

  watch(
    () => route.query['instance'] as string | string[] | null | undefined,
    async (newInstance: string | string[] | null | undefined): Promise<void> => {
      const instanceLabel: string = String(newInstance || '');

      await serviceProviderStore.getAllServiceProviders();
      neededServiceProviders.value = serviceProviderStore.allServiceProviders.filter(
        (serviceProvider: ServiceProvider) => serviceProvider.name.toLowerCase() === instanceLabel.toLowerCase(),
      );

      const chosenServiceProvider: ServiceProvider = neededServiceProviders.value.find(
        (sp: ServiceProvider) => sp.name.toLowerCase() === instanceLabel.toLowerCase(),
      ) as ServiceProvider;
      await rolleStore.getRollenByServiceProviderId(chosenServiceProvider.id);
      dynamicErWInPortalRoles.value = rolleStore.rollenRetrievedByServiceProvider.map(
        (role: { id: string; name: string }) => role.name,
      );
      selectedRoles.value = Array(retrievedRoles.value.length).fill(null);
    },
    { immediate: true },
  );
</script>

<template>
  <div class="admin">
    <h1
      class="text-center headline"
      data-testid="admin-headline"
    >
      {{ $t('admin.headline') }}
    </h1>

    <LayoutCard :header="$t('admin.rolle.mapping')">
      <v-row
        align="start"
        class="ma-3"
        justify="end"
      >
      </v-row>

      <v-table
        data-testid="rolle-table"
        class="text-body-1"
      >
        <thead>
          <tr>
            <th><strong>ErWIn-Portal</strong></th>
            <th>
              <strong>{{ selectedInstance || '...' }}</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(role, index) in dynamicErWInPortalRoles"
            :key="index"
          >
            <td>{{ role }}</td>
            <td class="align-start">
              <v-select
                v-model="selectedRoles[index]"
                :items="currentRoleOptions"
                :label="$t('admin.Role')"
                variant="outlined"
                clearable
                chips
                density="compact"
                class="fixed-select"
                id="role-select"
                :no-data-text="$t('noDataFound')"
                :placeholder="$t('admin.Role')"
                :multiple="false"
                style="width: 300px"
              />
            </td>
          </tr>
        </tbody>
      </v-table>
      <!-- Save button can be removed if not needed, can be decided later-->
      <v-row
        justify="end"
        class="mt-4 me-4 pb-4"
      >
        <v-btn
          color="primary"
          variant="elevated"
          size="large"
          @click="saveChosenRolesForMapping()"
        >
          {{ $t('admin.save') }}
        </v-btn>
      </v-row>
    </LayoutCard>
  </div>
</template>

<style scoped>
  .align-start {
    text-align: start;
  }
  .fixed-select {
    text-align: left;
  }
  .fixed-select .v-field__input {
    text-align: left !important;
    padding-left: 12px !important;
  }
  .fixed-select .v-select__selection-text {
    text-align: left !important;
  }
</style>
