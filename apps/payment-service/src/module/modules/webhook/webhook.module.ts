/**
 * WebhookModule — webhook feature wiring
 * @module payment-service/modules/webhook
 *
 * WebhookProcessorWorker lives here (not in QueuesWorkersModule) because
 * it depends on WebhookService — an application-layer service — and
 * pulling it into infrastructure would create a circular dependency.
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { WebhookController } from '../../interfaces/controllers/rest/webhook.controller.js';
import { WebhookService } from '../../application/services/impl/webhook.service.js';
import { WEBHOOK_SERVICE } from '../../application/services/interfaces/webhook.service.interface.js';

import { WEBHOOK_COMMAND_HANDLERS } from '../../application/commands/webhook/index.js';
import { WEBHOOK_QUERY_HANDLERS } from '../../application/queries/webhook/index.js';

import { WebhookLifecycleSaga } from '../../application/sagas/webhook-lifecycle.saga.js';
import { WebhookProcessorWorker } from '../../infrastructure/workers/webhook-processor.worker.js';
import { QueuesWorkersModule } from '../../infrastructure/queues-workers.module.js';

@Module({
  imports: [CqrsModule, QueuesWorkersModule],
  controllers: [WebhookController],
  providers: [
    WebhookService,
    { provide: WEBHOOK_SERVICE, useExisting: WebhookService },

    ...WEBHOOK_COMMAND_HANDLERS,
    ...WEBHOOK_QUERY_HANDLERS,

    WebhookLifecycleSaga,

    // Worker — depends on WebhookService; started via onModuleInit
    WebhookProcessorWorker,
  ],
  exports: [WebhookService, WEBHOOK_SERVICE],
})
export class WebhookModule {}
