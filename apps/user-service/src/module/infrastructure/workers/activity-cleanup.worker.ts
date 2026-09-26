import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class ActivityCleanupWorker implements OnModuleInit {
  private readonly logger = new Logger(ActivityCleanupWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ olderThanMs: number }>(
      QUEUE_NAME.CLEANUP,
      async (payload) => {
        this.logger.log(`Activity cleanup older than ${payload.olderThanMs}ms`);
      },
    );
  }
}
