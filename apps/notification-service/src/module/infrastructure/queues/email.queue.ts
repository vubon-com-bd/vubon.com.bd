/**
 * EmailQueue — enqueue helpers for email jobs
 * @module notification-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from './queue.constants.js';

export interface SendEmailPayload {
  readonly notificationId: string;
  readonly to: readonly string[];
  readonly subject: string;
  readonly text?: string;
  readonly html?: string;
  readonly provider?: string;
}

export interface SendEmailBulkPayload {
  readonly notificationIds: readonly string[];
  readonly batchId: string;
}

export interface RetryEmailPayload {
  readonly notificationId: string;
  readonly attempt: number;
  readonly failureReason?: string;
}

export interface TrackEmailEventPayload {
  readonly notificationId: string;
  readonly eventType: 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained';
  readonly occurredAt: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class EmailQueue {
  private readonly logger = new Logger(EmailQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueSend(payload: SendEmailPayload): Promise<string> {
    const jobId = await this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.EMAIL,
      NOTIFICATION_JOB_NAME.SEND_EMAIL,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.HIGH,
        jobId: `email:${payload.notificationId}`,
      },
    );
    this.logger.debug(`enqueueSend email=${payload.notificationId} to=${payload.to.join(',')}`);
    return jobId;
  }

  async enqueueSendBulk(payload: SendEmailBulkPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.EMAIL,
      NOTIFICATION_JOB_NAME.SEND_EMAIL_BULK,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `email:bulk:${payload.batchId}`,
      },
    );
  }

  async enqueueRetry(payload: RetryEmailPayload, delayMs: number = 60_000): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.EMAIL,
      NOTIFICATION_JOB_NAME.RETRY_EMAIL,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `email:retry:${payload.notificationId}:${payload.attempt}`,
      },
    );
  }

  async enqueueTrackEvent(payload: TrackEmailEventPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.EMAIL,
      NOTIFICATION_JOB_NAME.TRACK_EMAIL_EVENT,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.BACKGROUND,
        jobId: `email:evt:${payload.notificationId}:${payload.eventType}`,
      },
    );
  }
}
