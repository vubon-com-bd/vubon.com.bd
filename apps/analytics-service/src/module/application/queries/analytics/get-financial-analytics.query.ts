import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetFinancialAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.financial.get';
  constructor(
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly filters?: Record<string, unknown>
  ) { super(); }
}
