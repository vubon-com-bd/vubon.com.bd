import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetNotificationStatsQuery extends BaseQuery {
  readonly type = 'notification.stats';

  constructor(
    public readonly userId: string,
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) {
    super();
  }
}
