import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListCohortsQuery extends BaseQuery {
  readonly type = 'analytics.cohort.list';

  constructor() {
    super();
  }
}
