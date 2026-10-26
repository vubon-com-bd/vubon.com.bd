import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetChannelStatsQuery extends BaseQuery {
  readonly type = 'notification.analytics.channel_stats';
  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) { super(); }
}
