import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthSessionQuery } from './get-auth-session.query';
import type { AuthSessionRepository } from '../../../domain/repositories/auth-session.repository.interface';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto';
import { SessionNotFoundAppError } from '../../errors/session.errors';
import { AUTH_SESSION_REPO } from '../../tokens';

@QueryHandler(GetAuthSessionQuery)
export class GetAuthSessionHandler
  extends BaseQueryHandler<GetAuthSessionQuery, AuthSessionResponseDTO>
  implements IQueryHandler<GetAuthSessionQuery> {
  readonly queryType = 'GetAuthSessionQuery';
  constructor(
    @Inject(AUTH_SESSION_REPO) private readonly repo: AuthSessionRepository,
  ) { super(); }

  async execute(query: GetAuthSessionQuery): Promise<AuthSessionResponseDTO> {
    const session = await this.repo.findById(query.sessionId);
    if (!session) throw new SessionNotFoundAppError(query.sessionId);
    const now = Date.now();
    return {
      sessionId: session.id,
      userId: session.userId,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      deviceId: session.deviceId,
      createdAt: session.createdAt,
      expiresAt: session.expiry.toISOString(),
      revokedAt: session.revokedAt
        ? new Date(session.revokedAt).toISOString()
        : undefined,
      isActive: session.isActive(now),
    };
  }
}
