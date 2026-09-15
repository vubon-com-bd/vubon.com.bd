import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { WAREHOUSE_ENDPOINTS } from './warehouse.endpoints';
import type { Warehouse, WarehouseListResponse } from './warehouse.types';

export const warehouseApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<WarehouseListResponse> => {
    const res = await httpClient.get<WarehouseListResponse>(WAREHOUSE_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Warehouse> => {
    const res = await httpClient.get<Warehouse>(WAREHOUSE_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
