import { defineStore, type Store, type StoreDefinition } from 'pinia';
import axiosApiInstance from '@/services/ApiService';
import { getResponseErrorCode } from '@/utils/errorHandlers';
import { RollenMappingApiFactory, type RollenMappingApiInterface } from '../api-client/generated/api';
import type { AxiosResponse } from 'axios';

const rollenMappingApi: RollenMappingApiInterface = RollenMappingApiFactory(undefined, '', axiosApiInstance);

export type RollenMapping = {
  id: string;
  rolleId: string;
  serviceProviderId: string;
  mapToLmsRolle: string;
};

export type CreateRollenMappingBodyParams = {
  rolleId: string;
  serviceProviderId: string;
  mapToLmsRolle: string;
};

export type RollenMappingFilter = {
  limit?: number;
  offset?: number;
  searchString?: string;
};

type RollenMappingState = {
  createdRollenMapping: RollenMapping | null;
  updatedRollenMapping: RollenMapping | null;
  currentRollenMapping: RollenMapping | null;
  allRollenMappings: Array<RollenMapping>;
  errorCode: string;
  loading: boolean;
  totalRollenMappings: number;
};

type RollenMappingGetters = {};
type RollenMappingActions = {
  createRollenMapping: (body: CreateRollenMappingBodyParams) => Promise<RollenMapping>;
  deleteRollenMappingById: (rollenMappingId: string) => Promise<void>;
  getAllRollenMappings: (filter: RollenMappingFilter) => Promise<void>;
  getRollenMappingsForServiceProvider: (serviceProviderId: string, filter?: RollenMappingFilter) => Promise<void>;
  getMappingForRolleAndServiceProvider: (
    rolleId: string,
    serviceProviderId: string,
    clientName: string,
  ) => Promise<RollenMapping>;
  getRollenMappingById: (rollenMappingId: string) => Promise<RollenMapping>;
  updateRollenMapping: (rollenMappingId: string, mapToLmsRolle: string) => Promise<void>;
};

export type RollenMappingStore = Store<
  'rollenMappingStore',
  RollenMappingState,
  RollenMappingGetters,
  RollenMappingActions
>;

export const useRollenMappingStore: StoreDefinition<
  'rollenMappingStore',
  RollenMappingState,
  RollenMappingGetters,
  RollenMappingActions
> = defineStore({
  id: 'rollenMappingStore',
  state: (): RollenMappingState => ({
    createdRollenMapping: null,
    updatedRollenMapping: null,
    currentRollenMapping: null,
    allRollenMappings: [],
    errorCode: '',
    loading: false,
    totalRollenMappings: 0,
  }),
  actions: {
    async createRollenMapping(body: CreateRollenMappingBodyParams): Promise<RollenMapping> {
      this.loading = true;
      this.errorCode = '';
      try {
        const { rolleId, serviceProviderId, mapToLmsRolle }: CreateRollenMappingBodyParams = body;
        const response: AxiosResponse<object> = await rollenMappingApi.rollenMappingControllerCreateNewRollenMapping(
          serviceProviderId,
          rolleId,
          mapToLmsRolle,
        );
        const rollenMapping: RollenMapping = response.data as RollenMapping;
        this.createdRollenMapping = rollenMapping;
        this.currentRollenMapping = rollenMapping;
        return rollenMapping;
      } catch (error) {
        this.errorCode = getResponseErrorCode(error, 'ROLLENMAPPING_CREATE_ERROR');
        return await Promise.reject(this.errorCode);
      } finally {
        this.loading = false;
      }
    },

    async deleteRollenMappingById(rollenMappingId: string): Promise<void> {
      this.loading = true;
      this.errorCode = '';
      try {
        await rollenMappingApi.rollenMappingControllerDeleteExistingRollenMapping(rollenMappingId);
      } catch (error) {
        this.errorCode = getResponseErrorCode(error, 'ROLLENMAPPING_DELETE_ERROR');
      } finally {
        this.loading = false;
      }
    },

    async getAllRollenMappings(filter: RollenMappingFilter): Promise<void> {
      this.loading = true;
      this.errorCode = '';
      try {
        const response: AxiosResponse<object[]> =
          await rollenMappingApi.rollenMappingControllerGetAllAvailableRollenMapping({
            params: {
              offset: filter.offset,
              limit: filter.limit,
              searchString: filter.searchString,
            },
          });
        this.allRollenMappings = (response.data as object[]).map((item: object) => item as RollenMapping);
        const totalHeader: string | undefined = response.headers['x-paging-total'];
        this.totalRollenMappings = typeof totalHeader === 'string' ? +totalHeader : response.data.length;
      } catch (error) {
        this.errorCode = getResponseErrorCode(error, 'ROLLENMAPPING_LIST_ERROR');
      } finally {
        this.loading = false;
      }
    },

    async getRollenMappingsForServiceProvider(serviceProviderId: string, filter?: RollenMappingFilter): Promise<void> {
      this.loading = true;
      this.errorCode = '';
      try {
        const response: AxiosResponse<object[]> =
          await rollenMappingApi.rollenMappingControllerGetAvailableRollenMappingForServiceProvider(serviceProviderId, {
            params: {
              offset: filter?.offset,
              limit: filter?.limit,
              searchString: filter?.searchString,
            },
          });
        this.allRollenMappings = (response.data as Array<RollenMapping>).map((item: object) => item as RollenMapping);
        const totalHeader: string | undefined = response.headers['x-paging-total'];
        this.totalRollenMappings = typeof totalHeader === 'string' ? +totalHeader : response.data.length;
      } catch (error) {
        this.errorCode = getResponseErrorCode(error, 'ROLLENMAPPING_LIST_ERROR');
      } finally {
        this.loading = false;
      }
    },

    async getMappingForRolleAndServiceProvider(
      rolleId: string,
      serviceProviderId: string,
      clientName: string,
    ): Promise<RollenMapping> {
      this.loading = true;
      this.errorCode = '';
      try {
        const response: AxiosResponse<object> =
          await rollenMappingApi.rollenMappingControllerGetMappingForRolleAndServiceProvider(
            rolleId,
            serviceProviderId,
            clientName,
          );
        const data: Partial<RollenMapping> = response.data as Partial<RollenMapping>;
        if (!data.id || !data.rolleId || !data.serviceProviderId) {
          throw new Error('Invalid RollenMapping response: missing required properties');
        }
        const rollenMapping: RollenMapping = {
          id: data.id,
          rolleId: data.rolleId,
          serviceProviderId: data.serviceProviderId,
          ...(data as Omit<RollenMapping, 'id' | 'rolleId' | 'serviceProviderId'>),
        };
        this.currentRollenMapping = rollenMapping;
        return rollenMapping;
      } catch (error) {
        this.errorCode = getResponseErrorCode(error, 'ROLLENMAPPING_FETCH_ERROR');
        return await Promise.reject(this.errorCode);
      } finally {
        this.loading = false;
      }
    },

    async getRollenMappingById(rollenMappingId: string): Promise<RollenMapping> {
      this.loading = true;
      this.errorCode = '';
      try {
        const response: AxiosResponse<object> =
          await rollenMappingApi.rollenMappingControllerGetRollenMappingWithId(rollenMappingId);
        const data: RollenMapping = response.data as RollenMapping;
        this.currentRollenMapping = data;
        return data;
      } catch (error) {
        this.errorCode = getResponseErrorCode(error, 'ROLLENMAPPING_FETCH_ERROR');
        return await Promise.reject(this.errorCode);
      } finally {
        this.loading = false;
      }
    },

    async updateRollenMapping(rollenMappingId: string, mapToLmsRolle: string): Promise<void> {
      this.loading = true;
      this.errorCode = '';
      try {
        const response: AxiosResponse<object> =
          await rollenMappingApi.rollenMappingControllerUpdateExistingRollenMapping(rollenMappingId, mapToLmsRolle);
        const data: RollenMapping = response.data as RollenMapping;
        this.updatedRollenMapping = data;
        this.currentRollenMapping = data;
      } catch (error) {
        this.errorCode = getResponseErrorCode(error, 'ROLLENMAPPING_UPDATE_ERROR');
      } finally {
        this.loading = false;
      }
    },
  },
});
