import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCartSummaryQuery extends BaseQuery {
  readonly type = 'cart.get-summary';
  constructor(public readonly cartId: string) { super(); }
}
