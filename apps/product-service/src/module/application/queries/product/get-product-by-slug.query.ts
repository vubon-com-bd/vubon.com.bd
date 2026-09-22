import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetProductBySlugQuery extends BaseQuery {
  readonly type = 'product.get-by-slug';

  constructor(public readonly slug: string) {
    super();
  }
}
