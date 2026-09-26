import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListCategoriesQuery } from './list-categories.query';
import type { CategoryServiceInterface } from '../../services/interfaces/category.service.interface';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto';

@QueryHandler(ListCategoriesQuery)
export class ListCategoriesHandler
  extends BaseQueryHandler<ListCategoriesQuery, readonly CategoryResponseDTO[]>
  implements IQueryHandler<ListCategoriesQuery>
{
  readonly queryType = 'product.category.list';

  constructor(private readonly categoryService: CategoryServiceInterface) {
    super();
  }

  async execute(_query: ListCategoriesQuery): Promise<readonly CategoryResponseDTO[]> {
    return this.categoryService.list();
  }
}
