// queries/webhook/index.ts
export * from './get-webhook.query.js';
export * from './get-webhook.handler.js';
export * from './list-webhooks.query.js';
export * from './list-webhooks.handler.js';
export * from './list-webhook-deliveries.query.js';
export * from './list-webhook-deliveries.handler.js';

import { GetWebhookHandler } from './get-webhook.handler.js';
import { ListWebhooksHandler } from './list-webhooks.handler.js';
import { ListWebhookDeliveriesHandler } from './list-webhook-deliveries.handler.js';

export const WEBHOOK_QUERY_HANDLERS = [
  GetWebhookHandler,
  ListWebhooksHandler,
  ListWebhookDeliveriesHandler,
] as const;
