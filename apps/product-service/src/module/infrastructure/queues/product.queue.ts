import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class ProductQueue {
  readonly queueName = QUEUE_NAME.AUTH;

  constructor(private readonly queueService: QueueService) {}

  async enqueueIndex(productId: string): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'product-index', { productId }, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }
}
