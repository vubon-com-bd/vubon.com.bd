import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetOrderByNumberQuery extends BaseQuery {
  readonly type = 'order.get_by_number';
  constructor(public readonly orderNumber: string) { super(); }
}
