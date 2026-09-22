import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserProfileEntity } from '../entities/user-profile.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface UserProfileRepository
  extends BaseRepository<UserProfileEntity, UserIdVO> {
  findByUserId(userId: UserIdVO): Promise<UserProfileEntity | null>;
}
