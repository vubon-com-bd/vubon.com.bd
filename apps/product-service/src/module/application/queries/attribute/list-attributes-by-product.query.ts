import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListAttributesByProductQuery extends BaseQuery {
  readonly type = 'product.attribute.list_by_product';
  constructor(public readonly productId: string) {
    super();
  }
}
