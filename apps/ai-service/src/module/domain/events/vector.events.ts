import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiVector';

export class VectorIndexedEvent extends BaseDomainEvent<
  'ai.vector.indexed',
  { vectorId: string }
> {
  constructor(aggregateId: string, vectorId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.vector.indexed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { vectorId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class VectorIndexRebuiltEvent extends BaseDomainEvent<
  'ai.vector.index.rebuilt',
  { indexId: string; entryCount: number }
> {
  constructor(aggregateId: string, indexId: string, entryCount: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.vector.index.rebuilt',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { indexId, entryCount },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
