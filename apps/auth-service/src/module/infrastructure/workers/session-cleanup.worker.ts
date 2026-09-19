import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class SessionCleanupWorker implements OnModuleInit {
  private readonly logger = new Logger(SessionCleanupWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ olderThanMs: number }>(
      QUEUE_NAME.SESSION,
      async (payload) => {
        this.logger.log(
          `Cleaning up sessions older than ${payload.olderThanMs}ms`,
        );
      },
    );
  }
}
