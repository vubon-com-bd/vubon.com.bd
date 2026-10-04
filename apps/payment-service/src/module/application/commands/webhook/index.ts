// application/commands/webhook/index.ts
import { ProcessWebhookHandler } from './process-webhook.handler.js';

export * from './process-webhook.command.js';
export * from './process-webhook.handler.js';

export const WEBHOOK_COMMAND_HANDLERS = [ProcessWebhookHandler] as const;
