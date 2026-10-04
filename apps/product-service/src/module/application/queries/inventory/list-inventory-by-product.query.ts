import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListInventoryByProductQuery extends BaseQuery {
  readonly type = 'inventory.listByProduct';
  constructor(public readonly productId: string) { super(); }
}
