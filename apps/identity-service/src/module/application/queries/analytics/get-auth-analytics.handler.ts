import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthAnalyticsQuery } from './get-auth-analytics.query.js';
import type { AuthRepository } from '../../../domain/repositories/auth.repository.interface.js';
import { AUTH_REPOSITORY } from '../../../domain/repositories/auth.repository.interface.js';
import type { AuthStats } from '../../../domain/repositories/auth.repository.interface.js';

@QueryHandler(GetAuthAnalyticsQuery)
export class GetAuthAnalyticsHandler
  extends BaseQueryHandler<GetAuthAnalyticsQuery, AuthStats>
  implements IQueryHandler<GetAuthAnalyticsQuery>
{
  readonly queryType = 'analytics.get-auth';
  constructor(@Inject(AUTH_REPOSITORY) private readonly repo: AuthRepository) { super(); }

  async execute(q: GetAuthAnalyticsQuery): Promise<AuthStats> {
    return this.repo.getStats(undefined, q.fromDate, q.toDate);
  }
}
