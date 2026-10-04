import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCartQuery extends BaseQuery {
  readonly type = 'cart.get';
  constructor(public readonly cartId: string) { super(); }
}
