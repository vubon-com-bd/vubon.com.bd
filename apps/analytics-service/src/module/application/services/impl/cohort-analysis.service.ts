/**
 * Cohort Analysis Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import type { CohortAnalysisEntity } from '../../../domain/entities/cohort-analysis.entity.js';
import type { CohortAnalysisRepository } from '../../../domain/repositories/cohort-analysis.repository.interface.js';
import { CohortIdVO } from '../../../domain/value-objects/primitives/cohort-id.vo.js';
import type { ICohortAnalysisService } from '../interfaces/cohort-analysis.service.interface.js';

export class CohortAnalysisService extends BaseService<CohortAnalysisEntity, string> implements ICohortAnalysisService {
  readonly name = 'CohortAnalysisService';

  constructor(private readonly repository: CohortAnalysisRepository) {
    super();
  }

  async findByCohortId(cohortId: string): Promise<readonly CohortAnalysisEntity[]> {
    return this.repository.findByCohortId(CohortIdVO.create(cohortId));
  }

  async findLatestByCohort(cohortId: string): Promise<CohortAnalysisEntity | null> {
    return this.repository.findLatestByCohort(CohortIdVO.create(cohortId));
  }
}
