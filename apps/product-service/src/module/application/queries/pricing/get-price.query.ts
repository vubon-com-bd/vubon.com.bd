import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPriceQuery extends BaseQuery {
  readonly type = 'product.pricing.get-price';

  constructor(public readonly productId: string) {
    super();
  }
}
