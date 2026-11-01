import { httpClient } from '../../../common/client/client.factory';
import type { QueryParams } from '../../../common/request/request.types';
import { COMMISSION_ENDPOINTS } from './commission.endpoints';
import type { CommissionListResponse } from './commission.types';

export const commissionApi = {
  listByVendor: async (
    vendorId: string,
    query?: QueryParams,
    signal?: AbortSignal
  ): Promise<CommissionListResponse> => {
    const res = await httpClient.get<CommissionListResponse>(COMMISSION_ENDPOINTS.list(vendorId), {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },
} as const;
