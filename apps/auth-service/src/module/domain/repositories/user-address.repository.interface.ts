/**
 * UserAddressRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { UserAddressEntity } from '../entities/user-address.entity';

export interface UserAddressRepository extends BaseRepository<UserAddressEntity, string> {
  findByUserId(userId: UserId): Promise<readonly UserAddressEntity[]>;
  findDefaultByUserId(userId: UserId): Promise<UserAddressEntity | null>;
  clearDefaultForUser(userId: UserId): Promise<void>;
}
