<script setup lang="ts">
  import LayoutCard from '@/components/cards/LayoutCard.vue';
  import { ref, type Ref } from 'vue';

  // const router: Router = useRouter();

  type Item = {
    label: string;
    value: string;
  };

  const erWInPortalRoles: Array<string> = ['USER', 'LERN', 'LEHR', 'LEIT', 'SYSADMIN', 'EXTERN', 'Portal-Admin'];

  const spshRoles: Array<string> = [
    '-',
    'Itslearning-Schüler',
    'Lehrkraft in den diversen Ausprägungen',
    'Schul-Admin',
    'Landes-Admin	',
    'Schulsekretariat, Gärtner...',
    '-',
  ];

  const svsRoles: Array<string> = ['user', 'Student', 'Teacher', 'Administrator', 'Superhero', 'Expert', '-'];

  const moodleRoles: Array<string> = ['Authenticated User', 'Student', 'Teacher', 'Manager', 'Site Administrator', '-', '-'];

  let selectedInstance: Ref<Item | undefined> = ref();
  const headersWithLabel: Item[] = [
    { label: 'SVS', value: 'SVS' },
    { label: 'Moodle', value: 'Moodle' },
    { label: 'SPSH', value: 'SPSH' },
  ];

  let selectedRole: Ref< | undefined> = ref();

  function onChangeSelectedItem(value: Item | null): void {
    selectedInstance.value = value === null ? undefined : value;
  }

  function getInstanceList(instance: string, index: number): string {
    if (instance === 'SVS') {
      return svsRoles[index]!;
    } else if (instance === 'Moodle') {
      return moodleRoles[index]!;
    } else if (instance === 'SPSH') {
      return spshRoles[index]!;
    } else {
      return '-';
    }
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
            :class="[{ 'align-center': true }]"
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
            <th>{{ selectedInstance?.label ?? '...' }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(role, index) in erWInPortalRoles"
            :key="index"
          >
            <td>{{ role }}</td>
            <v-select
            v-model="selectedRole"
            :items=[]
            item-title="label"
            return-object
            :label="$t('admin.Role')"
            variant="outlined"
            clearable
            chips
            density="compact"
            :class="[{ 'align-center': true }]"
            id="role-select"
            :no-data-text="$t('noDataFound')"
            :placeholder="$t('admin.Role')"
            :multiple="false"
            @update:modelValue="onChangeSelectedItem"
          />
            <td :class="[{ 'align-start': true }]">
              {{ getInstanceList(selectedInstance?.label!, index) }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </LayoutCard>
  </div>
</template>

<style></style>
