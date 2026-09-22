import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListCategoriesQuery extends BaseQuery {
  readonly type = 'product.category.list';

  constructor() {
    super();
  }
}
