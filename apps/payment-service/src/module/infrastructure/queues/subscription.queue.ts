import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface SubscriptionJobPayload {
  readonly subscriptionId: string;
  readonly userId: string;
}

@Injectable()
export class SubscriptionQueue {
  readonly queueName = 'subscription';

  constructor(private readonly queueService: QueueService) {}

  async enqueueRenewal(payload: SubscriptionJobPayload): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      'renew-subscription',
      payload,
      { priority: QUEUE_PRIORITY.NORMAL },
    );
  }

  async enqueueReminder(payload: SubscriptionJobPayload): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      'subscription-reminder',
      payload,
      { priority: QUEUE_PRIORITY.LOW },
    );
  }
}
