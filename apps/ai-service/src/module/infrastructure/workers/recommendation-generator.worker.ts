import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { RECOMMENDATION_QUEUE_NAME, type RecommendationJobPayload } from '../queues/recommendation.queue';
import { RecommendationService } from '../../application/services/impl/recommendation.service';

@Injectable()
export class RecommendationGeneratorWorker implements OnModuleInit {
  private readonly logger = new Logger(RecommendationGeneratorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly recommendationService: RecommendationService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<RecommendationJobPayload>(
      RECOMMENDATION_QUEUE_NAME,
      async (payload) => {
        this.logger.log(`Recommendation for user: ${payload.userId}`);
        await this.recommendationService.generate({
          userId: payload.userId,
          type: 'personalized',
          strategy: 'hybrid',
          limit: payload.limit,
        });
      },
      5,
    );
  }
}
