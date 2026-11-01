import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetFeaturedProductsQuery extends BaseQuery {
  readonly type = 'product.product.get_featured';
  constructor(public readonly limit: number = 20) {
    super();
  }
}
