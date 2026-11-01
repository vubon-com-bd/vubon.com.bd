/**
 * WebhookModule — outbound webhook CRUD + inbound provider webhooks
 * @module notification-service/modules/webhook
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { WebhookController } from '@interfaces/controllers/rest/webhook.controller.js';
import { WEBHOOK_COMMAND_HANDLERS } from './commands/index.js';
import { WEBHOOK_QUERY_HANDLERS } from './queries/index.js';

// ─── Provider webhook controllers ───────────
import {
  SendgridWebhookController,
  MailgunWebhookController,
  SesWebhookController,
  TwilioWebhookController,
  VonageWebhookController,
  FcmWebhookController,
  ApnsWebhookController,
} from '@interfaces/controllers/webhooks/index.js';

import { WebhookService } from '@application/services/impl/webhook.service.js';
import { WebhookDispatcherService, WEBHOOK_DISPATCHER } from '@application/services/impl/webhook-dispatcher.service.js';
import { WEBHOOK_SERVICE } from '@application/services/interfaces/webhook.service.interface.js';

import { AdminOnlyGuard } from '@interfaces/guards/admin-only.guard.js';
import { WebhookSignatureGuard } from '@interfaces/guards/webhook-signature.guard.js';

// ─── Provider webhook handlers ──────────────
import {
  HandleSendgridWebhookHandler,
  HandleTwilioWebhookHandler,
  HandleFcmWebhookHandler,
  HandleApnsWebhookHandler,
} from '@application/commands/provider-webhook/index.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [
    WebhookController,
    SendgridWebhookController,
    MailgunWebhookController,
    SesWebhookController,
    TwilioWebhookController,
    VonageWebhookController,
    FcmWebhookController,
    ApnsWebhookController,
  ],
  providers: [
    WebhookService,
    { provide: WEBHOOK_SERVICE, useExisting: WebhookService },
    WebhookDispatcherService,
    { provide: WEBHOOK_DISPATCHER, useExisting: WebhookDispatcherService },
    ...(WEBHOOK_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(WEBHOOK_QUERY_HANDLERS as readonly unknown[] as never[]),
    HandleSendgridWebhookHandler,
    HandleTwilioWebhookHandler,
    HandleFcmWebhookHandler,
    HandleApnsWebhookHandler,
    AdminOnlyGuard,
    WebhookSignatureGuard,
  ],
  exports: [
    WebhookService,
    WEBHOOK_SERVICE,
  ],
})
export class WebhookModule {}
