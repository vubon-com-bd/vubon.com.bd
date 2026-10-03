import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCategoryTreeQuery extends BaseQuery {
  readonly type = 'category.tree';
  constructor() {
    super();
  }
}
