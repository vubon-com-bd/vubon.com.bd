/**
 * Auth 2FA Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { AuthTwoFactorEntity } from '../entities/auth-2fa.entity.js';
import type { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';

export const AUTH_2FA_REPOSITORY = Symbol('AUTH_2FA_REPOSITORY');

export interface Auth2FaRepository extends BaseRepository<AuthTwoFactorEntity, string> {
  findByAuthId(authId: AuthIdVO): Promise<AuthTwoFactorEntity | null>;
  findByAuthIdRaw(authId: string): Promise<AuthTwoFactorEntity | null>;
  findEnabledByAuthId(authId: AuthIdVO): Promise<AuthTwoFactorEntity | null>;

  // Cron support
  findLocked(): Promise<readonly AuthTwoFactorEntity[]>;
  findUnverified(olderThanHours: number): Promise<readonly AuthTwoFactorEntity[]>;

  softDelete(id: string): Promise<void>;
}
