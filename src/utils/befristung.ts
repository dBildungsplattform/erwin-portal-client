import { watch, type ComputedRef, type Ref } from 'vue';
import { getNextSchuljahresende } from './date';
import type { useForm } from 'vee-validate';
import { useRollen, type TranslatedRolleWithAttrs } from '@/composables/useRollen';
import { RollenMerkmal } from '@/stores/RolleStore';

export enum BefristungOption {
  SCHULJAHRESENDE = 'schuljahresende',
  UNBEFRISTET = 'unbefristet',
}

type Props = {
  selectedBefristung: Ref<string | undefined>;
  selectedBefristungOption: Ref<string | undefined>;
  calculatedBefristung: Ref<string | undefined>;
  formContext: ReturnType<typeof useForm>;
  selectedRollen: Ref<string[] | undefined>;
};

export type BefristungUtilsType = {
  handleBefristungUpdate: (value: string | undefined) => void;
  handleBefristungOptionUpdate: (value: string | undefined) => void;
  setupWatchers: () => void;
  setupRolleWatcher: () => void;
};

const rollen: ComputedRef<TranslatedRolleWithAttrs[] | undefined> = useRollen();

// Checks if the selected Rolle has Befristungspflicht
export function isBefristungspflichtRolle(selectedRolleIds: string[] | undefined): boolean {
  if (!selectedRolleIds || selectedRolleIds.length === 0) return false;

  return (
    rollen.value?.some(
      (r: TranslatedRolleWithAttrs) =>
        selectedRolleIds.includes(r.value) && r.merkmale?.has(RollenMerkmal.BefristungPflicht),
    ) || false
  );
}

/**
 * Provides utilities for managing Befristung-related state and logic.
 */
export function useBefristungUtils(props: {
  formContext: ReturnType<typeof useForm>;
  selectedBefristung: Ref<string | undefined>;
  selectedBefristungOption: Ref<string | undefined>;
  calculatedBefristung: Ref<string | undefined>;
  selectedRollen: Ref<string[] | undefined>;
}): BefristungUtilsType {
  const { selectedBefristung, selectedBefristungOption, calculatedBefristung, selectedRollen, formContext }: Props =
    props;

  const handleBefristungUpdate = (value: string | undefined): void => {
    selectedBefristung.value = value;
  };

  const handleBefristungOptionUpdate = (value: string | undefined): void => {
    calculatedBefristung.value = value;
    if (!value) {
      selectedBefristungOption.value = BefristungOption.UNBEFRISTET;
      return;
    }
    selectedBefristungOption.value = BefristungOption.SCHULJAHRESENDE;
  };

  // Function to set an initial value for the radio buttons depending on the selected Rolle
  const setupRolleWatcher = (): void => {
    watch(
      selectedRollen,
      (newValue: string[] | undefined) => {
        if (newValue) {
          if (isBefristungspflichtRolle(newValue)) {
            selectedBefristungOption.value = BefristungOption.SCHULJAHRESENDE;
            calculatedBefristung.value = getNextSchuljahresende();
          } else {
            selectedBefristungOption.value = BefristungOption.UNBEFRISTET;
            calculatedBefristung.value = undefined;
          }
        }
      },
      { immediate: true },
    );
  };

  // Setup the watchers
  const setupWatchers = (): void => {
    const createWatcher = <T>(
      watchedValue: Ref<T | undefined>,
      onValueChange: (newValue: T | undefined) => void,
    ): void => {
      watch(watchedValue, onValueChange, { immediate: true });
    };

    // Watcher for resetting radio button when a date is picked using date-input
    createWatcher(selectedBefristung, (newValue: string | undefined) => {
      if (newValue) {
        selectedBefristungOption.value = undefined;
      }
    });

    // Watcher for resetting the text input for date if a radio button was selected
    createWatcher(selectedBefristungOption, (newValue: string | undefined) => {
      if (newValue) {
        formContext.resetField('selectedBefristung');
      }
    });
  };

  return {
    handleBefristungUpdate,
    handleBefristungOptionUpdate,
    setupWatchers,
    setupRolleWatcher,
  };
}
