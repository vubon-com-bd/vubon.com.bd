import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetRelatedProductsQuery extends BaseQuery {
  readonly type = 'product.product.get_related';
  constructor(
    public readonly productId: string,
    public readonly limit: number = 10,
  ) {
    super();
  }
}
