/**
 * UserActivityService
 */
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import type { UserActivityServiceInterface } from '../interfaces/user-activity.service.interface.js';
import { ListActivitiesQuery } from '../../queries/activity/list-activities.query.js';
import { GetUserStatsQuery } from '../../queries/activity/get-user-stats.query.js';
import type { ListActivitiesResult } from '../../queries/activity/list-activities.handler.js';
import type { UserStatsDTO } from '../../queries/activity/get-user-stats.handler.js';

@Injectable()
export class UserActivityService implements UserActivityServiceInterface {
  constructor(private readonly queryBus: QueryBus) {}

  list(
    userId: string,
    page = 1,
    limit = 20,
    type?: string
  ): Promise<ListActivitiesResult> {
    return this.queryBus.execute(new ListActivitiesQuery(userId, page, limit, type));
  }

  getStats(userId: string): Promise<UserStatsDTO> {
    return this.queryBus.execute(new GetUserStatsQuery(userId));
  }
}
