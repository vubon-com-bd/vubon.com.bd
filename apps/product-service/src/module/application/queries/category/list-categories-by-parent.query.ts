import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListCategoriesByParentQuery extends BaseQuery {
  readonly type = 'category.listByParent';
  constructor(public readonly parentId?: string) {
    super();
  }
}
