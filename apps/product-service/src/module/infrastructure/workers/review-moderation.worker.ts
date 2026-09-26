import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class ReviewModerationWorker implements OnModuleInit {
  private readonly logger = new Logger(ReviewModerationWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ reviewId: string }>(
      QUEUE_NAME.NOTIFICATION,
      async (payload) => {
        this.logger.log(`Moderating review: ${payload.reviewId}`);
      },
    );
  }
}
