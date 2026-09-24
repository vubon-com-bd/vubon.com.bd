import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSupportSummaryQuery extends BaseQuery {
  readonly type = 'support.analytics.summary';

  constructor() {
    super();
  }
}
