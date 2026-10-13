import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListCategoriesQuery } from './list-categories.query.js';
import {
  CATEGORY_SERVICE,
  type ICategoryService,
} from '../../services/interfaces/category.service.interface.js';
import type { CategoryListResponseDTO } from '../../dtos/responses/category-response.dto.js';

@QueryHandler(ListCategoriesQuery)
export class ListCategoriesHandler
  implements IQueryHandler<ListCategoriesQuery, CategoryListResponseDTO>
{
  constructor(
    @Inject(CATEGORY_SERVICE)
    private readonly service: ICategoryService,
  ) {}

  async execute(q: ListCategoriesQuery): Promise<CategoryListResponseDTO> {
    return this.service.list(q.options);
  }
}
