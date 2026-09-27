/**
 * GetUserStatsHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserStatsQuery } from './get-user-stats.query.js';
import { USER_ACTIVITY_REPOSITORY } from '@domain/repositories/user-activity.repository.interface';
import type { UserActivityRepository } from '@domain/repositories/user-activity.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';

export interface UserStatsDTO {
  readonly userId: string;
  readonly totalActivities: number;
  readonly lastActivityAt?: string;
}

@QueryHandler(GetUserStatsQuery)
export class GetUserStatsHandler
  implements IQueryHandler<GetUserStatsQuery, UserStatsDTO>
{
  constructor(
    @Inject(USER_ACTIVITY_REPOSITORY)
    private readonly activityRepo: UserActivityRepository
  ) {}

  async execute(query: GetUserStatsQuery): Promise<UserStatsDTO> {
    const userIdVO = UserIdVO.create(query.userId);
    const total = await this.activityRepo.countByUserId(userIdVO);
    const latest = await this.activityRepo.latestByUserId(userIdVO, 1);

    return {
      userId: query.userId,
      totalActivities: total,
      lastActivityAt: latest[0]?.timestamp.toISOString(),
    };
  }
}
