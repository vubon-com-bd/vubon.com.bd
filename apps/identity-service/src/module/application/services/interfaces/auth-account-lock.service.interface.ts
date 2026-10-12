/**
 * Auth Account Lock Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AccountLockEntity } from '../../../domain/entities/account-lock.entity.js';
import type { AuthAccountLockResponseDTO } from '../../dtos/responses/auth-account-lock-response.dto.js';

export const AUTH_ACCOUNT_LOCK_SERVICE = Symbol('AUTH_ACCOUNT_LOCK_SERVICE');

export interface AuthAccountLockServiceInterface extends BaseServiceInterface<AccountLockEntity, string> {
  getStatus(authId: string): Promise<AuthAccountLockResponseDTO>;
  lock(authId: string, reason: string, durationSeconds?: number): Promise<AuthAccountLockResponseDTO>;
  unlock(authId: string, unlockedBy?: string): Promise<void>;
  isLocked(authId: string): Promise<boolean>;
}
