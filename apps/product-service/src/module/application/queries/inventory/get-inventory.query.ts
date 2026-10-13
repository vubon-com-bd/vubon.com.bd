import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetInventoryQuery extends BaseQuery {
  readonly type = 'product.inventory.get';
  constructor(public readonly inventoryId: string) {
    super();
  }
}
