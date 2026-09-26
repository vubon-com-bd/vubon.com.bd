import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetItemQuery extends BaseQuery {
  readonly type = 'cart.item.get';
  constructor(public readonly itemId: string) { super(); }
}
