/**
 * WebhookModule — outbound webhook management
 * @module notification-service/modules/webhook
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { WebhookController } from '../../interfaces/controllers/rest/webhook.controller.js';
import { WebhookService } from '../../application/services/impl/webhook.service.js';
import { WEBHOOK_SERVICE } from '../../application/services/interfaces/webhook.service.interface.js';
import { WEBHOOK_COMMAND_HANDLERS } from '../../application/commands/webhook/index.js';
import { WEBHOOK_QUERY_HANDLERS } from '../../application/queries/webhook/index.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [WebhookController],
  providers: [
    WebhookService,
    { provide: WEBHOOK_SERVICE, useExisting: WebhookService },
    ...WEBHOOK_COMMAND_HANDLERS,
    ...WEBHOOK_QUERY_HANDLERS,
  ],
  exports: [WebhookService, WEBHOOK_SERVICE],
})
export class WebhookModule {}
