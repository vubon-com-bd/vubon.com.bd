import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthSessionQuery } from './get-auth-session.query';
import type { AuthSessionRepository } from '../../../domain/repositories/auth-session.repository.interface';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto';
import { SessionNotFoundError } from '../../errors/session.errors';

@QueryHandler(GetAuthSessionQuery)
export class GetAuthSessionHandler
  extends BaseQueryHandler<GetAuthSessionQuery, AuthSessionResponseDTO>
  implements IQueryHandler<GetAuthSessionQuery>
{
  readonly queryType = 'auth.get-session';

  constructor(private readonly sessionRepo: AuthSessionRepository) {
    super();
  }

  async execute(query: GetAuthSessionQuery): Promise<AuthSessionResponseDTO> {
    const entity = await this.sessionRepo.findById(query.sessionId);
    if (!entity) {
      throw new SessionNotFoundError(query.sessionId);
    }
    return {
      id: entity.id,
      status: entity.isActive ? 'active' : 'expired',
      ipAddress: entity.ip,
      userAgent: entity.userAgent,
      deviceId: entity.deviceId ?? undefined,
      createdAt: entity.createdAt,
      expiresAt: new Date(entity.expiry.epochMs).toISOString(),
      lastAccessedAt: entity.updatedAt,
      isCurrent: false,
    };
  }
}
