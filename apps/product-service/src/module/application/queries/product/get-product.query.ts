import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetProductQuery extends BaseQuery {
  readonly type = 'product.get';

  constructor(public readonly productId: string) {
    super();
  }
}
