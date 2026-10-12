import { CohortService } from '../../services/impl/cohort.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { GetCohortQuery } from './get-cohort.query.js';
import type { CohortResponseData } from '../../dtos/responses/cohort-response.dto.js';

@Injectable()
@QueryHandler(GetCohortQuery)
export class GetCohortHandler extends BaseQueryHandler<GetCohortQuery, CohortResponseData>
  implements IQueryHandler<GetCohortQuery> {
  readonly queryType = 'analytics.cohort.get';
  constructor(private readonly service: CohortService) { super(); }
  async execute(query: GetCohortQuery): Promise<CohortResponseData> {
    const result = await this.service.findById(query.cohortId);
    if (!result) throw new ApplicationNotFoundError('Cohort', query.cohortId);
    return result;
  }
}
