/**
 * AuthAccountLockRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { AuthAccountLockEntity } from '../entities/auth-account-lock.entity';

export interface AuthAccountLockRepository
  extends BaseRepository<AuthAccountLockEntity, string> {
  findActiveByUser(userId: UserId, now: number): Promise<AuthAccountLockEntity | null>;
  findAllByUser(userId: UserId): Promise<readonly AuthAccountLockEntity[]>;
  findAutoUnlockable(now: number): Promise<readonly AuthAccountLockEntity[]>;
}
