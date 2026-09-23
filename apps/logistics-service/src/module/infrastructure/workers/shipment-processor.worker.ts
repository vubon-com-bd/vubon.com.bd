import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class ShipmentProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(ShipmentProcessorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ shipmentId: string; action: string }>(
      QUEUE_NAME.SHIPPING,
      async (payload) => {
        this.logger.log(`Processing shipment ${payload.shipmentId}: ${payload.action}`);
      },
    );
  }
}
