import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetUserStatsQuery extends BaseQuery {
  readonly type = 'user.activity.get-stats';

  constructor(public readonly userId: string) {
    super();
  }
}
