/**
 * QueuesWorkersModule — queue + worker registration
 * @module notification-service/infrastructure/modules
 *
 * Provides:
 *  - 10 queue classes (NotificationQueue, BroadcastQueue, etc.) — used by
 *    internal services (RetrySchedulerInfraService, etc.) and workers.
 *  - 13 worker classes (registered with kernel QueueService).
 */
import { Module } from '@nestjs/common';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';

// ─── Queue providers ───────────────────────
import { NotificationQueue } from '@infrastructure/queues/notification.queue.js';
import { BroadcastQueue } from '@infrastructure/queues/broadcast.queue.js';
import { ScheduleQueue } from '@infrastructure/queues/schedule.queue.js';
import { DigestQueue } from '@infrastructure/queues/digest.queue.js';
import { WebhookQueue } from '@infrastructure/queues/webhook.queue.js';
import { RetryQueue } from '@infrastructure/queues/retry.queue.js';
import { EmailQueue } from '@infrastructure/queues/email.queue.js';
import { SmsQueue } from '@infrastructure/queues/sms.queue.js';
import { PushQueue } from '@infrastructure/queues/push.queue.js';
import { InAppQueue } from '@infrastructure/queues/in-app.queue.js';

// ─── Worker providers ──────────────────────
import { NotificationSenderWorker } from '@infrastructure/workers/notification-sender.worker.js';
import { EmailSenderWorker } from '@infrastructure/workers/email-sender.worker.js';
import { SmsSenderWorker } from '@infrastructure/workers/sms-sender.worker.js';
import { PushSenderWorker } from '@infrastructure/workers/push-sender.worker.js';
import { InAppSenderWorker } from '@infrastructure/workers/in-app-sender.worker.js';
import { WebhookSenderWorker } from '@infrastructure/workers/webhook-sender.worker.js';
import { ScheduleTriggerWorker } from '@infrastructure/workers/schedule-trigger.worker.js';
import { BroadcastProcessorWorker } from '@infrastructure/workers/broadcast-processor.worker.js';
import { DigestProcessorWorker } from '@infrastructure/workers/digest-processor.worker.js';
import { RetryProcessorWorker } from '@infrastructure/workers/retry-processor.worker.js';
import { BounceProcessorWorker } from '@infrastructure/workers/bounce-processor.worker.js';
import { AnalyticsProcessorWorker } from '@infrastructure/workers/analytics-processor.worker.js';
import { CleanupWorker } from '@infrastructure/workers/cleanup.worker.js';

const QUEUES = [
  NotificationQueue,
  BroadcastQueue,
  ScheduleQueue,
  DigestQueue,
  WebhookQueue,
  RetryQueue,
  EmailQueue,
  SmsQueue,
  PushQueue,
  InAppQueue,
];

const WORKERS = [
  NotificationSenderWorker,
  EmailSenderWorker,
  SmsSenderWorker,
  PushSenderWorker,
  InAppSenderWorker,
  WebhookSenderWorker,
  ScheduleTriggerWorker,
  BroadcastProcessorWorker,
  DigestProcessorWorker,
  RetryProcessorWorker,
  BounceProcessorWorker,
  AnalyticsProcessorWorker,
  CleanupWorker,
];

@Module({
  imports: [QueueModule],
  providers: [...QUEUES, ...WORKERS],
  exports: [...QUEUES, ...WORKERS],
})
export class QueuesWorkersModule {}
