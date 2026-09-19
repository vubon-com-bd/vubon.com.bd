import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthAccountLockStatusQuery } from './get-auth-account-lock-status.query';
import type { AuthAccountLockRepository } from '../../../domain/repositories/auth-account-lock.repository.interface';
import type { AuthAccountLockResponseDTO } from '../../dtos/responses/auth-account-lock-response.dto';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@QueryHandler(GetAuthAccountLockStatusQuery)
export class GetAuthAccountLockStatusHandler
  extends BaseQueryHandler<GetAuthAccountLockStatusQuery, AuthAccountLockResponseDTO | null>
  implements IQueryHandler<GetAuthAccountLockStatusQuery>
{
  readonly queryType = 'auth.get-account-lock-status';

  constructor(private readonly lockRepo: AuthAccountLockRepository) {
    super();
  }

  async execute(query: GetAuthAccountLockStatusQuery): Promise<AuthAccountLockResponseDTO | null> {
    const entity = await this.lockRepo.findActiveByUser(UserIdVO.create(query.userId));
    if (!entity) return null;
    return {
      userId: entity.userId.value,
      reason: entity.reason.value,
      lockedUntil: new Date(entity.duration.epochMs).toISOString(),
      lockedAt: entity.lockedAt.toISOString(),
      attemptCount: 0,
    };
  }
}
