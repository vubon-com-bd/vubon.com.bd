import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListLowStockQuery extends BaseQuery {
  readonly type = 'inventory.listLowStock';
  constructor() {
    super();
  }
}
