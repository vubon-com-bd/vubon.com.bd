import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import {
  BUNDLE_DEAL_ENDPOINTS,
  DEAL_ENDPOINTS,
  FLASH_SALE_ENDPOINTS,
} from './flash-sales.endpoints';
import type { BundleDeal, Deal, FlashSale, ListResponse } from './flash-sales.types';

export const flashSaleApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<ListResponse<FlashSale>> => {
    const res = await httpClient.get<ListResponse<FlashSale>>(FLASH_SALE_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<FlashSale> => {
    const res = await httpClient.get<FlashSale>(FLASH_SALE_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;

export const dealApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<ListResponse<Deal>> => {
    const res = await httpClient.get<ListResponse<Deal>>(DEAL_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Deal> => {
    const res = await httpClient.get<Deal>(DEAL_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;

export const bundleDealApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<ListResponse<BundleDeal>> => {
    const res = await httpClient.get<ListResponse<BundleDeal>>(BUNDLE_DEAL_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<BundleDeal> => {
    const res = await httpClient.get<BundleDeal>(BUNDLE_DEAL_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
