/**
 * Cohort Analysis Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { CohortAnalysisEntity } from '../entities/cohort-analysis.entity.js';
import type { CohortIdVO } from '../value-objects/primitives/cohort-id.vo.js';
import type { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';

export interface CohortAnalysisRepository extends BaseRepository<CohortAnalysisEntity, string> {
  findByCohortId(cohortId: CohortIdVO): Promise<readonly CohortAnalysisEntity[]>;
  findLatestByCohort(cohortId: CohortIdVO): Promise<CohortAnalysisEntity | null>;
  findByCohortInRange(
    cohortId: CohortIdVO,
    range: TimeRangeVO
  ): Promise<readonly CohortAnalysisEntity[]>;
  deleteOlderThan(cutoff: string): Promise<number>;
}
