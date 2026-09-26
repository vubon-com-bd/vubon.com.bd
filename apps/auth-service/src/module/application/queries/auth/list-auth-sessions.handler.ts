import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthSessionsQuery } from './list-auth-sessions.query';
import type { AuthSessionRepository } from '../../../domain/repositories/auth-session.repository.interface';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto';
import { AUTH_SESSION_REPO } from '../../tokens';

@QueryHandler(ListAuthSessionsQuery)
export class ListAuthSessionsHandler
  extends BaseQueryHandler<ListAuthSessionsQuery, readonly AuthSessionResponseDTO[]>
  implements IQueryHandler<ListAuthSessionsQuery> {
  readonly queryType = 'ListAuthSessionsQuery';
  constructor(
    @Inject(AUTH_SESSION_REPO) private readonly repo: AuthSessionRepository,
  ) { super(); }

  async execute(
    query: ListAuthSessionsQuery,
  ): Promise<readonly AuthSessionResponseDTO[]> {
    const now = Date.now();
    const sessions = await this.repo.findActiveByUser(query.userId, now);
    return sessions.map((s) => ({
      sessionId: s.id,
      userId: s.userId,
      ipAddress: s.ipAddress,
      userAgent: s.userAgent,
      deviceId: s.deviceId,
      createdAt: s.createdAt,
      expiresAt: s.expiry.toISOString(),
      revokedAt: s.revokedAt ? new Date(s.revokedAt).toISOString() : undefined,
      isActive: s.isActive(now),
    }));
  }
}
