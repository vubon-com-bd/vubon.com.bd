import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class GetAuthAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.get-auth';
  readonly queryType = 'analytics.get-auth';
  constructor(public readonly fromDate?: string, public readonly toDate?: string) { super(); }
}
