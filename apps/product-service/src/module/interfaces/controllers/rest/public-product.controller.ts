import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces';
import { GetProductBySlugQuery } from '../../../application/queries/product/get-product-by-slug.query';
import { ListProductsQuery } from '../../../application/queries/product/list-products.query';
import { SearchProductsQuery } from '../../../application/queries/product/search-products.query';

@ApiTags('Public Products')
@Controller('public/products')
export class PublicProductController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Get()
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    const p = page ? Number(page) : 1;
    const l = limit ? Number(limit) : 20;
    return this.queryBus.execute(new ListProductsQuery(p, l));
  }

  @Public()
  @Get('search')
  async search(
    @Query('q') term: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    const l = limit ? Number(limit) : 20;
    return this.queryBus.execute(new SearchProductsQuery(term, l));
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string): Promise<unknown> {
    return this.queryBus.execute(new GetProductBySlugQuery(slug));
  }
}
