import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetProductBySlugQuery extends BaseQuery {
  readonly type = 'product.getBySlug';
  constructor(public readonly slug: string) { super(); }
}
