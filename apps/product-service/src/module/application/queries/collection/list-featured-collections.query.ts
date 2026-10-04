import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListFeaturedCollectionsQuery extends BaseQuery {
  readonly type = 'collection.listFeatured';
  constructor(public readonly limit?: number) { super(); }
}
