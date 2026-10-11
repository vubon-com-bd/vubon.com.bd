import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetChannelPerformanceQuery extends BaseQuery {
  readonly type = 'analytics.channel_performance';
  constructor(public readonly fromDate: string, public readonly toDate: string) { super(); }
}
