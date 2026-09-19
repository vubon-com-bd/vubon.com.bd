import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class SocialSyncWorker implements OnModuleInit {
  private readonly logger = new Logger(SocialSyncWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ userId: string; provider: string }>(
      QUEUE_NAME.SYNC,
      async (payload) => {
        this.logger.log(
          `Syncing ${payload.provider} for user ${payload.userId}`,
        );
      },
    );
  }
}
