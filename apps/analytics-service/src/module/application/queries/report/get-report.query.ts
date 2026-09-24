import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetReportQuery extends BaseQuery {
  readonly type = 'analytics.report.get';

  constructor(public readonly reportId: string) {
    super();
  }
}
