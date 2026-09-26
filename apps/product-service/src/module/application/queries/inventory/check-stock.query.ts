import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class CheckStockQuery extends BaseQuery {
  readonly type = 'product.inventory.check-stock';

  constructor(
    public readonly productId: string,
    public readonly quantity: number,
  ) {
    super();
  }
}
