/**
 * BrandController — REST endpoints
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
  BRAND_SERVICE,
  type IBrandService,
} from '../../../application/services/interfaces/brand.service.interface.js';

import type {
  CreateBrandRequestDTO,
  UpdateBrandRequestDTO,
} from '../../../application/dtos/requests/brand/index.js';
import type {
  BrandHttpResponseDTO,
  BrandListHttpResponseDTO,
  BrandStatsHttpResponseDTO,
} from '../../dtos/responses/brand.response.dto.js';

import { ProductLoggingInterceptor } from '../../interceptors/product-logging.interceptor.js';
import { ProductTimeoutInterceptor } from '../../interceptors/product-timeout.interceptor.js';
import {
  ApiBrandTag, ApiCreateBrand, ApiUpdateBrand, ApiGetBrand,
  ApiListBrands, ApiGetBrandStats,
} from '../../swagger/brand.swagger.js';

@ApiBrandTag()
@ApiBearerAuth('bearer')
@Controller('brands')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ProductLoggingInterceptor, ProductTimeoutInterceptor)
export class BrandController extends BaseController {
  constructor(
    @Inject(BRAND_SERVICE)
    private readonly brandService: IBrandService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateBrand()
  async create(
    @Body() dto: CreateBrandRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BrandHttpResponseDTO> {
    const result = await this.brandService.create({ ...dto, actorId: user.userId });
    return result as unknown as BrandHttpResponseDTO;
  }

  @Patch(':id')
  @ApiUpdateBrand()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBrandRequestDTO,
  ): Promise<BrandHttpResponseDTO> {
    const result = await this.brandService.update({ ...dto, brandId: id });
    return result as unknown as BrandHttpResponseDTO;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id') id: string,
  ): Promise<{ readonly success: true; readonly brandId: string }> {
    return this.brandService.delete({ brandId: id });
  }

  @Get('stats')
  @ApiGetBrandStats()
  async stats(): Promise<BrandStatsHttpResponseDTO> {
    const result = await this.brandService.getStats();
    return result as unknown as BrandStatsHttpResponseDTO;
  }

  @Get()
  @ApiListBrands()
  async list(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<BrandListHttpResponseDTO> {
    const result = await this.brandService.list({ page: page ?? 1, limit: limit ?? 20 });
    return result as unknown as BrandListHttpResponseDTO;
  }

  @Get('by-slug/:slug')
  @ApiGetBrand()
  async bySlug(@Param('slug') slug: string): Promise<BrandHttpResponseDTO> {
    const result = await this.brandService.getBySlug(slug);
    return result as unknown as BrandHttpResponseDTO;
  }

  @Get(':id')
  @ApiGetBrand()
  async getById(@Param('id') id: string): Promise<BrandHttpResponseDTO> {
    const result = await this.brandService.getById(id);
    return result as unknown as BrandHttpResponseDTO;
  }
}
