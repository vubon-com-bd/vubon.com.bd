import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class CourierSyncWorker implements OnModuleInit {
  private readonly logger = new Logger(CourierSyncWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ courierId: string; action: string }>(
      QUEUE_NAME.COURIER,
      async (payload) => {
        this.logger.log(`Syncing courier ${payload.courierId}: ${payload.action}`);
      },
    );
  }
}
