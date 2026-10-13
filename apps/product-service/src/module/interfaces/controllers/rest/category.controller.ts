/**
 * CategoryController — REST endpoints
 * @module product-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject,
  Param, Patch, Post, Query, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import {
  CATEGORY_SERVICE,
  type ICategoryService,
} from '../../../application/services/interfaces/category.service.interface.js';

import type {
  CreateCategoryRequestDTO,
  UpdateCategoryRequestDTO,
} from '../../../application/dtos/requests/category/index.js';
import type {
  CategoryHttpResponseDTO,
  CategoryListHttpResponseDTO,
  CategoryTreeHttpResponseDTO,
  CategoryStatsHttpResponseDTO,
} from '../../dtos/responses/category.response.dto.js';

import { ProductLoggingInterceptor } from '../../interceptors/product-logging.interceptor.js';
import { ProductTimeoutInterceptor } from '../../interceptors/product-timeout.interceptor.js';
import {
  ApiCategoryTag, ApiCreateCategory, ApiUpdateCategory, ApiGetCategory,
  ApiListCategories, ApiGetCategoryTree, ApiGetCategoryStats,
} from '../../swagger/category.swagger.js';

@ApiCategoryTag()
@ApiBearerAuth('bearer')
@Controller('categories')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ProductLoggingInterceptor, ProductTimeoutInterceptor)
export class CategoryController extends BaseController {
  constructor(
    @Inject(CATEGORY_SERVICE)
    private readonly categoryService: ICategoryService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateCategory()
  async create(
    @Body() dto: CreateCategoryRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CategoryHttpResponseDTO> {
    const result = await this.categoryService.create({ ...dto, actorId: user.userId });
    return result as unknown as CategoryHttpResponseDTO;
  }

  @Patch(':id')
  @ApiUpdateCategory()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryRequestDTO,
  ): Promise<CategoryHttpResponseDTO> {
    const result = await this.categoryService.update({ ...dto, categoryId: id });
    return result as unknown as CategoryHttpResponseDTO;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id') id: string,
  ): Promise<{ readonly success: true; readonly categoryId: string }> {
    return this.categoryService.delete({ categoryId: id });
  }

  @Post(':id/move')
  @HttpCode(HttpStatus.OK)
  async move(
    @Param('id') id: string,
    @Body() body: { readonly newParentId?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CategoryHttpResponseDTO> {
    const result = await this.categoryService.move(id, body.newParentId, user.userId);
    return result as unknown as CategoryHttpResponseDTO;
  }

  @Get('tree')
  @ApiGetCategoryTree()
  async tree(
    @Query('rootId') rootId?: string,
  ): Promise<CategoryTreeHttpResponseDTO> {
    const result = await this.categoryService.getTree(rootId);
    return result as unknown as CategoryTreeHttpResponseDTO;
  }

  @Get('roots')
  @ApiListCategories()
  async roots(): Promise<readonly CategoryHttpResponseDTO[]> {
    const result = await this.categoryService.listRoots();
    return result as unknown as readonly CategoryHttpResponseDTO[];
  }

  @Get('stats')
  @ApiGetCategoryStats()
  async stats(): Promise<CategoryStatsHttpResponseDTO> {
    const result = await this.categoryService.getStats();
    return result as unknown as CategoryStatsHttpResponseDTO;
  }

  @Get()
  @ApiListCategories()
  async list(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<CategoryListHttpResponseDTO> {
    const result = await this.categoryService.list({ page: page ?? 1, limit: limit ?? 20 });
    return result as unknown as CategoryListHttpResponseDTO;
  }

  @Get('by-slug/:slug')
  @ApiGetCategory()
  async bySlug(@Param('slug') slug: string): Promise<CategoryHttpResponseDTO> {
    const result = await this.categoryService.getBySlug(slug);
    return result as unknown as CategoryHttpResponseDTO;
  }

  @Get(':id')
  @ApiGetCategory()
  async getById(@Param('id') id: string): Promise<CategoryHttpResponseDTO> {
    const result = await this.categoryService.getById(id);
    return result as unknown as CategoryHttpResponseDTO;
  }
}
