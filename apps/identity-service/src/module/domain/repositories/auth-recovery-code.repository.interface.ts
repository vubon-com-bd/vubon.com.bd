/**
 * Auth Recovery Code Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { AuthRecoveryCodeEntity } from '../entities/auth-recovery-code.entity.js';
import type { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';

export const AUTH_RECOVERY_CODE_REPOSITORY = Symbol('AUTH_RECOVERY_CODE_REPOSITORY');

export interface AuthRecoveryCodeRepository extends BaseRepository<AuthRecoveryCodeEntity, string> {
  findByAuthId(authId: AuthIdVO): Promise<readonly AuthRecoveryCodeEntity[]>;
  findActiveByAuthId(authId: AuthIdVO): Promise<readonly AuthRecoveryCodeEntity[]>;
  countActiveByAuthId(authId: AuthIdVO): Promise<number>;
  findByCode(authId: AuthIdVO, code: string): Promise<AuthRecoveryCodeEntity | null>;

  revokeAllByAuthId(authId: AuthIdVO): Promise<number>;
  deleteAllByAuthId(authId: AuthIdVO): Promise<number>;
  softDelete(id: string): Promise<void>;
}
