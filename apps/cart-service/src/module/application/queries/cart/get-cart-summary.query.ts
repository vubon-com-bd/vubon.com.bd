import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCartSummaryQuery extends BaseQuery {
  readonly type = 'cart.get-summary';
  constructor(public readonly cartId: string) { super(); }
}
