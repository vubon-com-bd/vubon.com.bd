/**
 * UserContactRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { UserContactEntity } from '../entities/user-contact.entity';

export interface UserContactRepository extends BaseRepository<UserContactEntity, string> {
  findByUserId(userId: UserId): Promise<readonly UserContactEntity[]>;
  findVerifiedByUserId(userId: UserId): Promise<readonly UserContactEntity[]>;
}
