import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTrackingByOrderQuery extends BaseQuery {
  readonly type = 'tracking.list-by-order';

  constructor(public readonly orderId: string) {
    super();
  }
}
