/**
 * AbandonmentQueueService — enqueue abandonment & reminder jobs
 * @module cart-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueFactory } from './queue.factory.js';
import { ABANDONMENT_QUEUE, REMINDER_QUEUE, JOB_TYPES } from './queue.constants.js';

export const ABANDONMENT_QUEUE_SERVICE = Symbol('ABANDONMENT_QUEUE_SERVICE');

@Injectable()
export class AbandonmentQueueService {
  constructor(private readonly factory: QueueFactory) {}

  async enqueueDetection(cartId: string, delayMs?: number): Promise<string> {
    const job = await this.factory.get(ABANDONMENT_QUEUE).add(
      JOB_TYPES.ABANDONMENT_DETECT,
      { cartId },
      { attempts: 3, delay: delayMs },
    );
    return job.id ?? '';
  }

  async enqueueReminder(params: {
    abandonedCartId: string;
    channel: 'email' | 'sms' | 'push';
    reminderNumber: number;
    delayMs?: number;
  }): Promise<string> {
    const job = await this.factory.get(REMINDER_QUEUE).add(
      JOB_TYPES.REMINDER_SEND,
      params,
      { attempts: 3, delay: params.delayMs },
    );
    return job.id ?? '';
  }
}
