import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { MESSAGE_ENDPOINTS } from './message.endpoints';
import type { Message, MessageListResponse, SendMessageRequest } from './message.types';

export const messageApi = {
  list: async (
    conversationId: string,
    query?: QueryParams,
    signal?: AbortSignal
  ): Promise<MessageListResponse> => {
    const res = await httpClient.get<MessageListResponse>(MESSAGE_ENDPOINTS.list(conversationId), {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },

  send: async (
    conversationId: string,
    input: SendMessageRequest,
    signal?: AbortSignal
  ): Promise<Message> => {
    const res = await httpClient.post<Message>(MESSAGE_ENDPOINTS.send(conversationId), input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
