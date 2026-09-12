import { ApiClient } from '../client/api-client';
import { WEBHOOK_ENDPOINTS } from '../endpoints/webhook.endpoints';

export const webhookApi = {
  list: (): Promise<unknown> => ApiClient.get(WEBHOOK_ENDPOINTS.LIST),
  create: (body: unknown): Promise<unknown> => ApiClient.post(WEBHOOK_ENDPOINTS.CREATE, body),
  update: (webhookId: string, body: unknown): Promise<unknown> =>
    ApiClient.put(WEBHOOK_ENDPOINTS.UPDATE(webhookId), body),
  delete: (webhookId: string): Promise<void> =>
    ApiClient.delete(WEBHOOK_ENDPOINTS.DELETE(webhookId)),
  deliveries: (webhookId: string): Promise<unknown[]> =>
    ApiClient.get(WEBHOOK_ENDPOINTS.DELIVERIES(webhookId)),
  retry: (webhookId: string, deliveryId: string): Promise<void> =>
    ApiClient.post(WEBHOOK_ENDPOINTS.RETRY(webhookId, deliveryId)),
} as const;
