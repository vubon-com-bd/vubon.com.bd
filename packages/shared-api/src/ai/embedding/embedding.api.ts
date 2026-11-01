import { httpClient } from '../../common/client/client.factory';
import { AI_EMBEDDING_ENDPOINTS } from './embedding.endpoints';
import type { EmbeddingCreateRequest, EmbeddingCreateResponse } from './embedding.types';

export const aiEmbeddingApi = {
  create: async (
    input: EmbeddingCreateRequest,
    signal?: AbortSignal
  ): Promise<EmbeddingCreateResponse> => {
    const res = await httpClient.post<EmbeddingCreateResponse>(
      AI_EMBEDDING_ENDPOINTS.create,
      input,
      { signal, timeout: 30_000 }
    );
    return res.data;
  },
} as const;
