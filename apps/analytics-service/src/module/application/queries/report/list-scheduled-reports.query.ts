import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListScheduledReportsQuery extends BaseQuery {
  readonly type = 'analytics.report.list-scheduled';

  constructor() {
    super();
  }
}
