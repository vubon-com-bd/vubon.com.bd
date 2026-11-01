import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCategoryTreeQuery } from './get-category-tree.query.js';
import {
  CATEGORY_SERVICE,
  type ICategoryService,
} from '../../services/interfaces/category.service.interface.js';
import type { CategoryTreeResponseDTO } from '../../dtos/responses/category-response.dto.js';

@QueryHandler(GetCategoryTreeQuery)
export class GetCategoryTreeHandler
  implements IQueryHandler<GetCategoryTreeQuery, CategoryTreeResponseDTO>
{
  constructor(
    @Inject(CATEGORY_SERVICE)
    private readonly service: ICategoryService,
  ) {}

  async execute(q: GetCategoryTreeQuery): Promise<CategoryTreeResponseDTO> {
    return this.service.getTree(q.rootId);
  }
}
