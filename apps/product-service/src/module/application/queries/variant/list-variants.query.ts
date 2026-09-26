import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListVariantsQuery extends BaseQuery {
  readonly type = 'product.variant.list';

  constructor(public readonly productId: string) {
    super();
  }
}
