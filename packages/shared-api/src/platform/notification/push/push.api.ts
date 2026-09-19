import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import { PUSH_ENDPOINTS } from './push.endpoints';
import type { PushSubscribeRequest, SendPushRequest, SendPushResponse } from './push.types';

export const pushApi = {
  send: async (input: SendPushRequest, signal?: AbortSignal): Promise<SendPushResponse> => {
    const res = await httpClient.post<SendPushResponse>(PUSH_ENDPOINTS.send, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  subscribe: async (input: PushSubscribeRequest, signal?: AbortSignal): Promise<void> => {
    await httpClient.post<null>(PUSH_ENDPOINTS.subscribe, input, {
      signal,
      timeout: 10_000,
    });
  },
} as const;
