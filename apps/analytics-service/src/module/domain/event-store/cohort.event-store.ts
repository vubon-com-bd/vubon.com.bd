/**
 * Cohort Event Store Interface
 * @module analytics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base';
import type { CohortEntity } from '../entities/cohort.entity.js';

export interface CohortEventStore extends BaseEventStore {
  /** Rebuild CohortEntity from event stream */
  reconstitute(aggregateId: string): Promise<CohortEntity | null>;

  /** All analysis events for a cohort */
  loadAnalysisHistory(cohortId: string): Promise<readonly CohortEntity[]>;

  /** Purge old events */
  purge(cutoff: string): Promise<number>;
}
