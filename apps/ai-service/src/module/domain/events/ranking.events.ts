import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiRanking';

export class RankingUpdatedEvent extends BaseDomainEvent<
  'ai.ranking.updated',
  { rankingId: string; algorithm: string }
> {
  constructor(aggregateId: string, rankingId: string, algorithm: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.ranking.updated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { rankingId, algorithm },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
