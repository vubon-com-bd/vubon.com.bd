import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetFeaturedProductsQuery extends BaseQuery {
  readonly type = 'product.get-featured';

  constructor(public readonly limit: number = 10) {
    super();
  }
}
