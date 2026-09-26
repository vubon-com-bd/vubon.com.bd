/**
 * UserRepository — Contract for persisting UserEntity
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { UserEntity } from '../entities/user.entity';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';

export interface UserRepository extends BaseRepository<UserEntity, UserId> {
  findByEmail(email: UserEmailVO): Promise<UserEntity | null>;
  existsByEmail(email: UserEmailVO): Promise<boolean>;
  findByIds(ids: readonly UserId[]): Promise<readonly UserEntity[]>;
  countByStatus(status: string): Promise<number>;
}
