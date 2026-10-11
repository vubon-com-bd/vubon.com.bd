// commands/webhook/index.ts
export * from './create-webhook.command.js';
export * from './create-webhook.handler.js';
export * from './update-webhook.command.js';
export * from './update-webhook.handler.js';
export * from './activate-webhook.command.js';
export * from './activate-webhook.handler.js';
export * from './deactivate-webhook.command.js';
export * from './deactivate-webhook.handler.js';
export * from './disable-webhook.command.js';
export * from './disable-webhook.handler.js';
export * from './test-webhook.command.js';
export * from './test-webhook.handler.js';
export * from './retry-webhook-delivery.command.js';
export * from './retry-webhook-delivery.handler.js';

import { CreateWebhookHandler } from './create-webhook.handler.js';
import { UpdateWebhookHandler } from './update-webhook.handler.js';
import { ActivateWebhookHandler } from './activate-webhook.handler.js';
import { DeactivateWebhookHandler } from './deactivate-webhook.handler.js';
import { DisableWebhookHandler } from './disable-webhook.handler.js';
import { TestWebhookHandler } from './test-webhook.handler.js';
import { RetryWebhookDeliveryHandler } from './retry-webhook-delivery.handler.js';

export const WEBHOOK_COMMAND_HANDLERS = [
  CreateWebhookHandler,
  UpdateWebhookHandler,
  ActivateWebhookHandler,
  DeactivateWebhookHandler,
  DisableWebhookHandler,
  TestWebhookHandler,
  RetryWebhookDeliveryHandler,
] as const;
