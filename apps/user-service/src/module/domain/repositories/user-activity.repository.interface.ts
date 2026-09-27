/**
 * UserActivity Repository Interface
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserActivityEntity } from '../entities/user-activity.entity.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { ActivityTypeVO } from '../value-objects/primitives/activity-type.vo.js';

export const USER_ACTIVITY_REPOSITORY = Symbol('USER_ACTIVITY_REPOSITORY');

export interface ActivityPaginationOptions {
  readonly page: number;
  readonly limit: number;
  readonly type?: ActivityTypeVO;
  readonly fromDate?: Date;
  readonly toDate?: Date;
}

export interface UserActivityRepository extends BaseRepository<UserActivityEntity, string> {
  findByUserId(userId: UserIdVO): Promise<readonly UserActivityEntity[]>;
  findPaginated(
    userId: UserIdVO,
    options: ActivityPaginationOptions
  ): Promise<{
    readonly items: readonly UserActivityEntity[];
    readonly total: number;
  }>;
  countByUserId(userId: UserIdVO): Promise<number>;
  latestByUserId(userId: UserIdVO, limit: number): Promise<readonly UserActivityEntity[]>;
  deleteOlderThan(date: Date): Promise<number>;
}
