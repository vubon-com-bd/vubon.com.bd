import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const CART_QUEUE = 'cart';

export interface CartExpiryJobPayload {
  readonly cartId: string;
  readonly userId: string | null;
}

@Injectable()
export class CartQueue {
  readonly queueName = CART_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueueExpiry(payload: CartExpiryJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'expire-cart', payload, {
      priority: QUEUE_PRIORITY.LOW,
    });
  }

  async enqueueCleanup(payload: CartExpiryJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'cleanup-cart', payload, {
      priority: QUEUE_PRIORITY.BACKGROUND,
    });
  }
}
