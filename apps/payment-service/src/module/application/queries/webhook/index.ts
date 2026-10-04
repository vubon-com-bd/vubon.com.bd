// application/queries/webhook/index.ts
import { GetWebhookHandler } from './get-webhook.handler.js';
import { ListWebhookEventsHandler } from './list-webhook-events.handler.js';

export * from './get-webhook.query.js';
export * from './get-webhook.handler.js';
export * from './list-webhook-events.query.js';
export * from './list-webhook-events.handler.js';

export const WEBHOOK_QUERY_HANDLERS = [
  GetWebhookHandler,
  ListWebhookEventsHandler,
] as const;
