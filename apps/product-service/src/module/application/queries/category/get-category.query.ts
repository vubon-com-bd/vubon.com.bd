import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCategoryQuery extends BaseQuery {
  readonly type = 'product.category.get';

  constructor(public readonly categoryId: string) {
    super();
  }
}
