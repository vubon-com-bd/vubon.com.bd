import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthLoginAttemptsQuery } from './list-auth-login-attempts.query';
import type { AuthLoginAttemptRepository } from '../../../domain/repositories/auth-login-attempt.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

export interface LoginAttemptView {
  readonly id: string;
  readonly status: string;
  readonly ip: string;
  readonly attemptedAt: string;
}

@QueryHandler(ListAuthLoginAttemptsQuery)
export class ListAuthLoginAttemptsHandler
  extends BaseQueryHandler<ListAuthLoginAttemptsQuery, readonly LoginAttemptView[]>
  implements IQueryHandler<ListAuthLoginAttemptsQuery>
{
  readonly queryType = 'auth.list-login-attempts';

  constructor(private readonly attemptRepo: AuthLoginAttemptRepository) {
    super();
  }

  async execute(query: ListAuthLoginAttemptsQuery): Promise<readonly LoginAttemptView[]> {
    const entities = await this.attemptRepo.findByUser(UserIdVO.create(query.userId));
    return entities.map((e) => ({
      id: e.id,
      status: e.status.value,
      ip: e.ip.value,
      attemptedAt: e.attemptedAt.toISOString(),
    }));
  }
}
