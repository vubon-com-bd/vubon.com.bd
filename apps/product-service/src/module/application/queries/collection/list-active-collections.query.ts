import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListActiveCollectionsQuery extends BaseQuery {
  readonly type = 'collection.listActive';
  constructor() {
    super();
  }
}
