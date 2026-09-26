/**
 * UserVerificationRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { UserVerificationEntity } from '../entities/user-verification.entity';

export interface UserVerificationRepository extends BaseRepository<UserVerificationEntity, string> {
  findLatestByUserAndType(
    userId: UserId,
    type: string,
  ): Promise<UserVerificationEntity | null>;
  deleteExpired(now: number): Promise<number>;
}
