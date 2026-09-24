import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { CohortAnalysisEntity } from '../../../domain/entities/cohort-analysis.entity';
import { CohortIdVO } from '../../../domain/value-objects/primitives/cohort-id.vo';
import type { CohortAnalysisRepository } from '../../../domain/repositories/cohort-analysis.repository.interface';
import type { CohortAnalysisServiceInterface } from '../interfaces/cohort-analysis.service.interface';

@Injectable()
export class CohortAnalysisService
  extends BaseService<CohortAnalysisEntity, string>
  implements CohortAnalysisServiceInterface
{
  readonly name = 'CohortAnalysisService';

  constructor(private readonly repo: CohortAnalysisRepository) {
    super();
  }

  async findByCohortId(cohortId: string): Promise<readonly CohortAnalysisEntity[]> {
    return this.repo.findByCohortId(CohortIdVO.create(cohortId));
  }
}
