import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class CheckStockQuery extends BaseQuery {
  readonly type = 'product.inventory.check_stock';
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
  ) {
    super();
  }
}
