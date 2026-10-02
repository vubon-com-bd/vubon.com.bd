import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCartByUserQuery extends BaseQuery {
  readonly type = 'cart.get-by-user';
  constructor(public readonly userId: string) { super(); }
}
