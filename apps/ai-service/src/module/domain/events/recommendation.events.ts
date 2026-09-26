import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiRecommendation';

export class RecommendationGeneratedEvent extends BaseDomainEvent<
  'ai.recommendation.generated',
  { recommendationId: string; userId: string; count: number }
> {
  constructor(aggregateId: string, recommendationId: string, userId: string, count: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.recommendation.generated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { recommendationId, userId, count },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class RecommendationClickedEvent extends BaseDomainEvent<
  'ai.recommendation.clicked',
  { recommendationId: string; userId: string; productId: string }
> {
  constructor(aggregateId: string, recommendationId: string, userId: string, productId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.recommendation.clicked',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { recommendationId, userId, productId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
