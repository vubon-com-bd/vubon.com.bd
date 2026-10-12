/**
 * Cohort Analysis Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { CohortAnalysisEntity } from '../../../domain/entities/cohort-analysis.entity.js';

export interface ICohortAnalysisService extends BaseServiceInterface<CohortAnalysisEntity, string> {
  findByCohortId(cohortId: string): Promise<readonly CohortAnalysisEntity[]>;
  findLatestByCohort(cohortId: string): Promise<CohortAnalysisEntity | null>;
}
