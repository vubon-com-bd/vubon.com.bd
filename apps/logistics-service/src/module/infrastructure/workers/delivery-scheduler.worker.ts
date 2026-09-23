import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class DeliverySchedulerWorker implements OnModuleInit {
  private readonly logger = new Logger(DeliverySchedulerWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ deliveryId: string; action: string }>(
      QUEUE_NAME.DELIVERY,
      async (payload) => {
        this.logger.log(`Scheduling delivery ${payload.deliveryId}: ${payload.action}`);
      },
    );
  }
}
