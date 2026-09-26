import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const RECOMMENDATION_QUEUE_NAME = 'ai-recommendation';

export interface RecommendationJobPayload {
  readonly userId: string;
  readonly type: string;
  readonly strategy: string;
  readonly limit: number;
}

@Injectable()
export class RecommendationQueue {
  readonly name = RECOMMENDATION_QUEUE_NAME;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: RecommendationJobPayload): Promise<string> {
    return this.queueService.enqueue(this.name, 'generate', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
