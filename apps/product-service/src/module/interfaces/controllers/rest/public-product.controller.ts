/**
 * PublicProductController — no auth required
 * @module product-service/interfaces/controllers/rest
 */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { GetProductBySlugQuery } from '../../../application/queries/product/get-product-by-slug.query.js';
import { ListProductsQuery } from '../../../application/queries/product/list-products.query.js';
import { SearchProductsQuery } from '../../../application/queries/product/search-products.query.js';
import type { ProductListResponseDTO } from '../../dtos/responses/product.response.dto.js';
import type { ProductDetailResponseDTO } from '../../dtos/responses/product-detail.response.dto.js';

@ApiTags('public-products')
@Public()
@Controller('public/products')
export class PublicProductController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'List published products (public)' })
  async list(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
  ): Promise<ProductListResponseDTO> {
    return this.queryBus.execute(
      new ListProductsQuery({
        page: Number(page),
        limit: Number(limit),
        sortBy: 'createdAt',
        sortDir: 'desc',
        filter: { status: 'published', categoryId, search },
      }),
    );
  }

  @Get('search')
  @ApiOperation({ summary: 'Search published products' })
  async search(
    @Query('q') q: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ): Promise<ProductListResponseDTO> {
    return this.queryBus.execute(new SearchProductsQuery(q, Number(page), Number(limit)));
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get product by slug' })
  async getBySlug(@Param('slug') slug: string): Promise<ProductDetailResponseDTO | null> {
    return this.queryBus.execute(new GetProductBySlugQuery(slug));
  }
}
