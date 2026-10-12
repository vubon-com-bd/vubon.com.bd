/**
 * User Verification Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserVerificationEntity } from '../entities/user-verification.entity.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const USER_VERIFICATION_REPOSITORY = Symbol('USER_VERIFICATION_REPOSITORY');

export interface UserVerificationStats {
  readonly total: number;
  readonly emailVerifiedCount: number;
  readonly phoneVerifiedCount: number;
  readonly identityVerifiedCount: number;
  readonly fullyVerifiedCount: number;
}

export interface UserVerificationRepository extends BaseRepository<UserVerificationEntity, string> {
  findByUserId(userId: UserIdVO): Promise<UserVerificationEntity | null>;
  findByUserIdRaw(userId: string): Promise<UserVerificationEntity | null>;

  getStats(): Promise<UserVerificationStats>;

  // Cron support
  findUnverifiedUsers(): Promise<readonly UserVerificationEntity[]>;

  softDelete(id: string): Promise<void>;
}
