import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListOrderItemsQuery extends BaseQuery {
  readonly type = 'order.item.list';

  constructor(public readonly orderId: string) {
    super();
  }
}
