import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import { AI_VECTOR_ENDPOINTS } from './vector.endpoints';
import type {
  VectorSearchRequest,
  VectorSearchResponse,
  VectorUpsertRequest,
} from './vector.types';

export const aiVectorApi = {
  search: async (
    input: VectorSearchRequest,
    signal?: AbortSignal
  ): Promise<VectorSearchResponse> => {
    const res = await httpClient.post<VectorSearchResponse>(AI_VECTOR_ENDPOINTS.search, input, {
      signal,
      timeout: 15_000,
    });
    return res.data;
  },

  upsert: async (input: VectorUpsertRequest, signal?: AbortSignal): Promise<void> => {
    await httpClient.post<null>(AI_VECTOR_ENDPOINTS.upsert, input, {
      signal,
      timeout: 30_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
  },
} as const;
