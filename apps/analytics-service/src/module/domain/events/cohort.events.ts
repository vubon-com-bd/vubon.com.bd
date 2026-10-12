/**
 * Cohort Domain Events
 * @module analytics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base';
import type { Timestamp } from '@vubon/shared-types/common';

export class CohortCreatedEvent extends BaseDomainEvent<'analytics.cohort.created', {
  readonly cohortId: string;
  readonly cohortName: string;
}> {
  constructor(cohortId: string, cohortName: string, occurredAt: string) {
    super({
      id: `cohort-created-${cohortId}-${Date.now()}`,
      type: 'analytics.cohort.created',
      aggregateId: cohortId,
      aggregateType: 'Cohort',
      payload: { cohortId, cohortName },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 1,
    });
  }
}

export class CohortAnalyzedEvent extends BaseDomainEvent<'analytics.cohort.analyzed', {
  readonly cohortId: string;
  readonly cohortSize: number;
  readonly periodCount: number;
}> {
  constructor(
    cohortId: string,
    cohortSize: number,
    periodCount: number,
    occurredAt: string
  ) {
    super({
      id: `cohort-analyzed-${cohortId}-${Date.now()}`,
      type: 'analytics.cohort.analyzed',
      aggregateId: cohortId,
      aggregateType: 'Cohort',
      payload: { cohortId, cohortSize, periodCount },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 2,
    });
  }
}
