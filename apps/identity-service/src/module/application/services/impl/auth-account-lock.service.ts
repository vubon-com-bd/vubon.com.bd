/**
 * Auth Account Lock Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthAccountLockServiceInterface } from '../interfaces/auth-account-lock.service.interface.js';
import type { AccountLockRepository } from '../../../domain/repositories/account-lock.repository.interface.js';
import { ACCOUNT_LOCK_REPOSITORY } from '../../../domain/repositories/account-lock.repository.interface.js';
import type { AuthAccountLockResponseDTO } from '../../dtos/responses/auth-account-lock-response.dto.js';
import { AccountLockPolicyService } from '../../../domain/services/account-lock-policy.service.js';

@Injectable()
export class AuthAccountLockService extends BaseService implements AuthAccountLockServiceInterface {
  readonly name = 'AuthAccountLockService';

  constructor(
    @Inject(ACCOUNT_LOCK_REPOSITORY) private readonly repo: AccountLockRepository,
  ) {
    super();
  }

  async getStatus(authId: string): Promise<AuthAccountLockResponseDTO> {
    const lock = await this.repo.findActiveByAuthId({ value: authId } as never);
    if (!lock) {
      return { userId: authId, isLocked: false };
    }
    const remaining = Math.max(
      0,
      Math.floor((Date.parse(lock.lockedUntil) - Date.now()) / 1000),
    );
    return {
      userId: authId,
      isLocked: true,
      reason: lock.reason.value,
      lockedAt: lock.lockedAt,
      lockedUntil: lock.lockedUntil,
      remainingSeconds: remaining,
      attemptCount: lock.attemptCount,
    };
  }

  async lock(authId: string, reason: string, durationSeconds?: number): Promise<AuthAccountLockResponseDTO> {
    const duration = durationSeconds ?? AccountLockPolicyService.lockoutDurationSeconds();
    const now = new Date();
    const lockedUntil = new Date(now.getTime() + duration * 1000).toISOString();
    return {
      userId: authId,
      isLocked: true,
      reason,
      lockedAt: now.toISOString(),
      lockedUntil,
      remainingSeconds: duration,
    };
  }

  async unlock(authId: string, unlockedBy?: string): Promise<void> {
    const lock = await this.repo.findActiveByAuthId({ value: authId } as never);
    if (!lock) return;
    lock.unlock(unlockedBy);
    await this.repo.save(lock);
  }

  async isLocked(authId: string): Promise<boolean> {
    const lock = await this.repo.findActiveByAuthId({ value: authId } as never);
    return lock?.isActive() ?? false;
  }
}
