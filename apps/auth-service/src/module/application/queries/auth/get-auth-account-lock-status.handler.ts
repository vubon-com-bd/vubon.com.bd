import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthAccountLockStatusQuery } from './get-auth-account-lock-status.query';
import type { AuthAccountLockRepository } from '../../../domain/repositories/auth-account-lock.repository.interface';
import type { AuthAccountLockResponseDTO } from '../../dtos/responses/auth-account-lock-response.dto';
import { AUTH_ACCOUNT_LOCK_REPO } from '../../tokens';

@QueryHandler(GetAuthAccountLockStatusQuery)
export class GetAuthAccountLockStatusHandler
  extends BaseQueryHandler<GetAuthAccountLockStatusQuery, AuthAccountLockResponseDTO | null>
  implements IQueryHandler<GetAuthAccountLockStatusQuery> {
  readonly queryType = 'GetAuthAccountLockStatusQuery';
  constructor(
    @Inject(AUTH_ACCOUNT_LOCK_REPO)
    private readonly repo: AuthAccountLockRepository,
  ) { super(); }

  async execute(
    query: GetAuthAccountLockStatusQuery,
  ): Promise<AuthAccountLockResponseDTO | null> {
    const lock = await this.repo.findActiveByUser(query.userId, Date.now());
    if (!lock) return null;
    return {
      id: lock.id,
      userId: lock.userId,
      reason: lock.reason.value,
      lockedAt: new Date(lock.lockedAt).toISOString(),
      unlockAt:
        lock.duration && !lock.duration.isPermanent()
          ? new Date(lock.lockedAt + lock.duration.value).toISOString()
          : undefined,
      isCurrentlyLocked: lock.isLocked(Date.now()),
      isPermanent: lock.isPermanent(),
    };
  }
}
