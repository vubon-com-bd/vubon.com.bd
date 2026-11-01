import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import { LIVE_CHAT_ENDPOINTS } from './live-chat.endpoints';
import type {
  EndLiveChatResponse,
  StartLiveChatRequest,
  StartLiveChatResponse,
} from './live-chat.types';

export const liveChatApi = {
  start: async (
    input: StartLiveChatRequest = {},
    signal?: AbortSignal
  ): Promise<StartLiveChatResponse> => {
    const res = await httpClient.post<StartLiveChatResponse>(LIVE_CHAT_ENDPOINTS.start, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  end: async (id: string, signal?: AbortSignal): Promise<EndLiveChatResponse> => {
    const res = await httpClient.post<EndLiveChatResponse>(
      LIVE_CHAT_ENDPOINTS.end(id),
      {},
      { signal, timeout: 10_000 }
    );
    return res.data;
  },
} as const;
