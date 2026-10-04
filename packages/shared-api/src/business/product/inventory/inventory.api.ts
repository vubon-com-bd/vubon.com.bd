import { httpClient } from '../../../common/client/client.factory';
import type { QueryParams } from '../../../common/request/request.types';
import { INVENTORY_ENDPOINTS } from './inventory.endpoints';
import type { InventoryCheckResponse, InventoryItem } from './inventory.types';

export interface InventoryUpdateRequest {
  readonly available?: number;
  readonly reserved?: number;
}

export const inventoryApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<InventoryCheckResponse> => {
    const res = await httpClient.get<InventoryCheckResponse>(INVENTORY_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },

  detail: async (productId: string, signal?: AbortSignal): Promise<InventoryItem> => {
    const res = await httpClient.get<InventoryItem>(INVENTORY_ENDPOINTS.detail(productId), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  update: async (
    productId: string,
    input: InventoryUpdateRequest,
    signal?: AbortSignal
  ): Promise<InventoryItem> => {
    const res = await httpClient.patch<InventoryItem>(
      INVENTORY_ENDPOINTS.update(productId),
      input,
      { signal, timeout: 10_000 }
    );
    return res.data;
  },
} as const;
