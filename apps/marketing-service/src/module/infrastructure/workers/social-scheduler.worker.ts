import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class SocialSchedulerWorker implements OnModuleInit {
  private readonly logger = new Logger(SocialSchedulerWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ postId: string; action: string }>(
      'marketing-social',
      async (payload) => {
        this.logger.log(`Social post ${payload.postId}: ${payload.action}`);
      },
    );
  }
}
