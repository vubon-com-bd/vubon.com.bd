import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCartByUserQuery extends BaseQuery {
  readonly type = 'cart.cart.get_by_user';

  constructor(public readonly userId: string) {
    super();
  }
}
