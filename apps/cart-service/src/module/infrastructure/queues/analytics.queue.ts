import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const CART_ANALYTICS_QUEUE = 'cart-analytics';

export interface AnalyticsJobPayload {
  readonly eventType: string;
  readonly cartId: string;
  readonly userId: string | null;
}

@Injectable()
export class AnalyticsQueue {
  readonly queueName = CART_ANALYTICS_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueueEvent(payload: AnalyticsJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'track-event', payload, {
      priority: QUEUE_PRIORITY.BACKGROUND,
    });
  }
}
