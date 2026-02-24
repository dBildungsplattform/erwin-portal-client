<script setup lang="ts">
  import { computed, type ComputedRef } from 'vue';
  import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';
  import { useI18n, type Composer } from 'vue-i18n';

  const route: RouteLocationNormalizedLoaded = useRoute();
  const { t }: Composer = useI18n({ useScope: 'global' });

  const pageTitle: ComputedRef<string> = computed(() => {
    if (route.name === 'help') {
      return `${t('nav.help')} - ErWIn Portal`;
    }
    if (route.name === 'instructions') {
      return `${t('footer.instructions')} - ErWIn Portal`;
    }
    return 'ErWIn Portal';
  });
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <h1 class="text-h4 mb-4">{{ pageTitle }}</h1>
        <p>Diese Seite befindet sich derzeit im Aufbau. Weitere Informationen folgen in Kürze.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
