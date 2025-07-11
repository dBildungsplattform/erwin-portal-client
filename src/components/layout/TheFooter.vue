<script setup lang="ts">
  import { type ComputedRef, ref, type Ref } from 'vue';
  import BMBF_LOGO from '@/assets/logos/erwin_logos/BMBF_Logo.svg';
  import ERWIN_LOGO_SMALL from '@/assets/logos/erwin_logos/Logo-ErWIn-Portal-dunkel.svg';
  import { type Composer, useI18n } from 'vue-i18n';
  import { useDisplay } from 'vuetify';

  const { t }: Composer = useI18n({ useScope: 'global' });

  type FooterLink = {
    text: string;
    href: string;
    external: boolean;
  };

  type Sponsor = {
    src: string;
    alt: string;
    href: string;
  };

  const footerLinks: Ref<FooterLink[]> = ref([
    { text: t('footer.contact'), href: 'https://www.secure-lernnetz.de/helpdesk/', external: true },
    {
      text: t('footer.help'),
      href: 'https://medienberatung.iqsh.de/schulportal-sh.html',
      external: true,
    },
    {
      text: t('footer.legalNotice'),
      href: '/impressum_datenschutzerklaerung.html',
      external: true,
    },
    {
      text: t('footer.privacyPolicy'),
      href: '/impressum_datenschutzerklaerung.html#privacy_policy',
      external: true,
    },
    {
      text: t('footer.accessibility'),
      href: '/impressum_datenschutzerklaerung.html#accessibility',
      external: true,
    },
  ]);

  const sponsors: Ref<Sponsor[]> = ref([
    {
      src: ERWIN_LOGO_SMALL,
      alt: 'ErWIn Portal',
      href: 'https://www.dataport.de/services-produkte/it-produkte/projekt-erwin/',
    },
    {
      src: BMBF_LOGO,
      alt: 'BMBF',
      href: 'https://www.bmfsfj.de/',
    },
  ]);

  const { mobile }: { mobile: ComputedRef<boolean> } = useDisplay();
</script>

<template>
  <v-footer
    absolute
    :app="mobile"
    class="footer"
    data-testid="footer"
  >
    <v-container>
      <v-row>
        <!-- Sponsor Logos -->
        <v-col
          cols="12"
          lg="7"
          order-lg="2"
          class="sponsor-logos-col justify-end"
        >
          <div class="sponsor-logos-div">
            <template
              v-for="sponsor in sponsors"
              :key="sponsor.alt"
            >
              <!-- Logo with clickable link -->
              <a
                :href="sponsor.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                <v-img
                  :src="sponsor.src"
                  :alt="sponsor.alt"
                  width="220"
                  contain
                  class="sponsor-logo"
                />
              </a>
            </template>
          </div>
        </v-col>

        <!-- Footer Links -->
        <v-col
          cols="12"
          lg="5"
          order-lg="1"
          class="footer-links-col justify-space-between"
        >
          <a
            v-for="link in footerLinks"
            class="primary"
            :key="link.text"
            :href="link.href"
            rel="noopener noreferrer"
            :target="link.external ? '_blank' : '_self'"
            >{{ link.text }}</a
          >
        </v-col>
      </v-row>
      <div class="bottom-decoration"></div>
    </v-container>
  </v-footer>
</template>

<style scoped>
  .footer {
    align-items: flex-end;
    background-image:
      linear-gradient(to bottom right, #ffffff 25%, transparent 25%),
      linear-gradient(180deg, rgba(229, 234, 239, 1) 100%, transparent 100%);

    background-repeat: no-repeat, no-repeat;

    background-size:
      200% 75%,
      100% 100%;

    bottom: 0;
    min-height: 240px; /* Avoid footer shrinking vertically on smaller screen sizes*/
    position: absolute;
    width: 100%;
    width: -moz-available; /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  }

  @media (max-width: 1279px) {
    .footer {
      min-height: 280px;
      background-size:
        200% 75%,
        100% 100%;
    }
  }

  @media (max-width: 960px) {
    .footer {
      min-height: 280px;
      background-size:
        200% 45%,
        100% 100%;
    }
  }

  @media (max-width: 690px) {
    .footer {
      min-height: 300px;
      background-size:
        200% 40%,
        100% 100%;
    }
    .footer-links-col a {
      margin-right: 10px;
    }
  }

  @media (max-width: 510px) {
    .footer {
      min-height: 320px;
      background-size:
        200% 40%,
        100% 100%;
    }
  }

  @media (max-width: 430px) {
    .footer {
      min-height: 300px;
      background-size:
        200% 30%,
        100% 100%;
    }
  }

  @media (max-width: 390px) {
    .footer {
      min-height: 260px;
      background-size:
        200% 30%,
        100% 100%;
    }
  }

  .v-container {
    padding-bottom: 40px;
  }
  .footer-links-col {
    display: flex;
    align-items: flex-end; /* Aligns the links to the start of the flex container */
  }

  .sponsor-logos-col {
    display: flex;
    justify-content: flex-end; /* Aligns the logos to the right */
  }

  .sponsor-logos-div {
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* The line between the 2 logos */
  .sponsor-logos-div::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #001e49;
    transform: translateX(-50%);
  }
  @-moz-document url-prefix() {
    .sponsor-logos-div::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background-color: #001e49;
      transform: translateX(-50%);
      height: 130px;
      margin-top: 45px;
    }
  }
  .sponsor-logo {
    height: auto; /* Maintain aspect ratio */
    margin: 0 10px; /* Adds some space between logos */
  }
  .bottom-decoration {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 22px;
    background-color: #001e49;
    z-index: 1000;
  }

  .sponsor-logos-col,
  .footer-links-col {
    flex-wrap: wrap; /* Allow the items to wrap if needed */
    justify-content: center; /* Center the items if they wrap */
  }

  @media (max-width: 540px) {
    .sponsor-logo {
      max-width: 200px;
    }
  }

  @media (max-width: 490px) {
    .sponsor-logo {
      max-width: 180px;
    }
  }

  @media (max-width: 450px) {
    .sponsor-logo {
      max-width: 160px;
    }
  }

  @media (max-width: 400px) {
    .sponsor-logo {
      max-width: 140px;
    }
  }

  @media (max-width: 370px) {
    .sponsor-logo {
      max-width: 130px;
    }
  }

  @media (max-width: 290px) {
    .sponsor-logo {
      max-width: 96px;
    }
  }

  @media (min-width: 960px) and (max-width: 1280px) {
    .footer-links-col a {
      margin-right: 77px;
    }
  }
</style>
