/**
 * Webhook Command Handlers Barrel
 * @module notification-service/modules/webhook/commands
 */
import { CreateWebhookHandler } from '@application/commands/webhook/create-webhook.handler.js';
import { UpdateWebhookHandler } from '@application/commands/webhook/update-webhook.handler.js';
import { TestWebhookHandler } from '@application/commands/webhook/test-webhook.handler.js';

export const WEBHOOK_COMMAND_HANDLERS = [
  CreateWebhookHandler,
  UpdateWebhookHandler,
  TestWebhookHandler,
] as const;

export {
  CreateWebhookHandler,
  UpdateWebhookHandler,
  TestWebhookHandler,
};
