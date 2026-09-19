import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class TokenCleanupWorker implements OnModuleInit {
  private readonly logger = new Logger(TokenCleanupWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ olderThanMs: number }>(
      QUEUE_NAME.TOKEN,
      async (payload) => {
        this.logger.log(
          `Cleaning up tokens older than ${payload.olderThanMs}ms`,
        );
      },
    );
  }
}
