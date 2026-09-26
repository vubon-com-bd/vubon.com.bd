import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListOrdersByCustomerQuery extends BaseQuery {
  readonly type = 'order.list-by-customer';

  constructor(public readonly customerId: string) {
    super();
  }
}
