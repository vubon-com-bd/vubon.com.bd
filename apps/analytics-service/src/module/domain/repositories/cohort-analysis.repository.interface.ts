import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CohortAnalysisEntity } from '../entities/cohort-analysis.entity';
import { CohortIdVO } from '../value-objects/primitives/cohort-id.vo';

export interface CohortAnalysisRepository
  extends BaseRepository<CohortAnalysisEntity, string> {
  findByCohortId(cohortId: CohortIdVO): Promise<readonly CohortAnalysisEntity[]>;
  findLatestByCohortId(cohortId: CohortIdVO): Promise<CohortAnalysisEntity | null>;
}
