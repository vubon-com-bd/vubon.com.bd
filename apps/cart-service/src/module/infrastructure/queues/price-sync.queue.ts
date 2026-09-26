import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const PRICE_SYNC_QUEUE = 'price-sync';

export interface PriceSyncJobPayload {
  readonly cartId: string;
  readonly userId: string | null;
}

@Injectable()
export class PriceSyncQueue {
  readonly queueName = PRICE_SYNC_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueuePriceCheck(payload: PriceSyncJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'check-price', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }

  async enqueueStockCheck(payload: PriceSyncJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'check-stock', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
