<script setup lang="ts">
  import { useI18n, type Composer } from 'vue-i18n';
  function goBack(): void {
    window.history.back();
  }
  const { t }: Composer = useI18n({ useScope: 'global' });
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <h1 class="text-h4 mb-4">{{ t('help.title') }}</h1>
        <p>{{ t('info.placeholder') }}</p>
      </v-col>
    </v-row>
    <v-divider class="my-8"></v-divider>
    <v-row justify="center">
      <v-btn
        class="primary"
        @click="goBack"
        data-testid="back-button"
      >
        {{ $t('nav.back') }}
      </v-btn>
    </v-row>
  </v-container>
</template>

<style scoped></style>
