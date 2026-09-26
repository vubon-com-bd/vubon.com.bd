import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export type AnalyticsPeriod = 'day' | 'week' | 'month' | 'year';

export class GetAuthAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.get-auth';
  constructor(
    public readonly period: AnalyticsPeriod,
    public readonly from?: string,
    public readonly to?: string,
  ) { super(); }
}
