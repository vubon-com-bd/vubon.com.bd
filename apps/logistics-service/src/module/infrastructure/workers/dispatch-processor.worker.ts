import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class DispatchProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(DispatchProcessorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ dispatchId: string; action: string }>(
      QUEUE_NAME.DISPATCH,
      async (payload) => {
        this.logger.log(`Processing dispatch ${payload.dispatchId}: ${payload.action}`);
      },
    );
  }
}
