/**
 * QueuesWorkersModule — wires queues + workers into DI
 * @module notification-service/infrastructure
 *
 * Imports provider modules because workers depend on provider resolvers:
 *   - EmailWorker → EmailProviderResolver
 *   - SmsWorker   → SmsProviderResolver
 *   - PushWorker  → PushProviderResolver
 */
import { Global, Module } from '@nestjs/common';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';

// Queues
import { NotificationQueue } from './queues/notification.queue.js';
import { EmailQueue } from './queues/email.queue.js';
import { SmsQueue } from './queues/sms.queue.js';
import { PushQueue } from './queues/push.queue.js';
import { InAppQueue } from './queues/in-app.queue.js';
import { TemplateQueue } from './queues/template.queue.js';
import { ScheduleQueue } from './queues/schedule.queue.js';
import { BroadcastQueue } from './queues/broadcast.queue.js';
import { DigestQueue } from './queues/digest.queue.js';
import { WebhookQueue } from './queues/webhook.queue.js';
import { DeliveryQueue } from './queues/delivery.queue.js';
import { CleanupQueue } from './queues/cleanup.queue.js';

// Workers
import { NotificationDispatcherWorker } from './workers/notification-dispatcher.worker.js';
import { EmailWorker } from './workers/email.worker.js';
import { SmsWorker } from './workers/sms.worker.js';
import { PushWorker } from './workers/push.worker.js';
import { InAppWorker } from './workers/in-app.worker.js';
import { TemplateRendererWorker } from './workers/template-renderer.worker.js';
import { ScheduleTriggerWorker } from './workers/schedule-trigger.worker.js';
import { BroadcastProcessorWorker } from './workers/broadcast-processor.worker.js';
import { DigestGeneratorWorker } from './workers/digest-generator.worker.js';
import { WebhookDelivererWorker } from './workers/webhook-deliverer.worker.js';
import { DeliveryRecorderWorker } from './workers/delivery-recorder.worker.js';
import { CleanupWorker } from './workers/cleanup.worker.js';

// Dependencies
import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';
import { RedisRepositoriesModule } from './persistence/cache/redis-repositories.module.js';
import { EmailProviderModule } from './providers/email/email-provider.module.js';
import { SmsProviderModule } from './providers/sms/sms-provider.module.js';
import { PushProviderModule } from './providers/push/push-provider.module.js';

const QUEUES = [
  NotificationQueue,
  EmailQueue,
  SmsQueue,
  PushQueue,
  InAppQueue,
  TemplateQueue,
  ScheduleQueue,
  BroadcastQueue,
  DigestQueue,
  WebhookQueue,
  DeliveryQueue,
  CleanupQueue,
];

const WORKERS = [
  NotificationDispatcherWorker,
  EmailWorker,
  SmsWorker,
  PushWorker,
  InAppWorker,
  TemplateRendererWorker,
  ScheduleTriggerWorker,
  BroadcastProcessorWorker,
  DigestGeneratorWorker,
  WebhookDelivererWorker,
  DeliveryRecorderWorker,
  CleanupWorker,
];

@Global()
@Module({
  imports: [
    QueueModule,
    PrismaRepositoriesModule,
    RedisRepositoriesModule,
    EmailProviderModule,
    SmsProviderModule,
    PushProviderModule,
  ],
  providers: [...QUEUES, ...WORKERS],
  exports: [...QUEUES],
})
export class QueuesWorkersModule {}
