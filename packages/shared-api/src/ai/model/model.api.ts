import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { AI_MODEL_ENDPOINTS } from './model.endpoints';
import type { AiInferRequest, AiInferResponse, AiModel, AiModelListResponse } from './model.types';

export const aiModelApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<AiModelListResponse> => {
    const res = await httpClient.get<AiModelListResponse>(AI_MODEL_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<AiModel> => {
    const res = await httpClient.get<AiModel>(AI_MODEL_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  /**
   * Run inference on a model.
   * Long timeout — AI inference can take 30–60s.
   */
  infer: async (
    id: string,
    input: AiInferRequest,
    signal?: AbortSignal
  ): Promise<AiInferResponse> => {
    const res = await httpClient.post<AiInferResponse>(AI_MODEL_ENDPOINTS.infer(id), input, {
      signal,
      timeout: 60_000,
    });
    return res.data;
  },
} as const;
