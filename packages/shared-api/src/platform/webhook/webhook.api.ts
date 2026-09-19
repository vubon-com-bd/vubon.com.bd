import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { WEBHOOK_ENDPOINTS } from './webhook.endpoints';
import type {
  CreateWebhookRequest,
  UpdateWebhookRequest,
  Webhook,
  WebhookListResponse,
} from './webhook.types';

export const webhookApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<WebhookListResponse> => {
    const res = await httpClient.get<WebhookListResponse>(WEBHOOK_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Webhook> => {
    const res = await httpClient.get<Webhook>(WEBHOOK_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  create: async (input: CreateWebhookRequest, signal?: AbortSignal): Promise<Webhook> => {
    const res = await httpClient.post<Webhook>(WEBHOOK_ENDPOINTS.create, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  update: async (
    id: string,
    input: UpdateWebhookRequest,
    signal?: AbortSignal
  ): Promise<Webhook> => {
    const res = await httpClient.patch<Webhook>(WEBHOOK_ENDPOINTS.update(id), input, {
      signal,
      timeout: 15_000,
    });
    return res.data;
  },

  remove: async (id: string, signal?: AbortSignal): Promise<void> => {
    await httpClient.delete<null>(WEBHOOK_ENDPOINTS.remove(id), {
      signal,
      timeout: 10_000,
    });
  },
} as const;
