/**
 * ListActivitiesQuery
 * @module user-service/application/queries/activity
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListActivitiesQuery extends BaseQuery {
  readonly type = 'activity.list';

  constructor(
    public readonly userId: string,
    public readonly page: number = 1,
    public readonly limit: number = 20,
    public readonly activityType?: string
  ) {
    super();
  }
}
