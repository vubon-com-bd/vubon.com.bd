import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetProductDetailQuery extends BaseQuery {
  readonly type = 'product.getDetail';
  constructor(public readonly productId: string) { super(); }
}
