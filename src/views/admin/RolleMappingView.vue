<script setup lang="ts">
  import LayoutCard from '@/components/cards/LayoutCard.vue';
  import { computed, ref, type Ref, watch } from 'vue';

  type Item = {
    label: string;
    value: string;
  };

  type Role = {
    lms: string;
    roles: Array<string>;
  };

  const erWInPortalRoles: Array<string> = ['USER', 'LERN', 'LEHR', 'LEIT', 'SYSADMIN', 'EXTERN', 'Portal-Admin'];

  const spshRoles: Array<string> = [
    'Itslearning-Schüler',
    'Lehrkraft in den diversen Ausprägungen',
    'Schul-Admin',
    'Landes-Admin',
    'Schulsekretariat, Gärtner...',
  ];

  const svsRoles: Array<string> = ['user', 'Student', 'Teacher', 'Administrator', 'Superhero', 'Expert'];

  const moodleRoles: Array<string> = ['Authenticated User', 'Student', 'Teacher', 'Manager', 'Site Administrator'];

  const roles: Array<Role> = [
    { lms: 'SVS', roles: svsRoles },
    { lms: 'Moodle', roles: moodleRoles },
    { lms: 'SPSH', roles: spshRoles },
  ];

  const headersWithLabel: Item[] = [
    { label: 'SVS', value: 'SVS' },
    { label: 'Moodle', value: 'Moodle' },
    { label: 'SPSH', value: 'SPSH' },
  ];

  const selectedInstance: Ref<Item> = ref({ label: '', value: '' });

  const selectedRoles = ref<(string | null)[]>(Array(erWInPortalRoles.length).fill(null));

  const currentRoleOptions = computed<string[]>(() => {
    const foundRole = roles.find((role) => role.lms === selectedInstance.value.label);
    return foundRole ? foundRole.roles : [];
  });

  watch(selectedInstance, () => {
    selectedRoles.value = Array(erWInPortalRoles.length).fill(null);
  });

  function onChangeSelectedItem(value: Item | null): void {
    selectedInstance.value = value ?? { label: '', value: '' };
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
        <v-col
          cols="12"
          md="2"
          class="py-md-0"
        >
          <v-select
            v-model="selectedInstance"
            :items="headersWithLabel"
            item-title="label"
            return-object
            :label="$t('admin.instance')"
            variant="outlined"
            clearable
            chips
            density="compact"
            class="align-center"
            id="instance-select"
            :no-data-text="$t('noDataFound')"
            :placeholder="$t('admin.instance')"
            :multiple="false"
            @update:modelValue="onChangeSelectedItem"
          />
        </v-col>
      </v-row>

      <v-table
        data-testid="rolle-table"
        class="text-body-1"
      >
        <thead>
          <tr>
            <th>ErWIn-Portal</th>
            <th>{{ selectedInstance.label || '...' }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(role, index) in erWInPortalRoles"
            :key="index"
          >
            <td>{{ role }}</td>
            <td>
              <v-select
                v-model="selectedRoles[index]"
                :items="currentRoleOptions"
                :label="$t('admin.Role')"
                variant="outlined"
                clearable
                chips
                density="compact"
                class="align-center"
                id="role-select"
                :no-data-text="$t('noDataFound')"
                :placeholder="$t('admin.Role')"
                :multiple="false"
              />
            </td>
          </tr>
        </tbody>
      </v-table>
    </LayoutCard>
  </div>
</template>

<style scoped>
  .align-center {
    text-align: center;
  }
  .align-start {
    text-align: start;
  }
</style>
