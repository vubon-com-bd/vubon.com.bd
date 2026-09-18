import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserActivityEntity } from '../entities/user-activity.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface UserActivityRepository
  extends BaseRepository<UserActivityEntity, string> {
  findByUserId(userId: UserIdVO): Promise<readonly UserActivityEntity[]>;
  findRecent(userId: UserIdVO, limit: number): Promise<readonly UserActivityEntity[]>;
}
