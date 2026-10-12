import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetRetentionAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.retention.get';
  constructor(
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly filters?: Record<string, unknown>
  ) { super(); }
}
