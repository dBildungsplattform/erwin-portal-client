<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n, type Composer } from 'vue-i18n';

  const { t }: Composer = useI18n({ useScope: 'global' });
  const tab = ref('desktop');
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">

        <!-- Breadcrumbs -->
        <v-breadcrumbs
          :items="['ErWIn-Portal', 'Hilfe', 'Layout-Handbuch']"
          class="px-0 pt-0 pb-4 text-medium-emphasis"
        ></v-breadcrumbs>

        <h1 class="text-h4 mb-2">{{ t('instructions.title') }}</h1>
        <p class="text-subtitle-1 text-medium-emphasis mb-6">
          Umfassende Übersicht über verfügbare Layout- und Formatierungselemente für technische Dokumentationen.
        </p>

        <!-- Inhaltsverzeichnis -->
        <v-card color="grey-lighten-4" variant="flat" class="mb-10" border>
          <v-card-title class="text-subtitle-1 font-weight-bold d-flex align-center bg-grey-lighten-3">
            <v-icon icon="mdi-format-list-bulleted" start></v-icon>
            Inhaltsverzeichnis
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-2">
            <v-list density="compact" bg-color="transparent">
              <v-list-item link href="#hierarchien" title="1. Text-Hierarchien"></v-list-item>
              <v-list-item link href="#timeline" title="2. Schritt-Abfolgen (Timeline)"></v-list-item>
              <v-list-item link href="#alerts" title="3. Informations- & Warn-Boxen"></v-list-item>
              <v-list-item link href="#listen" title="4. Listen & Aufzählungen"></v-list-item>
              <v-list-item link href="#medien" title="5. Medien & Screenshots"></v-list-item>
              <v-list-item link href="#faq" title="6. Klapp-Menüs (Wissensdatenbank)"></v-list-item>
              <v-list-item link href="#tabs" title="7. Aufgaben-Tabs (Desktop / Mobil)"></v-list-item>
              <v-list-item link href="#tabellen" title="8. Daten & Tabellen"></v-list-item>
              <v-list-item link href="#code" title="9. Code-Snippets & Kommandos"></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- 1. Text-Hierarchien -->
        <h2 id="hierarchien" class="text-h5 mb-4 section-heading">1. Text-Hierarchien</h2>
        <v-card variant="outlined" class="mb-8">
          <v-card-text>
            <p class="text-body-1 mb-4">
              Eine gute Anleitung startet mit einer logischen Struktur. Vuetify-Klassen schaffen konsistente Abstände und Größen:
            </p>
            <h1 class="text-h4 mb-2 text-high-emphasis">Haupttitel (H1 / text-h4)</h1>
            <h2 class="text-h5 mt-4 mb-2 text-primary">Sektionston (H2 / text-h5)</h2>
            <h3 class="text-h6 mt-2 mb-2 text-medium-emphasis">Unterbereich (H3 / text-h6)</h3>
            <p class="text-body-2 text-disabled mt-3">text-body-2 für Metainformationen und Fußnoten.</p>
          </v-card-text>
        </v-card>

        <!-- 2. Schritt-Abfolgen -->
        <h2 id="timeline" class="text-h5 mb-4 mt-8 section-heading">2. Schritt-Abfolgen (Timeline)</h2>
        <v-timeline density="compact" align="start" truncate-line="both" class="mb-8">
          <v-timeline-item dot-color="primary" size="small">
            <div class="mb-1"><strong>Schritt 1: Systemanmeldung</strong></div>
            <div class="text-body-2 text-medium-emphasis">
              Klicken Sie auf "Anmelden" oben rechts. Geben Sie anschließend Ihre Dienstnummer ein.
            </div>
          </v-timeline-item>
          <v-timeline-item dot-color="success" size="small">
            <div class="mb-1"><strong>Schritt 2: Modul auswählen</strong></div>
            <div class="text-body-2 text-medium-emphasis">
              Wählen Sie im Dashboard das Modul <v-chip size="small" color="primary" variant="flat">Personensuche</v-chip> aus.
            </div>
          </v-timeline-item>
          <v-timeline-item dot-color="grey" size="small">
            <div class="mb-1"><strong>Schritt 3: Datenabgleich</strong></div>
            <div class="text-body-2 text-medium-emphasis">
              Starten Sie die Abfrage. Ergebnisse aus allen angeschlossenen Datenbanken werden aggregiert dargestellt.
            </div>
          </v-timeline-item>
        </v-timeline>

        <!-- 3. Informations- & Warn-Boxen -->
        <h2 id="alerts" class="text-h5 mb-4 mt-8 section-heading">3. Informations- & Warn-Boxen</h2>
        <v-alert type="info" variant="tonal" class="mb-4">
          <strong>Pro-Tipp:</strong> Nutzen Sie Tastaturkürzel (z.B. Strg+F), um Ergebnislisten schnell zu durchsuchen.
        </v-alert>
        <v-alert type="success" variant="outlined" class="mb-4">
          <template v-slot:title>Erfolgskontrolle</template>
          Wenn der Status auf "Grün" springt, wurden Ihre Eingaben fehlerfrei übermittelt.
        </v-alert>
        <v-alert type="warning" border="start" border-color="warning" elevation="2" class="mb-4">
          <strong>Datenschutz:</strong> Die folgenden Abfragen werden vollständig protokolliert.
        </v-alert>
        <v-alert type="error" variant="flat" class="mb-8">
          <strong>Achtung:</strong> Im Testsystem werden ausgedachte Personennamen verwendet. Keine Echtdaten verwenden!
        </v-alert>

        <!-- 4. Listen & Aufzählungen -->
        <h2 id="listen" class="text-h5 mb-4 mt-8 section-heading">4. Listen & Aufzählungen</h2>
        <v-row class="mb-8">
          <v-col cols="12" sm="6">
            <v-card variant="elevated" elevation="2">
              <v-card-title class="text-h6">Checkliste</v-card-title>
              <v-list density="compact">
                <v-list-item prepend-icon="mdi-check-circle" base-color="success">
                  <v-list-item-title>VPN-Tunnel aktiv</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-check-circle" base-color="success">
                  <v-list-item-title>Zertifikat gültig</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-close-circle" base-color="error">
                  <v-list-item-title>Sitzungs-Timeout abgewendet</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" align-self="center">
            <h3 class="text-h6 mb-2">Klassische Aufzählung</h3>
            <ul class="pl-4 text-body-1 text-medium-emphasis">
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

        <!-- 5. Medien & Screenshots -->
        <h2 id="medien" class="text-h5 mb-4 mt-8 section-heading">5. Medien & Screenshots</h2>
        <v-card class="mb-8" border rounded="lg">
          <v-img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
            height="300"
            cover
            class="bg-grey-lighten-2"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-text class="text-center text-caption bg-grey-lighten-4">
            Abb. 1: Beispielhafter Behörden-Arbeitsplatz
          </v-card-text>
        </v-card>

        <!-- 6. Klapp-Menüs (Wissensdatenbank) -->
        <h2 id="faq" class="text-h5 mb-4 mt-8 section-heading">6. Klapp-Menüs (Wissensdatenbank)</h2>
        <v-expansion-panels variant="accordion" class="mb-8">
          <v-expansion-panel>
            <v-expansion-panel-title class="font-weight-bold">
              Wo finde ich meine Dienststellennummer?
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-2 text-medium-emphasis pt-2">
              Die Nummer finden Sie in Ihrem Personalstammblatt oder direkt oben rechts in Ihrem ErWIn-Profil.
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title class="font-weight-bold">
              Das System hängt sich auf. Was tun?
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-2 text-medium-emphasis pt-2">
              Bitte leeren Sie Ihren Browser-Cache (<strong>Strg</strong> + <strong>F5</strong>) und versuchen Sie es erneut.
              Sollte das nicht helfen, kontaktieren Sie den internen Helpdesk.
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <!-- 7. Aufgaben-Tabs (Desktop / Mobil) -->
        <h2 id="tabs" class="text-h5 mb-4 mt-8 section-heading">7. Aufgaben-Tabs (Desktop / Mobil)</h2>
        <v-card border elevation="0" class="mb-8">
          <v-tabs bg-color="primary" v-model="tab">
            <v-tab value="desktop"><v-icon start>mdi-monitor</v-icon> Desktop</v-tab>
            <v-tab value="mobile"><v-icon start>mdi-cellphone</v-icon> App (Mobil)</v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="desktop">
                <p class="text-body-1 mb-2">Anleitung für die Web-Ansicht am Arbeitsplatz:</p>
                <ol class="pl-4 mt-2 text-body-2 text-medium-emphasis">
                  <li>Klicken Sie mit der Maus auf "Suchen".</li>
                  <li>Die Suche öffnet sich in einem neuen Fenster.</li>
                </ol>
              </v-window-item>
              <v-window-item value="mobile">
                <p class="text-body-1 mb-2">Anleitung für Tablets im Streifenwagen:</p>
                <ol class="pl-4 mt-2 text-body-2 text-medium-emphasis">
                  <li>Tippen Sie rechts oben auf das Lupen-Symbol.</li>
                  <li>Die Tastatur fährt automatisch hoch.</li>
                </ol>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>

        <!-- 8. Daten & Tabellen -->
        <h2 id="tabellen" class="text-h5 mb-4 mt-8 section-heading">8. Daten & Tabellen</h2>
        <p class="text-body-1 mb-4">Übersichtliche Darstellung von Rechten und Rollen im System:</p>
        <v-table density="comfortable" class="border mb-8">
          <thead class="bg-grey-lighten-4">
            <tr>
              <th class="text-left font-weight-bold">Rolle</th>
              <th class="text-left font-weight-bold">Zugriff</th>
              <th class="text-left font-weight-bold">Beschreibung</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Administrator</td>
              <td><v-chip size="small" color="success" variant="flat">Vollzugriff</v-chip></td>
              <td class="text-medium-emphasis">Darf Rollen und Nutzer parallel verwalten.</td>
            </tr>
            <tr>
              <td>Dienststellenleitung</td>
              <td><v-chip size="small" color="primary" variant="flat">Lesen</v-chip></td>
              <td class="text-medium-emphasis">Darf Protokolle und Statistiken einsehen.</td>
            </tr>
            <tr>
              <td>Sachbearbeitung</td>
              <td><v-chip size="small" color="grey" variant="flat">Eingeschränkt</v-chip></td>
              <td class="text-medium-emphasis">Darf nur eigene Einträge bearbeiten.</td>
            </tr>
          </tbody>
        </v-table>

        <!-- 9. Code-Snippets & Kommandos -->
        <h2 id="code" class="text-h5 mb-4 mt-8 section-heading">9. Code-Snippets & Kommandos</h2>
        <v-sheet border rounded="lg" class="pa-4 bg-grey-darken-4 text-grey-lighten-2 mb-8">
          <code class="code-block">
            <span class="text-grey"># VPN-Verbindung manuell überprüfen</span><br>
            ping -c 4 portal.erwin.bos.de<br>
            <br>
            <span class="text-grey"># Zertifikat aktualisieren</span><br>
            certutil -viewstore
          </code>
        </v-sheet>

      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <v-row justify="center">
      <v-btn data-testid="back-button" href="/start">
        {{ $t('nav.backToStart') }}
      </v-btn>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Scroll-Offset für Anker-Links, damit Überschriften nicht hinter einem sticky Header verschwinden */
.section-heading {
  scroll-margin-top: 80px;
}

.code-block {
  font-family: monospace;
}
</style>
