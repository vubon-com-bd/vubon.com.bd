import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthSessionsQuery } from './list-auth-sessions.query';
import type { AuthSessionRepository } from '../../../domain/repositories/auth-session.repository.interface';
import type { AuthSessionResponseDTO } from '../../dtos/responses/auth-session-response.dto';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@QueryHandler(ListAuthSessionsQuery)
export class ListAuthSessionsHandler
  extends BaseQueryHandler<ListAuthSessionsQuery, readonly AuthSessionResponseDTO[]>
  implements IQueryHandler<ListAuthSessionsQuery>
{
  readonly queryType = 'auth.list-sessions';

  constructor(private readonly sessionRepo: AuthSessionRepository) {
    super();
  }

  async execute(query: ListAuthSessionsQuery): Promise<readonly AuthSessionResponseDTO[]> {
    const entities = await this.sessionRepo.findActiveByUser(
      UserIdVO.create(query.userId),
    );
    return entities.map((entity) => ({
      id: entity.id,
      status: entity.isActive ? 'active' : 'expired',
      ipAddress: entity.ip,
      userAgent: entity.userAgent,
      deviceId: entity.deviceId ?? undefined,
      createdAt: entity.createdAt,
      expiresAt: new Date(entity.expiry.epochMs).toISOString(),
      lastAccessedAt: entity.updatedAt,
      isCurrent: false,
    }));
  }
}
