import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class DeliveryTrackerWorker implements OnModuleInit {
  private readonly logger = new Logger(DeliveryTrackerWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ deliveryId: string }>(
      QUEUE_NAME.SYNC,
      async (payload) => {
        this.logger.log(`Tracking delivery: ${payload.deliveryId}`);
      },
    );
  }
}
