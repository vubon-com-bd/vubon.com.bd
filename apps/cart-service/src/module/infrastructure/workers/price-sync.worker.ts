import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { PRICE_SYNC_QUEUE, type PriceSyncJobPayload } from '../queues/price-sync.queue';
import { PriceSyncService } from '../services/internal/price-sync.service';

@Injectable()
export class PriceSyncWorker implements OnModuleInit {
  private readonly logger = new Logger(PriceSyncWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly priceSync: PriceSyncService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<PriceSyncJobPayload>(
      PRICE_SYNC_QUEUE,
      async (payload) => {
        this.logger.log(`Syncing prices for cart ${payload.cartId}`);
        void this.priceSync;
      },
      3,
    );
  }
}
