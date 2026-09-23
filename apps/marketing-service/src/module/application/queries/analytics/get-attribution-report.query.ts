import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAttributionReportQuery extends BaseQuery {
  readonly type = 'marketing.analytics.attribution';

  constructor(
    public readonly model: string,
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) {
    super();
  }
}
