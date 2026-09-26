import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class WarehouseSyncWorker implements OnModuleInit {
  private readonly logger = new Logger(WarehouseSyncWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ warehouseId: string; action: string }>(
      QUEUE_NAME.COURIER,
      async (payload) => {
        this.logger.log(`Syncing warehouse ${payload.warehouseId}`);
      },
    );
  }
}
