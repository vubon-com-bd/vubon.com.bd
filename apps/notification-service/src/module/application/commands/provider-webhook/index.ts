// commands/provider-webhook/index.ts
export * from './process-provider-webhook.command.js';
export * from './process-provider-webhook.handler.js';

import { ProcessProviderWebhookHandler } from './process-provider-webhook.handler.js';

export const PROVIDER_WEBHOOK_COMMAND_HANDLERS = [ProcessProviderWebhookHandler] as const;
