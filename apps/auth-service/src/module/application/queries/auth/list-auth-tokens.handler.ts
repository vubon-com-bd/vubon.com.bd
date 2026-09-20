import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthTokensQuery } from './list-auth-tokens.query';
import type { AuthTokenRepository } from '../../../domain/repositories/auth-token.repository.interface';

@QueryHandler(ListAuthTokensQuery)
export class ListAuthTokensHandler
  extends BaseQueryHandler<ListAuthTokensQuery, readonly unknown[]>
  implements IQueryHandler<ListAuthTokensQuery>
{
  readonly queryType = 'auth.list-tokens';

  constructor(@Inject('AuthTokenRepository') private readonly tokenRepo: AuthTokenRepository) {
    super();
  }

  async execute(query: ListAuthTokensQuery): Promise<readonly unknown[]> {
    void query.userId;
    void this.tokenRepo;
    return [];
  }
}
