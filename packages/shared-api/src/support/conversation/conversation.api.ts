import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { CONVERSATION_ENDPOINTS } from './conversation.endpoints';
import type {
  Conversation,
  ConversationListResponse,
  CreateConversationRequest,
} from './conversation.types';

export const conversationApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<ConversationListResponse> => {
    const res = await httpClient.get<ConversationListResponse>(CONVERSATION_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Conversation> => {
    const res = await httpClient.get<Conversation>(CONVERSATION_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  create: async (input: CreateConversationRequest, signal?: AbortSignal): Promise<Conversation> => {
    const res = await httpClient.post<Conversation>(CONVERSATION_ENDPOINTS.create, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
