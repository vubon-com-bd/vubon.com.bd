import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CohortEntity } from '../../../domain/entities/cohort.entity';
import type { CohortIdVO } from '../../../domain/value-objects/primitives/cohort-id.vo';
import type { CreateCohortDTO, AnalyzeCohortDTO } from '../../dtos/requests/cohort';
import type {
  CohortResponseDTO,
  CohortAnalysisResponseDTO,
} from '../../dtos/responses';

export interface CohortServiceInterface
  extends BaseServiceInterface<CohortEntity, CohortIdVO> {
  create(input: CreateCohortDTO): Promise<CohortResponseDTO>;
  analyze(input: AnalyzeCohortDTO): Promise<CohortAnalysisResponseDTO>;
}
