import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Cohort';

export class CohortCreatedEvent extends BaseDomainEvent<
  'analytics.cohort.created',
  { cohortId: string; name: string; size: number }
> {
  constructor(
    aggregateId: string,
    cohortId: string,
    name: string,
    size: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.cohort.created',
      aggregateId,
      aggregateType: AGG,
      payload: { cohortId, name, size },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class CohortAnalyzedEvent extends BaseDomainEvent<
  'analytics.cohort.analyzed',
  { cohortId: string; size: number }
> {
  constructor(
    aggregateId: string,
    cohortId: string,
    size: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.cohort.analyzed',
      aggregateId,
      aggregateType: AGG,
      payload: { cohortId, size },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
