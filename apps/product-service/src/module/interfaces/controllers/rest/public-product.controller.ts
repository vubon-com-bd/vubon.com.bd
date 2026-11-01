/**
 * PublicProductController — public REST endpoints (no auth)
 * @module product-service/interfaces/controllers/rest
 */
import { Controller, Get, Inject, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import {
  PRODUCT_SERVICE,
  type IProductService,
} from '../../../application/services/interfaces/product.service.interface.js';

import type {
  ProductPublicHttpResponseDTO,
  ProductSummaryHttpResponseDTO,
} from '../../dtos/responses/product.response.dto.js';

import { ProductControllerMapper } from '../../mappers/product.controller.mapper.js';
import { ProductLoggingInterceptor } from '../../interceptors/product-logging.interceptor.js';
import { ProductCacheInterceptor } from '../../interceptors/product-cache.interceptor.js';

@ApiTags('public-products')
@Controller('public/products')
@Public()
@UseInterceptors(ProductLoggingInterceptor, ProductCacheInterceptor)
export class PublicProductController extends BaseController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService,
  ) {
    super();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Featured products (public)' })
  async featured(
    @Query('limit') limit?: number,
  ): Promise<readonly ProductSummaryHttpResponseDTO[]> {
    const results = await this.productService.getFeatured(limit ?? 20);
    return results.map((r) => ProductControllerMapper.toSummaryHttp(r));
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products (public)' })
  async search(
    @Query('q') term: string,
    @Query('limit') limit?: number,
  ): Promise<readonly ProductSummaryHttpResponseDTO[]> {
    const results = await this.productService.search(term ?? '', limit ?? 20);
    return results.map((r) => ProductControllerMapper.toSummaryHttp(r));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get public product by ID' })
  async getById(@Param('id') id: string): Promise<ProductPublicHttpResponseDTO> {
    const result = await this.productService.getPublic(id);
    return ProductControllerMapper.toPublicHttpResponse(result);
  }
}
