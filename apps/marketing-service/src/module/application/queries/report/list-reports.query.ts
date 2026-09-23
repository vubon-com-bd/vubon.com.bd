import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListReportsQuery extends BaseQuery {
  readonly type = 'marketing.report.list';
  constructor(
    public readonly page = 1,
    public readonly limit = 20,
    public readonly reportType?: string,
  ) { super(); }
}
