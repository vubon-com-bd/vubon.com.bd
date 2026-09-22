import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class PriceSyncWorker implements OnModuleInit {
  private readonly logger = new Logger(PriceSyncWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ productId: string }>(
      QUEUE_NAME.SYNC,
      async (payload) => {
        this.logger.log(`Syncing price: ${payload.productId}`);
      },
    );
  }
}
