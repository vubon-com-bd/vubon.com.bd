import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetConversionAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.conversion.get';
  constructor(
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly filters?: Record<string, unknown>
  ) { super(); }
}
