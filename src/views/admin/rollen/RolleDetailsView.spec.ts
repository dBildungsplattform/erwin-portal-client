import { expect, test, type MockInstance } from 'vitest';
import { DOMWrapper, VueWrapper, flushPromises, mount } from '@vue/test-utils';
import RolleDetailsView from './RolleDetailsView.vue';
import { setActivePinia, createPinia } from 'pinia';
import routes from '@/router/routes';
import { type Router, createRouter, createWebHistory } from 'vue-router';
import {
  RollenMerkmal,
  RollenSystemRecht,
  useRolleStore,
  type Rolle,
  type RolleStore,
  type RolleWithServiceProvidersResponse,
} from '@/stores/RolleStore';
import { nextTick } from 'vue';
import { useOrganisationStore, type OrganisationStore } from '@/stores/OrganisationStore';

let wrapper: VueWrapper | null = null;
let router: Router;
const rolleStore: RolleStore = useRolleStore();
const organisationStore: OrganisationStore = useOrganisationStore();

const mockCurrentRolle: Rolle = {
  administeredBySchulstrukturknoten: '1234',
  rollenart: 'LEHR',
  name: 'Lehrer',
  // TODO: remove type casting when generator is fixed
  merkmale: ['KOPERS_PFLICHT'] as unknown as Set<RollenMerkmal>,
  systemrechte: ['ROLLEN_VERWALTEN'] as unknown as Set<RollenSystemRecht>,
  id: '1',
  version: 1,
};

const mockUpdatedRolle: RolleWithServiceProvidersResponse = {
  administeredBySchulstrukturknoten: '1234',
  rollenart: 'LEHR',
  name: 'Updated Lehrer',
  merkmale: ['KOPERS_PFLICHT'] as unknown as Set<RollenMerkmal>,
  systemrechte: ['ROLLEN_VERWALTEN'] as unknown as Set<RollenSystemRecht>,
  createdAt: '2022',
  updatedAt: '2023',
  id: '1',
  serviceProviders: [{ id: 'sp1', name: 'ServiceProvider1' }],
  administeredBySchulstrukturknotenName: 'Land SH',
  administeredBySchulstrukturknotenKennung: '',
  version: 2,
};

rolleStore.currentRolle = mockCurrentRolle;
rolleStore.updatedRolle = mockUpdatedRolle;

beforeEach(async () => {
  setActivePinia(createPinia());
  document.body.innerHTML = `
    <div>
      <div id="app"></div>
    </div>
  `;

  router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.push('/');
  await router.isReady();

  wrapper = mount(RolleDetailsView, {
    attachTo: document.getElementById('app') || '',
    global: {
      components: {
        RolleDetailsView,
      },
      mocks: {
        route: {
          fullPath: 'full/path',
        },
      },
      plugins: [router],
    },
  });
});

describe('RolleDetailsView', () => {
  test('it renders the rolle details view', () => {
    expect(wrapper?.find('[data-testid="rolle-details-card"]').isVisible()).toBe(true);
  });

  test('it renders data for current rolle', async () => {
    rolleStore.errorCode = '';
    rolleStore.updatedRolle = null;
    rolleStore.currentRolle = {
      administeredBySchulstrukturknoten: '1234',
      rollenart: 'LEHR',
      name: 'Current Lehrer',
      merkmale: [] as unknown as Set<RollenMerkmal>,
      systemrechte: [] as unknown as Set<RollenSystemRecht>,
      id: '1',
      serviceProviders: [],
      version: 2,
    };
    organisationStore.currentOrganisation = {
      id: '1234',
      kennung: '',
      name: 'Current Schule',
      namensergaenzung: 'Current Schule',
      kuerzel: 'CurrentSchool',
      typ: 'SCHULE',
      administriertVon: '1',
      schuleDetails: 'SchuleDetails',
      version: 1,
      itslearningEnabled: true,
    };
    await flushPromises();

    // TODO: the computed value does not render inside the input
    // const orgaSelectInput: DOMWrapper<Element> | undefined = wrapper?.find('input#administrationsebene-select');
    // expect(wrapper?.find('[data-testid="administrationsebene-select"]').text()).toEqual('---');

    rolleStore.currentRolle = mockCurrentRolle;
    rolleStore.updatedRolle = mockUpdatedRolle;
  });

  test('it renders data in success template', async () => {
    rolleStore.updatedRolle = {
      administeredBySchulstrukturknoten: '1234',
      rollenart: 'LEHR',
      name: 'Updated Lehrer',
      merkmale: [] as unknown as Set<RollenMerkmal>,
      systemrechte: [] as unknown as Set<RollenSystemRecht>,
      createdAt: '2022',
      updatedAt: '2023',
      id: '1',
      serviceProviders: [],
      administeredBySchulstrukturknotenName: 'Land SH',
      administeredBySchulstrukturknotenKennung: '',
      version: 2,
    };
    await flushPromises();

    const rolleName: DOMWrapper<Element> | undefined = wrapper?.find('[data-testid="updated-rolle-name"]');
    const rolleMerkmale: DOMWrapper<Element> | undefined = wrapper?.find('[data-testid="updated-rolle-merkmale"]');
    const rolleAngebote: DOMWrapper<Element> | undefined = wrapper?.find('[data-testid="updated-rolle-angebote"]');
    const rolleSystemrechte: DOMWrapper<Element> | undefined = wrapper?.find(
      '[data-testid="updated-rolle-systemrechte"]',
    );

    expect(rolleName?.text()).toEqual('Updated Lehrer');
    expect(rolleMerkmale?.text()).toEqual('---');
    expect(rolleAngebote?.text()).toEqual('---');
    expect(rolleSystemrechte?.text()).toEqual('---');

    rolleStore.updatedRolle = mockUpdatedRolle;
  });

  test('it activates editing mode', async () => {
    rolleStore.updatedRolle = null;
    rolleStore.errorCode = '';

    await nextTick();

    await wrapper?.find('[data-testid="rolle-edit-button"]').trigger('click');
    await nextTick();

    expect(wrapper?.find('[data-testid="rolle-changes-save"]').isVisible()).toBe(true);
  });

  test('it does not cancel editing because of unsaved changes', async () => {
    rolleStore.updatedRolle = null;
    rolleStore.errorCode = '';

    await wrapper?.find('[data-testid="rolle-edit-button"]').trigger('click');
    await nextTick();

    await wrapper?.find('[data-testid="rollenname-input"] input').setValue('1b');
    await nextTick();

    await wrapper?.find('[data-testid="rolle-edit-cancel-button"]').trigger('click');
    await nextTick();

    expect(document.querySelector('[data-testid="unsaved-changes-warning-text"]')).not.toBeNull();
  });

  test('it confirms unsaved changes and resets state', async () => {
    rolleStore.updatedRolle = null;
    rolleStore.errorCode = '';

    // activate edit mode so that edit controls are visible
    await wrapper?.find('[data-testid="rolle-edit-button"]').trigger('click');
    await nextTick();

    // open the unsaved changes dialog by toggling the exposed ref
    const vmWithDialog: { showUnsavedChangesDialog: boolean } = (wrapper as VueWrapper).vm as unknown as {
      showUnsavedChangesDialog: boolean;
    };
    vmWithDialog.showUnsavedChangesDialog = true;
    await nextTick();

    expect(document.querySelector('[data-testid="unsaved-changes-warning-text"]')).not.toBeNull();

    // simulate that an error was set before confirming, which should then be cleared
    rolleStore.errorCode = 'ROLLE_UPDATE_ERROR';

    const confirmButton: Element | null = document.querySelector('[data-testid="confirm-unsaved-changes-button"]');
    expect(confirmButton).not.toBeNull();

    if (confirmButton) {
      confirmButton.dispatchEvent(new Event('click'));
    }

    await flushPromises();

    // edit mode should be disabled again (save button hidden, edit button visible)
    expect(wrapper?.find('[data-testid="rolle-changes-save"]').exists()).toBe(false);
    expect(wrapper?.find('[data-testid="rolle-edit-button"]').isVisible()).toBe(true);

    // errorCode should be cleared by handleConfirmUnsavedChanges
    expect(rolleStore.errorCode).toBe('');
  });

  test('it submits the form and shows the success template', async () => {
    rolleStore.updatedRolle = null;
    rolleStore.errorCode = '';

    await wrapper?.find('[data-testid="rolle-edit-button"]').trigger('click');
    await nextTick();

    const rolleFormWrapper: VueWrapper<never, never> | undefined = wrapper?.findComponent({ name: 'RolleForm' });

    // Set the administrationsebene and rollenart first
    await rolleFormWrapper?.findComponent({ ref: 'administrationsebene-select' }).setValue('1');
    await nextTick();

    await rolleFormWrapper?.findComponent({ ref: 'rollenart-select' }).setValue('LEHR');
    await nextTick();

    await rolleFormWrapper?.findComponent({ ref: 'rollenname-input' }).setValue('Updated Lehrer');
    await nextTick();

    await wrapper?.find('[data-testid="rolle-changes-save"]').trigger('click');
    await nextTick();

    rolleStore.updatedRolle = mockUpdatedRolle;
    await nextTick();

    const rolleSuccessTemplate: VueWrapper<never, never> | undefined = wrapper?.findComponent({
      name: 'RolleSuccessTemplate',
    });

    expect(rolleSuccessTemplate?.find('[data-testid="rolle-success-text"]').text()).toBe(
      'Die Rolle wurde erfolgreich geändert.',
    );
  });

  test('displays error message correctly', async () => {
    // We have to reset updatedRolle to null to trigger the error message
    rolleStore.updatedRolle = null;

    // Test case 1: ROLLE_UPDATE_ERROR
    rolleStore.errorCode = 'ROLLE_UPDATE_ERROR';
    await nextTick();

    const spshAlertWrapper: VueWrapper | undefined = wrapper?.findComponent({ name: 'SpshAlert' });
    expect(spshAlertWrapper?.props()).toMatchObject({
      title: 'Die Rolle konnte nicht bearbeitet werden',
    });
    // Test case 2: NEWER_VERSION_OF_ROLLE_AVAILABLE
    rolleStore.errorCode = 'NEWER_VERSION_OF_ROLLE_AVAILABLE';
    await nextTick();

    expect(spshAlertWrapper?.props()).toMatchObject({
      title: 'Geänderte Daten',
    });
    // reset errorCode after test
    rolleStore.errorCode = '';
  });

  test('it clears error and navigates when the alert is closed', async () => {
    // show the error alert
    rolleStore.updatedRolle = null;
    rolleStore.errorCode = 'ROLLE_UPDATE_ERROR';
    await nextTick();

    const pushSpy: MockInstance = vi.spyOn(router, 'push');

    const spshAlertWrapper: VueWrapper | undefined = wrapper?.findComponent({ name: 'SpshAlert' });
    expect(spshAlertWrapper?.exists()).toBe(true);

    // simulate closing the alert via its navigation/close UI
    spshAlertWrapper?.vm.$emit('update:modelValue', false);
    await flushPromises();

    // errorCode should be cleared by handleAlertClose
    expect(rolleStore.errorCode).toBe('');
    // navigation should go back to the rolle table
    expect(pushSpy).toHaveBeenCalledWith({ name: 'rolle-management' });
  });

  test('it navigates back to Rolle table', async () => {
    const push: MockInstance = vi.spyOn(router, 'push');
    await wrapper?.find('[data-testid="close-layout-card-button"]').trigger('click');
    expect(push).toHaveBeenCalledTimes(1);
  });

  test('it submits the form to delete a Rolle', async () => {
    const deleteSpy: MockInstance = vi
      .spyOn(rolleStore, 'deleteRolleById')
      .mockResolvedValue(undefined as unknown as void);
    const pushSpy: MockInstance = vi.spyOn(router, 'push');

    const openDeleteRolleDialogButton: DOMWrapper<Element> | undefined = wrapper?.find(
      '[data-testid="open-rolle-delete-dialog-button"]',
    );

    expect(openDeleteRolleDialogButton?.exists()).toBe(true);
    await openDeleteRolleDialogButton!.trigger('click');
    await nextTick();
    await flushPromises();

    expect(document.body.querySelector('[data-testid="rolle-delete-confirmation-text"]')).not.toBeNull();

    const deleteButton: Element | null = document.body.querySelector('[data-testid="rolle-delete-button"]');
    expect(deleteButton).not.toBeNull();

    if (deleteButton) {
      deleteButton.dispatchEvent(new Event('click'));
    }

    await flushPromises();

    expect(deleteSpy).toHaveBeenCalled();

    const successText: Element | null = document.body.querySelector('[data-testid="rolle-delete-success-text"]');
    expect(successText).not.toBeNull();

    const closeSuccessButton: Element | null = document.body.querySelector(
      '[data-testid="close-rolle-delete-success-dialog-button"]',
    );
    expect(closeSuccessButton).not.toBeNull();

    if (closeSuccessButton) {
      closeSuccessButton.dispatchEvent(new Event('click'));
    }

    await flushPromises();

    expect(pushSpy).toHaveBeenCalledWith({ name: 'rolle-management' });
  });
});
