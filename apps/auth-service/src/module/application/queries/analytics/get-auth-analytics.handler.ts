import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthAnalyticsQuery } from './get-auth-analytics.query';
import type { AuthAnalyticsResponseDTO } from '../../dtos/responses/auth-analytics-response.dto';

@QueryHandler(GetAuthAnalyticsQuery)
export class GetAuthAnalyticsHandler
  extends BaseQueryHandler<GetAuthAnalyticsQuery, AuthAnalyticsResponseDTO>
  implements IQueryHandler<GetAuthAnalyticsQuery> {
  readonly queryType = 'GetAuthAnalyticsQuery';

  async execute(
    query: GetAuthAnalyticsQuery,
  ): Promise<AuthAnalyticsResponseDTO> {
    const now = new Date();
    const from = query.from ?? new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const to = query.to ?? now.toISOString();
    // Real impl queries analytics repo (Infrastructure).
    return {
      period: query.period,
      totalLogins: 0,
      successfulLogins: 0,
      failedLogins: 0,
      uniqueUsers: 0,
      mfaChallenges: 0,
      accountLocks: 0,
      topProviders: [],
      from,
      to,
    };
  }
}
