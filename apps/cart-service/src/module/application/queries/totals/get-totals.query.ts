import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetTotalsQuery extends BaseQuery {
  readonly type = 'cart.totals.get';
  constructor(public readonly cartId: string) { super(); }
}
