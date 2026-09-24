import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import type { FeedbackRepository } from '../../domain/repositories/feedback.repository.interface';

@Injectable()
export class FeedbackProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(FeedbackProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly feedbackRepo: FeedbackRepository,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ feedbackId: string }>(
      QUEUE_NAME.NOTIFICATION,
      async (payload) => {
        this.logger.log(`Processing feedback: ${payload.feedbackId}`);
        const pending = await this.feedbackRepo.findPending();
        this.logger.debug(`Pending feedbacks: ${pending.length}`);
      },
    );
  }
}
