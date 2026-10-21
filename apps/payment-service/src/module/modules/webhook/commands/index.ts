/**
 * Webhook Command Handlers — Barrel
 * @module payment-service/modules/webhook/commands
 *
 * Each gateway has a dedicated handle-webhook command for gateway-specific
 * processing (signature verification, status mapping).
 */
import { HandleBkashWebhookHandler } from '@application/commands/webhook/handle-bkash-webhook.handler';
import { HandleNagadWebhookHandler } from '@application/commands/webhook/handle-nagad-webhook.handler';
import { HandleStripeWebhookHandler } from '@application/commands/webhook/handle-stripe-webhook.handler';
import { HandleSslcommerzWebhookHandler } from '@application/commands/webhook/handle-sslcommerz-webhook.handler';

export const WEBHOOK_COMMAND_HANDLERS = [
  HandleBkashWebhookHandler,
  HandleNagadWebhookHandler,
  HandleStripeWebhookHandler,
  HandleSslcommerzWebhookHandler,
] as const;
