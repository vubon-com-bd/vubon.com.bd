import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCategoryTreeQuery } from './get-category-tree.query';
import type { CategoryServiceInterface } from '../../services/interfaces/category.service.interface';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto';

@QueryHandler(GetCategoryTreeQuery)
export class GetCategoryTreeHandler
  extends BaseQueryHandler<GetCategoryTreeQuery, readonly CategoryResponseDTO[]>
  implements IQueryHandler<GetCategoryTreeQuery>
{
  readonly queryType = 'product.category.tree';

  constructor(private readonly categoryService: CategoryServiceInterface) {
    super();
  }

  async execute(_query: GetCategoryTreeQuery): Promise<readonly CategoryResponseDTO[]> {
    return this.categoryService.getTree();
  }
}
