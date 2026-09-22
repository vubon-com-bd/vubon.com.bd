import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class ProductIndexerWorker implements OnModuleInit {
  private readonly logger = new Logger(ProductIndexerWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ productId: string }>(
      QUEUE_NAME.AUTH,
      async (payload) => {
        this.logger.log(`Indexing product: ${payload.productId}`);
      },
    );
  }
}
