import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCartCountQuery extends BaseQuery {
  readonly type = 'cart.get-count';
  constructor(public readonly cartId: string) { super(); }
}
