import { httpClient } from '../../../common/client/client.factory';
import type { QueryParams } from '../../../common/request/request.types';
import { PERFORMANCE_ENDPOINTS } from './performance.endpoints';
import type { VendorPerformance } from './performance.types';

export const performanceApi = {
  get: async (
    vendorId: string,
    query?: QueryParams,
    signal?: AbortSignal
  ): Promise<VendorPerformance> => {
    const res = await httpClient.get<VendorPerformance>(PERFORMANCE_ENDPOINTS.get(vendorId), {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },
} as const;
