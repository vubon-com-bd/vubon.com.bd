import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCategoryTreeQuery extends BaseQuery {
  readonly type = 'product.category.tree';
  constructor(public readonly rootId?: string) {
    super();
  }
}
