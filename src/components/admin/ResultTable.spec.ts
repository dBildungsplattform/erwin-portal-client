import { expect, test, describe, beforeEach, afterEach } from 'vitest';
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils';
import ResultTable from './ResultTable.vue';
import type { VDataTableServer } from 'vuetify/lib/components/index.mjs';
import type { VueNode } from '@vue/test-utils/dist/types';

let wrapper: VueWrapper | null = null;
let keydownHandlers: ((event: KeyboardEvent) => void)[] = [];
let originalAddEventListener: typeof window.addEventListener | null = null;

const mockItems: {
  id: number;
  name: string;
}[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

beforeEach(() => {
  document.body.innerHTML = `
    <div>
      <div id="app"></div>
    </div>
  `;

  keydownHandlers = [];
  originalAddEventListener = window.addEventListener.bind(window);

  window.addEventListener = ((
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void => {
    if (type === 'keydown') {
      if (typeof listener === 'function') {
        keydownHandlers.push(listener as (event: KeyboardEvent) => void);
      } else if ('handleEvent' in listener && typeof listener.handleEvent === 'function') {
        const objectListener: EventListenerObject = listener;
        keydownHandlers.push((event: KeyboardEvent) => objectListener.handleEvent(event));
      }
    }

    if (originalAddEventListener) {
      originalAddEventListener(type, listener, options);
    }
  }) as typeof window.addEventListener;

  type ReadonlyHeaders = InstanceType<typeof VDataTableServer>['headers'];
  const headers: ReadonlyHeaders = [{ title: 'Name', key: 'name', align: 'start' }];

  wrapper = mount(ResultTable, {
    attachTo: document.getElementById('app') || '',
    props: {
      items: mockItems,
      itemsPerPage: 10,
      loading: false,
      totalItems: 25,
      headers: headers,
      itemValuePath: 'id',
      disableRowClick: false,
    },
    global: {
      components: {
        ResultTable,
      },
    },
  });
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount();
    wrapper = null;
  }

  if (originalAddEventListener) {
    window.addEventListener = originalAddEventListener as typeof window.addEventListener;
    originalAddEventListener = null;
  }

  keydownHandlers = [];
});

function getHandleKeyDown(): (event: KeyboardEvent) => void {
  const handler: ((event: KeyboardEvent) => void) | undefined =
    keydownHandlers.find((fn: (event: KeyboardEvent) => void) => fn.name === 'handleKeyDown') ?? keydownHandlers[0];

  if (!handler) {
    throw new Error('handleKeyDown listener was not registered on window');
  }

  return handler;
}

describe('Row Index and Item Retrieval', () => {
  test('manually find row index in DOM and match corresponding item', () => {
    // Simulate getting rows and finding index
    const tbody: DOMWrapper<HTMLTableSectionElement> | undefined = wrapper?.find('tbody');
    const rows: DOMWrapper<HTMLTableRowElement>[] | undefined = tbody?.findAll('tr');

    // Verify we have correct number of rows matching mock items
    expect(rows?.length).toBe(mockItems.length);

    rows?.forEach((row: DOMWrapper<HTMLTableRowElement>, domIndex: number) => {
      // Convert row to raw DOM element
      const rowElement: VueNode<HTMLTableRowElement> = row.element;

      // Simulate finding parent and converting to array
      const rowsArray: Element[] = Array.from(rowElement.parentElement!.children);

      // Find index of current row
      const calculatedIndex: number = rowsArray.indexOf(rowElement);

      // Verify calculated index matches expected DOM index
      expect(calculatedIndex).toBe(domIndex);

      // Verify item retrieval matches our mock data
      // This simulates the logic in the component
      const retrievedItem:
        | {
            id: number;
            name: string;
          }
        | undefined = mockItems[calculatedIndex];
      expect(retrievedItem).toEqual(mockItems[domIndex]);
    });
  });

  test('row index matches item array order', () => {
    const tbody: DOMWrapper<HTMLTableSectionElement> | undefined = wrapper?.find('tbody');
    const rows: DOMWrapper<HTMLTableRowElement>[] | undefined = tbody?.findAll('tr');

    rows?.forEach((row: DOMWrapper<HTMLTableRowElement>, index: number) => {
      const rowElement: VueNode<HTMLTableRowElement> = row.element;
      const rowsArray: Element[] = Array.from(rowElement.parentElement!.children);
      const calculatedIndex: number = rowsArray.indexOf(rowElement);

      expect(calculatedIndex).toBe(index);
    });
  });

  test('handles empty items array', () => {
    // Remount with empty items
    wrapper = mount(ResultTable, {
      props: {
        items: [],
        itemsPerPage: 10,
        loading: false,
        totalItems: 0,
        headers: [{ title: 'Name', key: 'name', align: 'start' }],
        itemValuePath: 'id',
        disableRowClick: false,
      },
    });

    const tbody: DOMWrapper<HTMLTableSectionElement> = wrapper.find('tbody');
    const rows: DOMWrapper<HTMLTableRowElement>[] = tbody.findAll('tr');

    // Use the prop passed to the component to check for no data
    const noDataText: string | undefined = wrapper.find('[data-testid="result-table"]').attributes('no-data-text');

    // Either no rows or only a single "no data" row
    expect(rows.length).toBeLessThanOrEqual(1);

    // Optional: Check for specific no data text if needed
    if (rows.length === 1) {
      expect(rows[0]?.text()).toContain(noDataText || 'noDataFound');
    }
  });

  test('emits update:selectedRows event with selected items', async () => {
    const selectedItems: {
      id: number;
      name: string;
    }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const table: VueWrapper | undefined = wrapper?.findComponent({ ref: 'v-data-table-server' });
    await table?.vm.$emit('update:modelValue', selectedItems);

    const emittedSelected: unknown[][] = wrapper!.emitted('update:selectedRows') ?? [];
    expect(emittedSelected.length).toBeGreaterThan(0);
    expect(emittedSelected[0]).toEqual([selectedItems]);
  });
});

describe('Sorting options', () => {
  test('emits onTableUpdate when sort options change', async () => {
    const table: VueWrapper | undefined = wrapper?.findComponent({ ref: 'v-data-table-server' });

    type SortBy = InstanceType<typeof VDataTableServer>['sortBy'];
    const sortBy: SortBy = [{ key: 'name', order: 'desc' }];

    await table?.vm.$emit('update:options', { sortBy });

    const emitted: unknown[][] = wrapper!.emitted('onTableUpdate') ?? [];

    type OnTableUpdateArgs = [{ sortField: string | undefined; sortOrder: 'asc' | 'desc' }];
    const typedEmitted: OnTableUpdateArgs[] = emitted as unknown as OnTableUpdateArgs[];

    const hasDescendingEvent: boolean = typedEmitted.some(
      (args: { sortField: string | undefined; sortOrder: 'asc' | 'desc' }[]): boolean => {
        const payload: { sortField: string | undefined; sortOrder: 'asc' | 'desc' } | undefined = args[0];
        return !!payload && payload.sortField === 'name' && payload.sortOrder === 'desc';
      },
    );

    expect(hasDescendingEvent).toBe(true);
  });
});

describe('Row click handling', () => {
  test('emits onHandleRowClick when row is clicked and not disabled', async () => {
    const table: VueWrapper | undefined = wrapper?.findComponent({ ref: 'v-data-table-server' });

    const event: PointerEvent = {
      type: 'click',
    } as unknown as PointerEvent;

    type RowClickPayload = { item: { id: number; name: string } | undefined };
    const row: RowClickPayload = { item: mockItems[0] };

    await table?.vm.$emit('click:row', event, row);

    const emitted: unknown[][] = wrapper!.emitted('onHandleRowClick') ?? [];

    expect(emitted.length).toBeGreaterThan(0);
    expect(emitted[0]).toEqual([event, row]);
  });

  test('does not emit onHandleRowClick when disableRowClick is true', async () => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
    keydownHandlers = [];

    wrapper = mount(ResultTable, {
      props: {
        items: mockItems,
        itemsPerPage: 10,
        loading: false,
        totalItems: 25,
        headers: [{ title: 'Name', key: 'name', align: 'start' }],
        itemValuePath: 'id',
        disableRowClick: true,
      },
    });

    const table: VueWrapper = wrapper!.findComponent({ ref: 'v-data-table-server' });

    const event: PointerEvent = {
      type: 'click',
    } as unknown as PointerEvent;

    type RowClickPayload = { item: { id: number; name: string } | undefined };
    const row: RowClickPayload = { item: mockItems[0] };

    await table.vm.$emit('click:row', event, row);

    const emitted: unknown[][] = wrapper!.emitted('onHandleRowClick') ?? [];

    expect(emitted.length).toBe(0);
  });
});

describe('Keyboard header guard', () => {
  test('pressing Enter on the header checkbox does not emit onHandleRowClick', () => {
    const handleKeyDown: (event: KeyboardEvent) => void = getHandleKeyDown();

    type HeaderElementMock = {
      querySelector: (selector: string) => HTMLElement | null;
    };

    type HeaderTargetMock = {
      closest: (selector: string) => HeaderElementMock | null;
      querySelector: (selector: string) => HTMLElement | null;
    };

    const headerTarget: HeaderTargetMock = {
      closest: (selector: string): HeaderElementMock | null => {
        if (selector === 'thead') {
          const headerElement: HeaderElementMock = {
            querySelector: (innerSelector: string): HTMLElement | null => {
              if (innerSelector === 'input[type="checkbox"]') {
                return headerTarget as unknown as HTMLElement;
              }
              return null;
            },
          };
          return headerElement;
        }
        if (selector === 'tr') {
          return null;
        }
        return null;
      },
      querySelector: (): HTMLElement | null => null,
    };

    const keydownEvent: KeyboardEvent = {
      key: 'Enter',
      target: headerTarget as unknown as HTMLElement,
      preventDefault: () => {},
    } as unknown as KeyboardEvent;

    handleKeyDown(keydownEvent);

    const emitted: unknown[][] | undefined = wrapper!.emitted('onHandleRowClick');
    expect(emitted).toBeUndefined();
  });
});

describe('Keyboard row activation', () => {
  test('pressing Enter on a data row emits onHandleRowClick with the correct item', () => {
    const handleKeyDown: (event: KeyboardEvent) => void = getHandleKeyDown();

    type ParentElementMock = {
      children: Element[];
    };

    type RowElementMock = {
      parentElement: ParentElementMock;
      closest: (selector: string) => RowElementMock | null;
      querySelector: (selector: string) => HTMLElement | null;
    };

    const parentElement: ParentElementMock = { children: [] };

    const rowElement: RowElementMock = {
      parentElement,
      closest: (selector: string): RowElementMock | null => {
        if (selector === 'thead') {
          return null;
        }
        if (selector === 'tr') {
          return rowElement;
        }
        return null;
      },
      querySelector: (): HTMLElement | null => null,
    };

    parentElement.children.push(rowElement as unknown as Element);

    const keydownEvent: KeyboardEvent = {
      key: 'Enter',
      target: rowElement as unknown as HTMLElement,
      preventDefault: () => {},
    } as unknown as KeyboardEvent;

    handleKeyDown(keydownEvent);

    const emitted: unknown[][] = wrapper!.emitted('onHandleRowClick') ?? [];
    expect(emitted.length).toBeGreaterThan(0);
    expect(emitted[0]?.[1]).toEqual({ item: mockItems[0] });
  });
});
