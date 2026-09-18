import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserPreferencesEntity } from '../entities/user-preferences.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface UserPreferencesRepository
  extends BaseRepository<UserPreferencesEntity, UserIdVO> {
  findByUserId(userId: UserIdVO): Promise<UserPreferencesEntity | null>;
}
