/**
 * SmsQueue — enqueue helpers for SMS jobs
 * @module notification-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from './queue.constants.js';

export interface SendSmsPayload {
  readonly notificationId: string;
  readonly to: string;
  readonly message: string;
  readonly senderId?: string;
  readonly provider?: string;
}

export interface SendSmsBulkPayload {
  readonly batchId: string;
  readonly recipients: readonly string[];
  readonly message: string;
  readonly senderId?: string;
}

export interface RetrySmsPayload {
  readonly notificationId: string;
  readonly attempt: number;
}

@Injectable()
export class SmsQueue {
  private readonly logger = new Logger(SmsQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueSend(payload: SendSmsPayload): Promise<string> {
    const jobId = await this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.SMS,
      NOTIFICATION_JOB_NAME.SEND_SMS,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.HIGH,
        jobId: `sms:${payload.notificationId}`,
      },
    );
    this.logger.debug(`enqueueSend sms=${payload.notificationId} to=${payload.to}`);
    return jobId;
  }

  async enqueueBulk(payload: SendSmsBulkPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.SMS,
      NOTIFICATION_JOB_NAME.SEND_SMS_BULK,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `sms:bulk:${payload.batchId}`,
      },
    );
  }

  async enqueueRetry(payload: RetrySmsPayload, delayMs: number = 30_000): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.SMS,
      NOTIFICATION_JOB_NAME.RETRY_SMS,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `sms:retry:${payload.notificationId}:${payload.attempt}`,
      },
    );
  }
}
