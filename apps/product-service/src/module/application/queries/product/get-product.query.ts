import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetProductQuery extends BaseQuery {
  readonly type = 'product.get';
  constructor(public readonly productId: string) { super(); }
}
