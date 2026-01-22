<!-- eslint-disable no-console -->
<script setup lang="ts">
  import LayoutCard from '@/components/cards/LayoutCard.vue';
  import { erWInPortalRoles } from '@/enums/user-roles';
  import { useOrganisationStore, type Organisation, type OrganisationStore } from '@/stores/OrganisationStore';
  import { useRollenartStore, type RollenartListLms, type RollenartStore } from '@/stores/RollenartStore';
  import { useRolleStore, type Rolle, type RolleStore } from '@/stores/RolleStore';
  import { useRollenMappingStore, type RollenMappingStore } from '@/stores/RollenMappingStore';
  import { computed, onMounted, ref, watch, type Ref } from 'vue';
  import { useRoute, type LocationQueryValue, type RouteLocationNormalizedLoaded } from 'vue-router';
  import { useSearchFilterStore, type SearchFilterStore } from '@/stores/SearchFilterStore';
  import type { RolleNameIdResponse } from '@/api-client/generated';

  const route: RouteLocationNormalizedLoaded = useRoute();
  const rollenMappingStore: RollenMappingStore = useRollenMappingStore();
  const dynamicErWInPortalRoles: Ref<string[]> = ref(erWInPortalRoles);

  const rollenartStore: RollenartStore = useRollenartStore();
  const rolleStore: RolleStore = useRolleStore();
  const retrievedLmsOrganisations: Ref<Organisation[]> = ref([]);
  const organisationStore: OrganisationStore = useOrganisationStore();
  const searchFilterStore: SearchFilterStore = useSearchFilterStore();

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
    selectedRoles.value = Array(erWInPortalRoles.length).fill(null);
  });

  watch(
    () => route.query['instance'],
    async (newInstance: LocationQueryValue | LocationQueryValue[] | undefined) => {
      const instanceLabel: string = String(newInstance || '');
      const matchedOrg: Organisation | undefined = retrievedLmsOrganisations.value.find(
        (org: Organisation) => org.name.toLowerCase() === instanceLabel.toLowerCase(),
      );

      if (matchedOrg) {
        await rolleStore.getRollenByServiceProviderId(matchedOrg.id);
        rolleStore.rollenRetrievedByServiceProvider.forEach((rolleIdName: RolleNameIdResponse): void => {
          dynamicErWInPortalRoles.value.push(rolleIdName.name);
        });
        console.log('Rollen from LMS Instance:', rolleStore.rollenRetrievedByServiceProvider);
        console.log('Dynamic ErWInPortal Roles:', dynamicErWInPortalRoles.value);
        selectedInstance.value = matchedOrg.name;
      } else {
        selectedInstance.value = instanceLabel;
      }
    },
    { immediate: true },
  );

  // use rollenmappingController to save assigned roles to lms instance
  function saveRolleMapping(): void {
    // eslint-disable-next-line no-console
    // console.log('Saving Rolle Mapping...', selectedRoles);
    selectedRoles.value.forEach((role: string | null, index: number) => {
      if (role === null) {
        console.warn(
          `Role for ErWIn-Portal role "${erWInPortalRoles[index]}" is not selected. Please select a role before saving.`,
        );
        return;
      }
      // Handle async call without making the function itself async
      (async (): Promise<void> => {
        await rolleStore.getAllRollen({
          offset: (searchFilterStore.rollenPage - 1) * searchFilterStore.rollenPerPage,
          limit: searchFilterStore.rollenPerPage,
          searchString: '',
        });
        const allRoles: Rolle[] = rolleStore.allRollen;
        console.log(allRoles);
        const providerId: string = ((): string => {
          const matchedOrg: Organisation | undefined = retrievedLmsOrganisations.value.find(
            (org: Organisation) => org.name === selectedInstance.value,
          );
          return matchedOrg?.id ?? '';
        })();
        const existRole: Rolle = allRoles.find(
          (rol: Rolle) =>
            rol.serviceProviders?.values.name === selectedInstance.value &&
            rol.rollenart.includes(erWInPortalRoles[index]!),
        ) as Rolle;
        // console.log(existRole);
        await rollenMappingStore.createRollenMapping({
          rolleId: existRole.id,
          serviceProviderId: providerId,
          mapToLmsRolle: role,
        });
      })();
    });
  }
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
          data-testid="save-rolle-mapping-btn"
          @click="saveRolleMapping"
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
