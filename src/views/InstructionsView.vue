<script setup lang="ts">
  import { ref, type Ref } from 'vue';
  import { useI18n, type Composer } from 'vue-i18n';
  import LayoutCard from '@/components/cards/LayoutCard.vue';

  const { t }: Composer = useI18n({ useScope: 'global' });
  const tab: Ref<string> = ref('desktop');
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <div class="mb-8">
          <h1 class="headline-1">{{ t('instructions.title') }}</h1>
          <p>Umfassende Übersicht über verfügbare Layout- und Formatierungselemente für technische Dokumentationen.</p>
        </div>
        <v-card
          color="grey-lighten-4"
          variant="flat"
          class="mb-10"
          border
        >
          <v-card-title class="text-subtitle-1 font-weight-bold d-flex align-center bg-grey-lighten-3">
            <v-icon
              icon="mdi-format-list-bulleted"
              start
            ></v-icon>
            Inhaltsverzeichnis
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-2">
            <v-list
              density="compact"
              bg-color="transparent"
            >
              <v-list-item
                link
                href="#hierarchien"
                title="1. Text-Hierarchien"
              ></v-list-item>
              <v-list-item
                link
                href="#timeline"
                title="2. Schritt-Abfolgen (Timeline)"
              ></v-list-item>
              <v-list-item
                link
                href="#alerts"
                title="3. Informations- & Warn-Boxen"
              ></v-list-item>
              <v-list-item
                link
                href="#listen"
                title="4. Listen & Aufzählungen"
              ></v-list-item>
              <v-list-item
                link
                href="#medien"
                title="5. Medien & Screenshots"
              ></v-list-item>
              <v-list-item
                link
                href="#faq"
                title="6. Klapp-Menüs (Wissensdatenbank)"
              ></v-list-item>
              <v-list-item
                link
                href="#tabs"
                title="7. Aufgaben-Tabs (Desktop / Mobil)"
              ></v-list-item>
              <v-list-item
                link
                href="#tabellen"
                title="8. Daten & Tabellen"
              ></v-list-item>
              <v-list-item
                link
                href="#code"
                title="9. Code-Snippets & Kommandos"
              ></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <!-- 1. Text-Hierarchien -->
        <LayoutCard
          :header="'1. Text-Hierarchien'"
          class="mb-8"
        >
          <v-row class="ma-4">
            <v-col cols="12">
              <p class="mb-4">
                Eine gute Anleitung startet mit einer logischen Struktur. Nutzen Sie die Typografie-Klassen für
                konsistente Abstände und Größen:
              </p>
              <h1 class="headline-1 mb-2">Haupttitel (headline-1)</h1>
              <h2 class="headline-2 mt-4 mb-2">Sektionston (headline-2)</h2>
              <h3 class="headline-3 mt-2 mb-2">Unterbereich (headline-3)</h3>
              <p class="body-2 mt-3">body-2 für Metainformationen und Fußnoten.</p>
            </v-col>
          </v-row>
        </LayoutCard>

        <!-- 2. Schritt-Abfolgen -->
        <LayoutCard
          :header="'2. Schritt-Abfolgen (Timeline)'"
          class="mb-8"
        >
          <v-row class="ma-4">
            <v-col cols="12">
              <v-timeline
                density="compact"
                align="start"
                truncate-line="both"
              >
                <v-timeline-item
                  dot-color="primary"
                  size="small"
                >
                  <div class="mb-1"><strong>Schritt 1: Systemanmeldung</strong></div>
                  <div>Klicken Sie auf "Anmelden" oben rechts. Geben Sie anschließend Ihre Dienstnummer ein.</div>
                </v-timeline-item>
                <v-timeline-item
                  dot-color="success"
                  size="small"
                >
                  <div class="mb-1"><strong>Schritt 2: Modul auswählen</strong></div>
                  <div>
                    Wählen Sie im Dashboard das Modul
                    <v-chip
                      size="small"
                      color="primary"
                      variant="flat"
                      >Personensuche</v-chip
                    >
                    aus.
                  </div>
                </v-timeline-item>
                <v-timeline-item
                  dot-color="primary"
                  size="small"
                >
                  <div class="mb-1"><strong>Schritt 3: Datenabgleich</strong></div>
                  <div>
                    Starten Sie die Abfrage. Ergebnisse aus allen angeschlossenen Datenbanken werden aggregiert
                    dargestellt.
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-col>
          </v-row>
        </LayoutCard>

        <!-- 3. Informations- & Warn-Boxen -->
        <LayoutCard
          :header="'3. Informations- & Warn-Boxen'"
          class="mb-8"
        >
          <v-row class="ma-4">
            <v-col cols="12">
              <v-alert
                type="info"
                variant="tonal"
                class="mb-4"
              >
                <strong>Pro-Tipp:</strong> Nutzen Sie Tastaturkürzel (z.B. Strg+F), um Ergebnislisten schnell zu
                durchsuchen.
              </v-alert>
              <v-alert
                type="success"
                variant="outlined"
                class="mb-4"
              >
                <template v-slot:title>Erfolgskontrolle</template>
                Wenn der Status auf "Grün" springt, wurden Ihre Eingaben fehlerfrei übermittelt.
              </v-alert>
              <v-alert
                type="warning"
                border="start"
                border-color="warning"
                elevation="2"
                class="mb-4"
              >
                <strong>Datenschutz:</strong> Die folgenden Abfragen werden vollständig protokolliert.
              </v-alert>
              <v-alert
                type="error"
                variant="flat"
              >
                <strong>Achtung:</strong> Im Testsystem werden ausgedachte Personennamen verwendet. Keine Echtdaten
                verwenden!
              </v-alert>
            </v-col>
          </v-row>
        </LayoutCard>

        <!-- 4. Listen & Aufzählungen -->
        <LayoutCard
          :header="'4. Listen & Aufzählungen'"
          class="mb-8"
        >
          <v-row class="ma-4">
            <v-col
              cols="12"
              sm="6"
            >
              <h3 class="headline-3 mb-2">Checkliste</h3>
              <v-list density="compact">
                <v-list-item
                  prepend-icon="mdi-check-circle"
                  base-color="success"
                >
                  <v-list-item-title>VPN-Tunnel aktiv</v-list-item-title>
                </v-list-item>
                <v-list-item
                  prepend-icon="mdi-check-circle"
                  base-color="success"
                >
                  <v-list-item-title>Zertifikat gültig</v-list-item-title>
                </v-list-item>
                <v-list-item
                  prepend-icon="mdi-close-circle"
                  base-color="error"
                >
                  <v-list-item-title>Sitzungs-Timeout abgewendet</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <h3 class="headline-3 mb-2">Klassische Aufzählung</h3>
              <ul class="pl-4">
                <li>Erster wichtiger Punkt</li>
                <li>Zweiter regulärer Punkt</li>
                <li>
                  Eingerückte Unterliste:
                  <ul class="pl-4 mt-1">
                    <li>Detail A</li>
                    <li>Detail B</li>
                  </ul>
                </li>
              </ul>
            </v-col>
          </v-row>
        </LayoutCard>

        <!-- 5. Medien & Screenshots -->
        <LayoutCard
          :header="'5. Medien & Screenshots'"
          class="mb-8"
        >
          <v-row class="ma-4">
            <v-col cols="12">
              <v-img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                height="300"
                cover
                rounded="lg"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <p class="text-center mt-2 body-2">Abb. 1: Beispielhafter Behörden-Arbeitsplatz</p>
            </v-col>
          </v-row>
        </LayoutCard>

        <!-- 6. Klapp-Menüs (Wissensdatenbank) -->
        <LayoutCard
          :header="'6. Klapp-Menüs (Wissensdatenbank)'"
          class="mb-8"
        >
          <v-row class="ma-4">
            <v-col cols="12">
              <v-expansion-panels variant="accordion">
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <strong>Wo finde ich meine Dienststellennummer?</strong>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    Die Nummer finden Sie in Ihrem Personalstammblatt oder direkt oben rechts in Ihrem ErWIn-Profil.
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <strong>Das System hängt sich auf. Was tun?</strong>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    Bitte leeren Sie Ihren Browser-Cache (<strong>Strg</strong> + <strong>F5</strong>) und versuchen Sie
                    es erneut. Sollte das nicht helfen, kontaktieren Sie den internen Helpdesk.
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </LayoutCard>

        <!-- 7. Aufgaben-Tabs (Desktop / Mobil) -->
        <LayoutCard
          :header="'7. Aufgaben-Tabs (Desktop / Mobil)'"
          class="mb-8"
        >
          <v-tabs
            bg-color="primary"
            v-model="tab"
          >
            <v-tab value="desktop"><v-icon start>mdi-monitor</v-icon> Desktop</v-tab>
            <v-tab value="mobile"><v-icon start>mdi-cellphone</v-icon> App (Mobil)</v-tab>
          </v-tabs>
          <v-row class="ma-4">
            <v-col cols="12">
              <v-window v-model="tab">
                <v-window-item value="desktop">
                  <p class="mb-2">Anleitung für die Web-Ansicht am Arbeitsplatz:</p>
                  <ol class="pl-4 mt-2">
                    <li>Klicken Sie mit der Maus auf "Suchen".</li>
                    <li>Die Suche öffnet sich in einem neuen Fenster.</li>
                  </ol>
                </v-window-item>
                <v-window-item value="mobile">
                  <p class="mb-2">Anleitung für Tablets im Streifenwagen:</p>
                  <ol class="pl-4 mt-2">
                    <li>Tippen Sie rechts oben auf das Lupen-Symbol.</li>
                    <li>Die Tastatur fährt automatisch hoch.</li>
                  </ol>
                </v-window-item>
              </v-window>
            </v-col>
          </v-row>
        </LayoutCard>

        <!-- 8. Daten & Tabellen -->
        <LayoutCard
          :header="'8. Daten & Tabellen'"
          class="mb-8"
        >
          <v-row class="ma-4">
            <v-col cols="12">
              <p class="mb-4">Übersichtliche Darstellung von Rechten und Rollen im System:</p>
              <v-table density="comfortable">
                <thead>
                  <tr>
                    <th class="text-left"><strong>Rolle</strong></th>
                    <th class="text-left"><strong>Zugriff</strong></th>
                    <th class="text-left"><strong>Beschreibung</strong></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Administrator</td>
                    <td>
                      <v-chip
                        size="small"
                        color="success"
                        variant="flat"
                        >Vollzugriff</v-chip
                      >
                    </td>
                    <td>Darf Rollen und Nutzer parallel verwalten.</td>
                  </tr>
                  <tr>
                    <td>Dienststellenleitung</td>
                    <td>
                      <v-chip
                        size="small"
                        color="primary"
                        variant="flat"
                        >Lesen</v-chip
                      >
                    </td>
                    <td>Darf Protokolle und Statistiken einsehen.</td>
                  </tr>
                  <tr>
                    <td>Sachbearbeitung</td>
                    <td>
                      <v-chip
                        size="small"
                        variant="outlined"
                        >Eingeschränkt</v-chip
                      >
                    </td>
                    <td>Darf nur eigene Einträge bearbeiten.</td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </LayoutCard>

        <!-- 9. Code-Snippets & Kommandos -->
        <LayoutCard
          :header="'9. Code-Snippets & Kommandos'"
          class="mb-8"
        >
          <v-row class="ma-4">
            <v-col cols="12">
              <v-sheet
                rounded="lg"
                class="pa-4 code-block-container"
              >
                <code class="code-block">
                  <span class="code-comment"># VPN-Verbindung manuell überprüfen</span><br />
                  ping -c 4 portal.erwin.bos.de<br />
                  <br />
                  <span class="code-comment"># Zertifikat aktualisieren</span><br />
                  certutil -viewstore
                </code>
              </v-sheet>
            </v-col>
          </v-row>
        </LayoutCard>
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

<style scoped lang="scss">
  @use '@/styles/variables';

  .code-block {
    font-family: monospace;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .code-block-container {
    background-color: variables.$darkBlue;
    color: variables.$white;
  }

  .code-comment {
    color: variables.$grey;
  }
</style>
