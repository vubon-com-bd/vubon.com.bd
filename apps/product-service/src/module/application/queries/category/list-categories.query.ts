import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { CategoryListOptionsDTO } from '../../services/interfaces/category.service.interface.js';

export class ListCategoriesQuery extends BaseQuery {
  readonly type = 'product.category.list';
  constructor(public readonly options: CategoryListOptionsDTO) {
    super();
  }
}
