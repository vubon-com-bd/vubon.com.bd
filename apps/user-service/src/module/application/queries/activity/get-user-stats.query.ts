/**
 * GetUserStatsQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetUserStatsQuery extends BaseQuery {
  readonly type = 'activity.getUserStats';

  constructor(public readonly userId: string) {
    super();
  }
}
