import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiSimilarity';

export class SimilarityComputedEvent extends BaseDomainEvent<
  'ai.similarity.computed',
  { similarityId: string; matchCount: number }
> {
  constructor(aggregateId: string, similarityId: string, matchCount: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.similarity.computed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { similarityId, matchCount },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
