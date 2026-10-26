/**
 * SmsQueue — SMS channel send queue
 * @module notification-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_PRIORITY,
} from './queue.constants.js';

export interface SmsJobPayload {
  readonly notificationId: string;
  readonly to: string;
  readonly message: string;
  readonly senderId?: string;
}

@Injectable()
export class SmsQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: SmsJobPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.SMS,
      NOTIFICATION_JOB_NAME.SEND,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `sms:${payload.notificationId}`,
      },
    );
  }
}
