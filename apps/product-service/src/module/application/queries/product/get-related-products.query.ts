import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetRelatedProductsQuery extends BaseQuery {
  readonly type = 'product.get-related';

  constructor(
    public readonly productId: string,
    public readonly limit: number = 10,
  ) {
    super();
  }
}
