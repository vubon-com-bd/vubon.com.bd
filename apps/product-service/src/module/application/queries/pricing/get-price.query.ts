import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPriceQuery extends BaseQuery {
  readonly type = 'product.pricing.get';
  constructor(public readonly productId: string) {
    super();
  }
}
