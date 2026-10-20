/**
 * NotificationQueue
 * @module order-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from './queue.constants.js';

export interface NotificationPayload {
  readonly userId: string;
  readonly orderId: string;
  readonly template: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class NotificationQueue {
  private readonly logger = new Logger(NotificationQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: NotificationPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      ORDER_QUEUE_NAME.NOTIFICATION,
      ORDER_JOB_NAME.SEND_NOTIFICATION,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `notify:${payload.orderId}:${payload.template}`,
      },
    );
  }
}
