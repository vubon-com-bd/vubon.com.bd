import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthAnalyticsQuery } from './get-auth-analytics.query';
import type { AuthLoginAttemptRepository } from '../../../domain/repositories/auth-login-attempt.repository.interface';
import type { AuthSessionRepository } from '../../../domain/repositories/auth-session.repository.interface';

export interface AuthAnalyticsView {
  readonly totalSessions: number;
  readonly totalAttempts: number;
  readonly successRate: number;
  readonly fromDate: string | null;
  readonly toDate: string | null;
}

@QueryHandler(GetAuthAnalyticsQuery)
export class GetAuthAnalyticsHandler
  extends BaseQueryHandler<GetAuthAnalyticsQuery, AuthAnalyticsView>
  implements IQueryHandler<GetAuthAnalyticsQuery>
{
  readonly queryType = 'analytics.get-auth';

  constructor(
    @Inject('AuthLoginAttemptRepository') private readonly attemptRepo: AuthLoginAttemptRepository,
    private readonly sessionRepo: AuthSessionRepository,
  ) {
    super();
  }

  async execute(query: GetAuthAnalyticsQuery): Promise<AuthAnalyticsView> {
    void query;
    void this.attemptRepo;
    void this.sessionRepo;
    return {
      totalSessions: 0,
      totalAttempts: 0,
      successRate: 0,
      fromDate: null,
      toDate: null,
    };
  }
}
