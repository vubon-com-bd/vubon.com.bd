import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class ProfileCompletionWorker implements OnModuleInit {
  private readonly logger = new Logger(ProfileCompletionWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ userId: string }>(
      QUEUE_NAME.AUTH,
      async (payload) => {
        this.logger.log(`Profile completion check: ${payload.userId}`);
      },
    );
  }
}
