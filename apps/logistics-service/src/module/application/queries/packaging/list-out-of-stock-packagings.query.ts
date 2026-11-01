import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListOutOfStockPackagingsQuery extends BaseQuery {
  readonly type = 'logistics.packaging.list_out_of_stock';
  constructor() { super(); }
}
