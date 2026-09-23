import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetReportQuery extends BaseQuery {
  readonly type = 'marketing.report.get';
  constructor(public readonly reportId: string) { super(); }
}
