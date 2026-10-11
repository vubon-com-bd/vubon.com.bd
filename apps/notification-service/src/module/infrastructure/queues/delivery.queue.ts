/**
 * DeliveryQueue — enqueue helpers for delivery-attempt tracking
 * @module notification-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from './queue.constants.js';

export interface RecordDeliveryAttemptPayload {
  readonly notificationId: string;
  readonly channel: string;
  readonly provider: string;
  readonly attempt: number;
  readonly success: boolean;
  readonly providerMessageId?: string;
  readonly failureReason?: string;
  readonly failureCode?: string;
  readonly durationMs?: number;
}

export interface ScheduleDeliveryRetryPayload {
  readonly notificationId: string;
  readonly attempt: number;
  readonly delayMs: number;
}

@Injectable()
export class DeliveryQueue {
  private readonly logger = new Logger(DeliveryQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueRecordAttempt(payload: RecordDeliveryAttemptPayload): Promise<string> {
    const jobId = await this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.ANALYTICS,
      NOTIFICATION_JOB_NAME.RECORD_DELIVERY_ATTEMPT,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.BACKGROUND,
        jobId: `del:att:${payload.notificationId}:${payload.attempt}`,
      },
    );
    this.logger.debug(
      `enqueueRecordAttempt ${payload.notificationId} attempt=${payload.attempt} success=${payload.success}`,
    );
    return jobId;
  }

  async enqueueScheduleRetry(payload: ScheduleDeliveryRetryPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.SCHEDULE_DELIVERY_RETRY,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs: payload.delayMs,
        jobId: `del:retry:${payload.notificationId}:${payload.attempt}`,
      },
    );
  }
}
