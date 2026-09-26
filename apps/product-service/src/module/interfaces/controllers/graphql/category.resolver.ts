import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { ListCategoriesQuery } from '../../../application/queries/category/list-categories.query';
import { GetCategoryTreeQuery } from '../../../application/queries/category/get-category-tree.query';

/**
 * GraphQL Category Resolver (placeholder)
 */
export class CategoryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  async categories(): Promise<unknown> {
    return this.queryBus.execute(new ListCategoriesQuery());
  }

  @UseGuards(JwtAuthGuard)
  async categoryTree(): Promise<unknown> {
    return this.queryBus.execute(new GetCategoryTreeQuery());
  }
}
