import { httpClient } from '../../../common/client/client.factory';
import type { QueryParams } from '../../../common/request/request.types';
import { TRANSACTION_ENDPOINTS } from './transaction.endpoints';
import type { Transaction, TransactionListResponse } from './transaction.types';

export const transactionApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<TransactionListResponse> => {
    const res = await httpClient.get<TransactionListResponse>(TRANSACTION_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Transaction> => {
    const res = await httpClient.get<Transaction>(TRANSACTION_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
