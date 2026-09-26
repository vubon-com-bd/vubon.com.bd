import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class CheckoutCleanupWorker implements OnModuleInit {
  private readonly logger = new Logger(CheckoutCleanupWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ olderThanMs: number }>(
      QUEUE_NAME.CLEANUP,
      async (payload) => {
        this.logger.log(`Checkout cleanup older than ${payload.olderThanMs}ms`);
      },
    );
  }
}
