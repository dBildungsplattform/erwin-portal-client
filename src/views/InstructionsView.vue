<script setup lang="ts">
  import { useI18n, type Composer } from 'vue-i18n';
  const { t }: Composer = useI18n({ useScope: 'global' });
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <h1 class="text-h4 mb-4">{{ t('instructions.title') }}</h1>
        <p>{{ t('info.placeholder') }}</p>
      </v-col>
    </v-row>
    <v-divider class="my-8"></v-divider>
    <v-row justify="center">
      <v-btn
        class="primary"
        data-testid="back-button"
        :href="'/start'"
      >
        {{ $t('nav.backToStart') }}
      </v-btn>
    </v-row>
  </v-container>
</template>

<style scoped></style>
