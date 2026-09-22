import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListCollectionsQuery extends BaseQuery {
  readonly type = 'product.collection.list';

  constructor() {
    super();
  }
}
