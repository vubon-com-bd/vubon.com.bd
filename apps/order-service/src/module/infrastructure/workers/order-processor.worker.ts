import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class OrderProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(OrderProcessorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ orderId: string }>(
      QUEUE_NAME.AUTH,
      async (payload) => {
        this.logger.log(`Processing order: ${payload.orderId}`);
      },
    );
  }
}
