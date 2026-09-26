import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { PRICE_SYNC_QUEUE, type PriceSyncJobPayload } from '../queues/price-sync.queue';
import { ProductClient } from '../services/external/product.client';

@Injectable()
export class StockSyncWorker implements OnModuleInit {
  private readonly logger = new Logger(StockSyncWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly productClient: ProductClient,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<PriceSyncJobPayload>(
      PRICE_SYNC_QUEUE,
      async (payload) => {
        this.logger.log(`Syncing stock for cart ${payload.cartId}`);
        void this.productClient;
      },
      3,
    );
  }
}
