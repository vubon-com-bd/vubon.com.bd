/**
 * Webhook Query Handlers Barrel
 * @module notification-service/modules/webhook/queries
 */
import { GetWebhookHandler } from '@application/queries/webhook/get-webhook.handler.js';
import { ListWebhooksHandler } from '@application/queries/webhook/list-webhooks.handler.js';

export const WEBHOOK_QUERY_HANDLERS = [
  GetWebhookHandler,
  ListWebhooksHandler,
] as const;

export { GetWebhookHandler, ListWebhooksHandler };
