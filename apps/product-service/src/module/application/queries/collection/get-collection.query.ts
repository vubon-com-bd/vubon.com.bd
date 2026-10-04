import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetCollectionQuery extends BaseQuery {
  readonly type = 'collection.get';
  constructor(public readonly collectionId: string) { super(); }
}
