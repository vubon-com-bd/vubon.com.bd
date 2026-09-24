import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCohortQuery } from './get-cohort.query';
import type { CohortRepository } from '../../../domain/repositories/cohort.repository.interface';
import { CohortIdVO } from '../../../domain/value-objects/primitives/cohort-id.vo';
import { CohortNotFoundError } from '../../../domain/errors/cohort.errors';
import {
  type CohortResponseDTO,
  toCohortResponse,
} from '../../dtos/responses';

@QueryHandler(GetCohortQuery)
export class GetCohortHandler
  extends BaseQueryHandler<GetCohortQuery, CohortResponseDTO>
  implements IQueryHandler<GetCohortQuery>
{
  readonly queryType = 'analytics.cohort.get';

  constructor(private readonly cohortRepo: CohortRepository) {
    super();
  }

  async execute(query: GetCohortQuery): Promise<CohortResponseDTO> {
    const entity = await this.cohortRepo.findById(CohortIdVO.create(query.cohortId));
    if (!entity) throw new CohortNotFoundError(query.cohortId);
    return toCohortResponse(entity);
  }
}
