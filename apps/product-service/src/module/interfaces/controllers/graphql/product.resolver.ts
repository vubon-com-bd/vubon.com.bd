/**
 * ProductResolver — GraphQL endpoints (read-heavy)
 * @module product-service/interfaces/controllers/graphql
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject, Logger, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import {
  PRODUCT_SERVICE,
  type IProductService,
} from '../../../application/services/interfaces/product.service.interface.js';

@Resolver('Product')
@UseGuards(JwtAuthGuard)
export class ProductResolver {
  private readonly logger = new Logger(ProductResolver.name);

  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService,
  ) {}

  @Query('product')
  async getProduct(
    @Args('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: get product ${id} for ${user.userId}`);
    return this.productService.getById(id);
  }

  @Query('productBySlug')
  async getProductBySlug(@Args('slug') slug: string): Promise<unknown> {
    return this.productService.getBySlug(slug);
  }

  @Query('productDetail')
  async getProductDetail(@Args('id') id: string): Promise<unknown> {
    return this.productService.getDetail(id);
  }

  @Query('products')
  async listProducts(
    @Args('page') page?: number,
    @Args('limit') limit?: number,
  ): Promise<unknown> {
    return this.productService.list({
      page: page ?? 1,
      limit: limit ?? 20,
    });
  }

  @Query('featuredProducts')
  async getFeatured(@Args('limit') limit?: number): Promise<unknown> {
    return this.productService.getFeatured(limit ?? 20);
  }

  @Query('searchProducts')
  async search(
    @Args('term') term: string,
    @Args('limit') limit?: number,
  ): Promise<unknown> {
    return this.productService.search(term, limit ?? 20);
  }
}
