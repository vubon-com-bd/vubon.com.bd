import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListFeaturedBrandsQuery extends BaseQuery {
  readonly type = 'brand.listFeatured';
  constructor(public readonly limit?: number) { super(); }
}
