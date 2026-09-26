import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class InventoryQueue {
  readonly queueName = QUEUE_NAME.SYNC;

  constructor(private readonly queueService: QueueService) {}

  async enqueueSync(productId: string): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'inventory-sync', { productId }, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
