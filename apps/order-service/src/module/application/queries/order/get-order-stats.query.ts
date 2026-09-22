import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetOrderStatsQuery extends BaseQuery {
  readonly type = 'order.stats';

  constructor() {
    super();
  }
}
