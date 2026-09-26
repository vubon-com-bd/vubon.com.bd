import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class OrderTimeoutWorker implements OnModuleInit {
  private readonly logger = new Logger(OrderTimeoutWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ orderId: string }>(
      QUEUE_NAME.AUTH,
      async (payload) => {
        this.logger.log(`Timeout check for order: ${payload.orderId}`);
      },
    );
  }
}
