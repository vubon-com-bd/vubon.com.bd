import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListItemsQuery extends BaseQuery {
  readonly type = 'cart.item.list';
  constructor(public readonly cartId: string) { super(); }
}
