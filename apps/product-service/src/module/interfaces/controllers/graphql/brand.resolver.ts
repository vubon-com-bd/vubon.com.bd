/**
 * BrandResolver — GraphQL endpoints
 * @module product-service/interfaces/controllers/graphql
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject, Logger, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import {
  BRAND_SERVICE,
  type IBrandService,
} from '../../../application/services/interfaces/brand.service.interface.js';

@Resolver('Brand')
@UseGuards(JwtAuthGuard)
export class BrandResolver {
  private readonly logger = new Logger(BrandResolver.name);

  constructor(
    @Inject(BRAND_SERVICE)
    private readonly brandService: IBrandService,
  ) {}

  @Query('brand')
  async getBrand(@Args('id') id: string): Promise<unknown> {
    return this.brandService.getById(id);
  }

  @Query('brandBySlug')
  async getBrandBySlug(@Args('slug') slug: string): Promise<unknown> {
    return this.brandService.getBySlug(slug);
  }

  @Query('brands')
  async listBrands(
    @Args('page') page?: number,
    @Args('limit') limit?: number,
  ): Promise<unknown> {
    return this.brandService.list({
      page: page ?? 1,
      limit: limit ?? 20,
    });
  }

  @Query('featuredBrands')
  async getFeatured(@Args('limit') limit?: number): Promise<unknown> {
    return this.brandService.findFeatured(limit ?? 20);
  }
}
