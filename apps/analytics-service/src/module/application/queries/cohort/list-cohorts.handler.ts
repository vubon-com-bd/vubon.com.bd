import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListCohortsQuery } from './list-cohorts.query';
import type { CohortRepository } from '../../../domain/repositories/cohort.repository.interface';
import { CohortPeriodVO } from '../../../domain/value-objects/primitives/cohort-period.vo';
import {
  type CohortResponseDTO,
  toCohortResponse,
} from '../../dtos/responses';

@QueryHandler(ListCohortsQuery)
export class ListCohortsHandler
  extends BaseQueryHandler<ListCohortsQuery, readonly CohortResponseDTO[]>
  implements IQueryHandler<ListCohortsQuery>
{
  readonly queryType = 'analytics.cohort.list';

  constructor(private readonly cohortRepo: CohortRepository) {
    super();
  }

  async execute(query: ListCohortsQuery): Promise<readonly CohortResponseDTO[]> {
    const entities = query.period
      ? await this.cohortRepo.findByPeriod(CohortPeriodVO.create(query.period))
      : await this.cohortRepo.findAll();
    return entities.slice(0, query.limit).map((e) => toCohortResponse(e));
  }
}
