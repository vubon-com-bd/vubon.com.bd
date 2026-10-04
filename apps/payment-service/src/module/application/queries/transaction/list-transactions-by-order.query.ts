import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListTransactionsByOrderQuery extends BaseQuery {
  readonly type = 'transaction.list_by_order';
  constructor(public readonly orderId: string) {
    super();
  }
}
