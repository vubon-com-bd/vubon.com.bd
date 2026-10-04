import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetBrandBySlugQuery extends BaseQuery {
  readonly type = 'brand.getBySlug';
  constructor(public readonly slug: string) { super(); }
}
