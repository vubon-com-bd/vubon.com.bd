import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class UserSyncWorker implements OnModuleInit {
  private readonly logger = new Logger(UserSyncWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ userId: string }>(
      QUEUE_NAME.AUTH,
      async (payload) => {
        this.logger.log(`User sync: ${payload.userId}`);
      },
    );
  }
}
