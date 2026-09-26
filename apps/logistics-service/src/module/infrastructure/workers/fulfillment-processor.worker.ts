import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class FulfillmentProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(FulfillmentProcessorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ fulfillmentId: string; action: string }>(
      QUEUE_NAME.FULFILLMENT,
      async (payload) => {
        this.logger.log(`Processing fulfillment ${payload.fulfillmentId}: ${payload.action}`);
      },
    );
  }
}
