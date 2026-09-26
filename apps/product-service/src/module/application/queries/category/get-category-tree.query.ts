import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCategoryTreeQuery extends BaseQuery {
  readonly type = 'product.category.tree';

  constructor() {
    super();
  }
}
