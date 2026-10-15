/**
 * ReminderQueue
 * @module cart-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { CART_QUEUE_NAME, CART_JOB_NAME } from './queue.constants.js';

export type ReminderChannel = 'email' | 'sms' | 'push';

export interface SendReminderPayload {
  readonly abandonedCartId: string;
  readonly channel: ReminderChannel;
  readonly reminderNumber: number;
}

@Injectable()
export class ReminderQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueReminder(payload: SendReminderPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      CART_QUEUE_NAME.CART_REMINDER,
      CART_JOB_NAME.SEND_REMINDER,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `reminder:${payload.abandonedCartId}:${payload.reminderNumber}`,
      },
    );
  }
}
