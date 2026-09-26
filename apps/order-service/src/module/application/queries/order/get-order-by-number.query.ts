import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetOrderByNumberQuery extends BaseQuery {
  readonly type = 'order.get-by-number';

  constructor(public readonly orderNumber: string) {
    super();
  }
}
