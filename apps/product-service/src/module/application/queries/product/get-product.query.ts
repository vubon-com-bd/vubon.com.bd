/**
 * GetProductQuery
 * @module product-service/application/queries/product
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetProductQuery extends BaseQuery {
  readonly type = 'product.product.get';
  constructor(public readonly productId: string) {
    super();
  }
}
