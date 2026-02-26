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
        <h1 class="text-h4 mb-4">{{ t('imprint.title') }}</h1>
        <h2>{{ t('imprint.providerTitle') }}</h2>
        <p class="mb-4">
          <span
            v-for="(line, index) in t('imprint.address').split('\n')"
            :key="`address-${index}`"
          >
            {{ line }}<br />
          </span>
        </p>
        <p class="mb-4">
          <span
            v-for="(line, index) in t('imprint.contact').split('\n')"
            :key="`contact-${index}`"
          >
            {{ line }}<br />
          </span>
        </p>
        <h2>{{ t('imprint.boardTitle') }}</h2>
        <p class="mb-4">
          <span
            v-for="(line, index) in t('imprint.boardMembers').split('\n')"
            :key="`board-${index}`"
          >
            {{ line }}<br />
          </span>
        </p>
        <p class="mb-4">{{ t('imprint.vatId') }}</p>
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
