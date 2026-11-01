import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCartCountQuery extends BaseQuery {
  readonly type = 'cart.cart.get_count';

  constructor(public readonly userId?: string) {
    super();
  }
}
