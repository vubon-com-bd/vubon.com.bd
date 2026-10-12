import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListFunnelsQuery extends BaseQuery {
  readonly type = 'analytics.funnel.list';

  constructor() {
    super();
  }
}
