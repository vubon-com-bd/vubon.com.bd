import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthLoginAttemptsQuery } from './list-auth-login-attempts.query.js';
import type { AuthLoginAttemptResponseDTO } from '../../dtos/responses/auth-login-attempt-response.dto.js';
import type { AuthLoginAttemptServiceInterface } from '../../services/interfaces/auth-login-attempt.service.interface.js';
import { AUTH_LOGIN_ATTEMPT_SERVICE } from '../../services/interfaces/auth-login-attempt.service.interface.js';

@QueryHandler(ListAuthLoginAttemptsQuery)
export class ListAuthLoginAttemptsHandler
  extends BaseQueryHandler<ListAuthLoginAttemptsQuery, readonly AuthLoginAttemptResponseDTO[]>
  implements IQueryHandler<ListAuthLoginAttemptsQuery>
{
  readonly queryType = 'auth.list-login-attempts';
  constructor(@Inject(AUTH_LOGIN_ATTEMPT_SERVICE) private readonly service: AuthLoginAttemptServiceInterface) { super(); }

  async execute(query: ListAuthLoginAttemptsQuery): Promise<readonly AuthLoginAttemptResponseDTO[]> {
    return this.service.listRecent(query.identifier, query.windowSeconds);
  }
}
