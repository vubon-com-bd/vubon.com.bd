/**
 * AuthAccountLockServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthAccountLockEntity } from '../../../domain/entities/auth-account-lock.entity.js';
import type { LockAccountRequestDTO } from '../../dtos/requests/auth/lock-account.dto.js';
import type { UnlockAccountRequestDTO } from '../../dtos/requests/auth/unlock-account.dto.js';
import type { AuthAccountLockResponseDTO } from '../../dtos/responses/auth-account-lock-response.dto.js';

export interface AuthAccountLockServiceInterface
  extends BaseServiceInterface<AuthAccountLockEntity, string> {
  lock(input: LockAccountRequestDTO): Promise<AuthAccountLockEntity>;

  unlock(input: UnlockAccountRequestDTO): Promise<AuthAccountLockEntity>;

  getActiveLock(userId: UserId): Promise<AuthAccountLockEntity | null>;

  isLocked(userId: UserId): Promise<boolean>;

  autoUnlockExpired(): Promise<number>;

  toResponse(lock: AuthAccountLockEntity): AuthAccountLockResponseDTO;
}
