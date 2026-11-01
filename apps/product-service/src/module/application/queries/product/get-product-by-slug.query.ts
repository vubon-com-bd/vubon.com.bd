import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetProductBySlugQuery extends BaseQuery {
  readonly type = 'product.product.get_by_slug';
  constructor(public readonly slug: string) {
    super();
  }
}
