import { CohortService } from '../../services/impl/cohort.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ListCohortsQuery } from './list-cohorts.query.js';
import type { CohortResponseData } from '../../dtos/responses/cohort-response.dto.js';

@Injectable()
@QueryHandler(ListCohortsQuery)
export class ListCohortsHandler extends BaseQueryHandler<ListCohortsQuery, readonly CohortResponseData[]>
  implements IQueryHandler<ListCohortsQuery> {
  readonly queryType = 'analytics.cohort.list';
  constructor(private readonly service: CohortService) { super(); }
  async execute(_query: ListCohortsQuery): Promise<readonly CohortResponseData[]> {
    return this.service.listActive();
  }
}
