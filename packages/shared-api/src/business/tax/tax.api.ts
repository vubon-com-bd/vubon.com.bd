import { httpClient } from '../../common/client/client.factory';
import { TAX_ENDPOINTS } from './tax.endpoints';
import type { TaxCalculateRequest, TaxCalculateResponse, TaxRate } from './tax.types';

export const taxApi = {
  calculate: async (
    input: TaxCalculateRequest,
    signal?: AbortSignal
  ): Promise<TaxCalculateResponse> => {
    const res = await httpClient.post<TaxCalculateResponse>(TAX_ENDPOINTS.calculate, input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  list: async (signal?: AbortSignal): Promise<readonly TaxRate[]> => {
    const res = await httpClient.get<readonly TaxRate[]>(TAX_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
