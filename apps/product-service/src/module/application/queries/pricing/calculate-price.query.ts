import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class CalculatePriceQuery extends BaseQuery {
  readonly type = 'product.pricing.calculate';

  constructor(public readonly productId: string) {
    super();
  }
}
