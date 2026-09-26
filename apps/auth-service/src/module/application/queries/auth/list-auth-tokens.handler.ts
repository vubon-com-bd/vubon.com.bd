import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthTokensQuery } from './list-auth-tokens.query';
import type { AuthTokenRepository } from '../../../domain/repositories/auth-token.repository.interface';
import { AUTH_TOKEN_REPO } from '../../tokens';

export interface AuthTokenListDTO {
  readonly id: string;
  readonly type: string;
  readonly subjectId: string;
  readonly expiresAt: number;
  readonly revoked: boolean;
}

@QueryHandler(ListAuthTokensQuery)
export class ListAuthTokensHandler
  extends BaseQueryHandler<ListAuthTokensQuery, readonly AuthTokenListDTO[]>
  implements IQueryHandler<ListAuthTokensQuery> {
  readonly queryType = 'ListAuthTokensQuery';
  constructor(
    @Inject(AUTH_TOKEN_REPO) private readonly repo: AuthTokenRepository,
  ) { super(); }

  async execute(query: ListAuthTokensQuery): Promise<readonly AuthTokenListDTO[]> {
    const rows = await this.repo.findActiveBySubject(
      query.subjectId,
      query.tokenType ?? 'access',
      Date.now(),
    );
    return rows.map((t) => ({
      id: t.id,
      type: t.type.value,
      subjectId: t.subjectId,
      expiresAt: t.expiry.epochMs,
      revoked: t.isRevoked(),
    }));
  }
}
