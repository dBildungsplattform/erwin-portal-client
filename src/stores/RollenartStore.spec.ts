import ApiService from '@/services/ApiService';
import MockAdapter from 'axios-mock-adapter';
import { createPinia, setActivePinia } from 'pinia';
import { useRollenartStore, type RollenartStore } from './RollenartStore';

const mockAdapter: MockAdapter = new MockAdapter(ApiService);

describe('RollenartStore', () => {
  let rollenartStore: RollenartStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    rollenartStore = useRollenartStore();
    mockAdapter.reset();
  });

  it('should initialize empty state', () => {
    expect(rollenartStore.rollenartList.length).toEqual(0);
  });

  describe('getAllRollenart', () => {
    it('should fetch and set rollenartList', async () => {
      const mockRollenartList: string[] = ['teacher', 'user', 'student'];
      mockAdapter.onGet('/api/rollenart').reply(200, mockRollenartList);

      const result = await rollenartStore.getAllRollenart();

      mockRollenartList.forEach((item) => {
        expect(result).toContain(item);
      });
      expect(rollenartStore.rollenartList).toEqual(mockRollenartList);
    });
  });
});
