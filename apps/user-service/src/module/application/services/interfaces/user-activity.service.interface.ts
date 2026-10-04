/**
 * UserActivityServiceInterface
 */
import type { ListActivitiesResult } from '../../queries/activity/list-activities.handler.js';
import type { UserStatsDTO } from '../../queries/activity/get-user-stats.handler.js';

export interface UserActivityServiceInterface {
  list(
    userId: string,
    page?: number,
    limit?: number,
    type?: string
  ): Promise<ListActivitiesResult>;
  getStats(userId: string): Promise<UserStatsDTO>;
}
