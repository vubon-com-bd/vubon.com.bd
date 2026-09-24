import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListScheduledReportsQuery extends BaseQuery {
  readonly type = 'analytics.report.list-scheduled';

  constructor(public readonly beforeDate: string) {
    super();
  }
}
