import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCategoryQuery extends BaseQuery {
  readonly type = 'product.category.get';
  constructor(public readonly categoryId: string) {
    super();
  }
}
