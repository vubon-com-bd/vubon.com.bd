import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiSearch';

export class SemanticSearchPerformedEvent extends BaseDomainEvent<
  'ai.search.performed',
  { searchId: string; query: string; resultCount: number }
> {
  constructor(aggregateId: string, searchId: string, query: string, resultCount: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.search.performed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { searchId, query, resultCount },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
