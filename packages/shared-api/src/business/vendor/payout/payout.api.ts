import { httpClient } from '../../../common/client/client.factory';
import type { QueryParams } from '../../../common/request/request.types';
import { PAYOUT_ENDPOINTS } from './payout.endpoints';
import type { PayoutListResponse } from './payout.types';

export const payoutApi = {
  listByVendor: async (
    vendorId: string,
    query?: QueryParams,
    signal?: AbortSignal
  ): Promise<PayoutListResponse> => {
    const res = await httpClient.get<PayoutListResponse>(PAYOUT_ENDPOINTS.list(vendorId), {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },
} as const;
