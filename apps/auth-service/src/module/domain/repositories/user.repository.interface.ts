import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserEntity } from '../entities/user.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';

export interface UserRepository extends BaseRepository<UserEntity, UserIdVO> {
  findByEmail(email: UserEmailVO): Promise<UserEntity | null>;
  existsByEmail(email: UserEmailVO): Promise<boolean>;
  findByRole(role: string): Promise<readonly UserEntity[]>;
  getPasswordHash(userId: UserIdVO): Promise<string | null>;
  createWithPassword(entity: UserEntity, passwordHash: string): Promise<UserEntity>;
  updatePassword(userId: UserIdVO, passwordHash: string): Promise<void>;
}
