import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CohortAnalysisEntity } from '../../../domain/entities/cohort-analysis.entity';

export interface CohortAnalysisServiceInterface
  extends BaseServiceInterface<CohortAnalysisEntity, string> {
  findByCohortId(cohortId: string): Promise<readonly CohortAnalysisEntity[]>;
}
