/**
 * AuthAccountLockService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthAccountLockServiceInterface } from '../interfaces/auth-account-lock.service.interface';
import type { AuthAccountLockRepository } from '../../../domain/repositories/auth-account-lock.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { AuthAccountLockEntity } from '../../../domain/entities/auth-account-lock.entity';
import { AccountLockReasonVO } from '../../../domain/value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../../../domain/value-objects/primitives/account-lock-duration.vo';
import type { LockAccountRequestDTO } from '../../dtos/requests/auth/lock-account.dto';
import type { UnlockAccountRequestDTO } from '../../dtos/requests/auth/unlock-account.dto';
import type { AuthAccountLockResponseDTO } from '../../dtos/responses/auth-account-lock-response.dto';
import { ID_GENERATOR } from '../tokens';
import { AUTH_ACCOUNT_LOCK_REPO } from '../../tokens';

@Injectable()
export class AuthAccountLockService
  extends BaseService<AuthAccountLockEntity, string>
  implements AuthAccountLockServiceInterface {
  readonly name = 'AuthAccountLockService';

  constructor(
    @Inject(AUTH_ACCOUNT_LOCK_REPO)
    private readonly repo: AuthAccountLockRepository,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async lock(input: LockAccountRequestDTO): Promise<AuthAccountLockEntity> {
    const now = Date.now();
    const entity = AuthAccountLockEntity.create({
      id: this.idGen.generate(),
      userId: input.userId as UserId,
      reason: AccountLockReasonVO.of(input.reason),
      lockedAt: now,
      duration: input.durationMinutes
        ? AccountLockDurationVO.ofMinutes(input.durationMinutes)
        : undefined,
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    });
    return this.repo.save(entity);
  }

  async unlock(input: UnlockAccountRequestDTO): Promise<AuthAccountLockEntity> {
    const active = await this.repo.findActiveByUser(
      input.userId as UserId,
      Date.now(),
    );
    if (!active) {
      // Return a no-op entity surrogate for API symmetry.
      throw new Error('No active lock to unlock');
    }
    active.unlock(Date.now());
    return this.repo.save(active);
  }

  async getActiveLock(
    userId: UserId,
  ): Promise<AuthAccountLockEntity | null> {
    return this.repo.findActiveByUser(userId, Date.now());
  }

  async isLocked(userId: UserId): Promise<boolean> {
    const active = await this.repo.findActiveByUser(userId, Date.now());
    return active !== null;
  }

  async autoUnlockExpired(): Promise<number> {
    const now = Date.now();
    const candidates = await this.repo.findAutoUnlockable(now);
    let count = 0;
    for (const lock of candidates) {
      if (lock.shouldAutoUnlock(now)) {
        lock.unlock(now, 'system_auto');
        await this.repo.save(lock);
        count += 1;
      }
    }
    return count;
  }

  toResponse(lock: AuthAccountLockEntity): AuthAccountLockResponseDTO {
    const now = Date.now();
    return {
      id: lock.id,
      userId: lock.userId,
      reason: lock.reason.value,
      lockedAt: new Date(lock.lockedAt).toISOString(),
      unlockAt:
        lock.duration && !lock.duration.isPermanent()
          ? new Date(lock.lockedAt + lock.duration.value).toISOString()
          : undefined,
      unlockedAt: lock.unlockedAt
        ? new Date(lock.unlockedAt).toISOString()
        : undefined,
      unlockedBy: undefined,
      isCurrentlyLocked: lock.isLocked(now),
      isPermanent: lock.isPermanent(),
    };
  }
}
