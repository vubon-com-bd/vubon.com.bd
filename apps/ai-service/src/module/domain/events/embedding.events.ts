import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiEmbedding';

export class EmbeddingGeneratedEvent extends BaseDomainEvent<
  'ai.embedding.generated',
  { embeddingId: string; sourceId: string; dimension: number }
> {
  constructor(aggregateId: string, embeddingId: string, sourceId: string, dimension: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.embedding.generated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { embeddingId, sourceId, dimension },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class EmbeddingIndexedEvent extends BaseDomainEvent<
  'ai.embedding.indexed',
  { embeddingId: string }
> {
  constructor(aggregateId: string, embeddingId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.embedding.indexed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { embeddingId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
