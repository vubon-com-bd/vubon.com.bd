/**
 * SubscriptionQueue
 * @module payment-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { PAYMENT_QUEUE_NAME, PAYMENT_JOB_NAME } from './queue.constants.js';

export interface SubscriptionPayload {
  readonly subscriptionId: string;
}

@Injectable()
export class SubscriptionQueue {
  private readonly logger = new Logger(SubscriptionQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueRenewal(payload: SubscriptionPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.SUBSCRIPTION,
      PAYMENT_JOB_NAME.RENEW_SUBSCRIPTION,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `renew-sub:${payload.subscriptionId}`,
      },
    );
  }

  async enqueueTrialExpiry(payload: SubscriptionPayload, delayMs: number): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.SUBSCRIPTION,
      PAYMENT_JOB_NAME.EXPIRE_TRIAL,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `expire-trial:${payload.subscriptionId}`,
      },
    );
  }

  async enqueuePastDue(payload: SubscriptionPayload, delayMs: number): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.SUBSCRIPTION,
      PAYMENT_JOB_NAME.MARK_PAST_DUE,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `mark-past-due:${payload.subscriptionId}`,
      },
    );
  }
}
