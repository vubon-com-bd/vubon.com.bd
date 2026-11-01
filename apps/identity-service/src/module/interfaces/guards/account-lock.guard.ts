/**
 * AccountLockGuard — blocks access if account is locked
 * @module identity-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  ACCOUNT_LOCK_REPOSITORY,
  type AccountLockRepository,
} from '../../domain/repositories/account-lock.repository.interface.js';

interface LockRequest {
  user?: { userId?: string };
  params?: Record<string, string>;
}

@Injectable()
export class AccountLockGuard extends BaseGuard {
  constructor(
    @Inject(ACCOUNT_LOCK_REPOSITORY)
    private readonly lockRepo: AccountLockRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<LockRequest>();
    const userId = req.user?.userId ?? req.params?.['userId'];

    if (!userId) return true;

    const lock = await this.lockRepo.findActiveByUserId(userId);
    if (lock?.isActive()) {
      throw new ForbiddenException({
        statusCode: 423,
        message: `Account is locked until ${lock.lockedUntil}`,
      });
    }

    return true;
  }
}
