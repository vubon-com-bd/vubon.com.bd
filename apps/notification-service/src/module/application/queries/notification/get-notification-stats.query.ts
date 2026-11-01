import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetNotificationStatsQuery extends BaseQuery {
  readonly type = 'notification.notification.stats';
  constructor(
    public readonly userId?: string,
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) { super(); }
}
