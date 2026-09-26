import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthLoginAttemptsQuery } from './list-auth-login-attempts.query';
import type { AuthLoginAttemptRepository } from '../../../domain/repositories/auth-login-attempt.repository.interface';
import type { AuthLoginAttemptResponseDTO } from '../../dtos/responses/auth-login-attempt-response.dto';
import { AUTH_LOGIN_ATTEMPT_REPO } from '../../tokens';

@QueryHandler(ListAuthLoginAttemptsQuery)
export class ListAuthLoginAttemptsHandler
  extends BaseQueryHandler<ListAuthLoginAttemptsQuery, readonly AuthLoginAttemptResponseDTO[]>
  implements IQueryHandler<ListAuthLoginAttemptsQuery> {
  readonly queryType = 'ListAuthLoginAttemptsQuery';
  constructor(
    @Inject(AUTH_LOGIN_ATTEMPT_REPO)
    private readonly repo: AuthLoginAttemptRepository,
  ) { super(); }

  async execute(
    query: ListAuthLoginAttemptsQuery,
  ): Promise<readonly AuthLoginAttemptResponseDTO[]> {
    const rows = await this.repo.findRecentByUser(query.userId, query.limit);
    return rows.map((r) => {
      const ipVal = r.ip.value;
      const masked = ipVal.length > 6
        ? `${ipVal.slice(0, 3)}.***.***.${ipVal.slice(-2)}`
        : '***';
      return {
        id: r.id,
        userId: r.userId,
        email: r.email,
        ipMasked: masked,
        userAgent: r.userAgent,
        status: r.status.value,
        attemptedAt: new Date(r.attemptedAt).toISOString(),
      };
    });
  }
}
