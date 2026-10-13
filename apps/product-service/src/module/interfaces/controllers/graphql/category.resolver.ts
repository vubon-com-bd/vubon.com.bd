/**
 * CategoryResolver — GraphQL endpoints
 * @module product-service/interfaces/controllers/graphql
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject, Logger, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import {
  CATEGORY_SERVICE,
  type ICategoryService,
} from '../../../application/services/interfaces/category.service.interface.js';

@Resolver('Category')
@UseGuards(JwtAuthGuard)
export class CategoryResolver {
  private readonly logger = new Logger(CategoryResolver.name);

  constructor(
    @Inject(CATEGORY_SERVICE)
    private readonly categoryService: ICategoryService,
  ) {}

  @Query('category')
  async getCategory(@Args('id') id: string): Promise<unknown> {
    return this.categoryService.getById(id);
  }

  @Query('categories')
  async listCategories(
    @Args('page') page?: number,
    @Args('limit') limit?: number,
  ): Promise<unknown> {
    return this.categoryService.list({
      page: page ?? 1,
      limit: limit ?? 20,
    });
  }

  @Query('categoryTree')
  async getTree(@Args('rootId') rootId?: string): Promise<unknown> {
    return this.categoryService.getTree(rootId);
  }
}
