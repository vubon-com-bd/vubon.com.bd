import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthTokensQuery } from './list-auth-tokens.query.js';
import type { TokenRepository } from '../../../domain/repositories/token.repository.interface.js';
import { TOKEN_REPOSITORY } from '../../../domain/repositories/token.repository.interface.js';

export interface AuthTokenListItem {
  readonly id: string;
  readonly type: string;
  readonly issuedAt: string;
  readonly expiresAt: number;
  readonly revoked: boolean;
}

@QueryHandler(ListAuthTokensQuery)
export class ListAuthTokensHandler
  extends BaseQueryHandler<ListAuthTokensQuery, readonly AuthTokenListItem[]>
  implements IQueryHandler<ListAuthTokensQuery>
{
  readonly queryType = 'auth.list-tokens';
  constructor(@Inject(TOKEN_REPOSITORY) private readonly repo: TokenRepository) { super(); }

  async execute(query: ListAuthTokensQuery): Promise<readonly AuthTokenListItem[]> {
    const tokens = await this.repo.findByUserId({ value: query.userId } as never);
    return tokens
      .slice(0, query.limit ?? 50)
      .map((t) => ({
        id: t.id,
        type: t.type.value,
        issuedAt: t.createdAt,
        expiresAt: t.expiry.expiresAt,
        revoked: t.isRevoked(),
      }));
  }
}
