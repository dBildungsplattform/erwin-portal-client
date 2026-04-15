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
        <div>
          <h1>{{ t('help.title') }}</h1>
          <p>{{ t('info.placeholder') }}</p>
        </div>

        <div>
          <h1>{{ t('help.gettingStartedTitle') }}</h1>
          <p>{{ t('help.gettingStartedDescription') }}</p>
        </div>

        <div>
          <h1>{{ t('help.resourcesTitle') }}</h1>
          <p>{{ t('help.resourcesDescription') }}</p>
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-8"></v-divider>
    <v-row justify="center">
      <v-btn
        class="primary mr-4"
        data-testid="contact-button"
        :href="'/hilfe/kontakt'"
      >
        {{ $t('nav.toContact') }}
      </v-btn>
      <v-btn
        class="primary"
        data-testid="faq-button"
        :href="'/hilfe/faq'"
      >
        {{ $t('nav.toFaq') }}
      </v-btn>
    </v-row>
    <v-row
      justify="center"
      class="mt-4"
    >
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
