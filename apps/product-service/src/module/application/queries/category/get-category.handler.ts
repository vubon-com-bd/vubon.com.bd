import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCategoryQuery } from './get-category.query';
import type { CategoryServiceInterface } from '../../services/interfaces/category.service.interface';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto';

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler
  extends BaseQueryHandler<GetCategoryQuery, CategoryResponseDTO | null>
  implements IQueryHandler<GetCategoryQuery>
{
  readonly queryType = 'product.category.get';

  constructor(private readonly categoryService: CategoryServiceInterface) {
    super();
  }

  async execute(query: GetCategoryQuery): Promise<CategoryResponseDTO | null> {
    return this.categoryService.findById(query.categoryId);
  }
}
