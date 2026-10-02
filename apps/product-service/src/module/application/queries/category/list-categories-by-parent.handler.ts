import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListCategoriesByParentQuery } from './list-categories-by-parent.query.js';
import { CATEGORY_REPOSITORY, type CategoryRepository } from '../../../domain/repositories/category.repository.interface.js';
import { CategoryMapper } from '../../mappers/category.mapper.js';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto.js';
import { CategoryIdVO } from '../../../domain/value-objects/primitives/category-id.vo.js';

@QueryHandler(ListCategoriesByParentQuery)
export class ListCategoriesByParentHandler
  implements IQueryHandler<ListCategoriesByParentQuery, readonly CategoryResponseDTO[]>
{
  constructor(@Inject(CATEGORY_REPOSITORY) private readonly repo: CategoryRepository) {}
  async execute(q: ListCategoriesByParentQuery): Promise<readonly CategoryResponseDTO[]> {
    const items = q.parentId
      ? await this.repo.findByParentId(CategoryIdVO.create(q.parentId))
      : await this.repo.findRoots();
    return CategoryMapper.toResponseList(items);
  }
}
