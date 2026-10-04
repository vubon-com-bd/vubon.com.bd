import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListPaymentsByOrderQuery extends BaseQuery {
  readonly type = 'payment.list_by_order';
  constructor(public readonly orderId: string) {
    super();
  }
}
