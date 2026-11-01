import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCategoryQuery } from './get-category.query.js';
import {
  CATEGORY_SERVICE,
  type ICategoryService,
} from '../../services/interfaces/category.service.interface.js';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto.js';

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler
  implements IQueryHandler<GetCategoryQuery, CategoryResponseDTO>
{
  constructor(
    @Inject(CATEGORY_SERVICE)
    private readonly service: ICategoryService,
  ) {}

  async execute(q: GetCategoryQuery): Promise<CategoryResponseDTO> {
    return this.service.getById(q.categoryId);
  }
}
