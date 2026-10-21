/**
 * NotificationQueue
 * @module payment-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { PAYMENT_QUEUE_NAME, PAYMENT_JOB_NAME } from './queue.constants.js';

export interface NotificationPayload {
  readonly userId: string;
  readonly template: string;
  readonly channels?: readonly ('email' | 'sms' | 'push')[];
  readonly data?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class NotificationQueue {
  private readonly logger = new Logger(NotificationQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: NotificationPayload): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.NOTIFICATION,
      PAYMENT_JOB_NAME.SEND_NOTIFICATION,
      payload,
      {
        priority: QUEUE_PRIORITY.LOW,
        jobId: `notify:${payload.userId}:${payload.template}:${Date.now()}`,
      },
    );
  }
}
