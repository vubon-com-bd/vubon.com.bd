import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserSettingsEntity } from '../entities/user-settings.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface UserSettingsRepository
  extends BaseRepository<UserSettingsEntity, UserIdVO> {
  findByUserId(userId: UserIdVO): Promise<UserSettingsEntity | null>;
}
