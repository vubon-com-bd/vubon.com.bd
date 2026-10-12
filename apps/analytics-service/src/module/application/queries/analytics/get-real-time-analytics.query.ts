import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetRealTimeAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.real-time.get';
  constructor(
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly filters?: Record<string, unknown>
  ) { super(); }
}
