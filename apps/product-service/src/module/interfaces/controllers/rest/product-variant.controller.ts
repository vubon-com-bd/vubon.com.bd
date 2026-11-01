/**
 * ProductVariantController — REST endpoints
 * @module product-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Inject, Param,
  Patch, Post, Query, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import {
  VARIANT_SERVICE,
  type IProductVariantService,
} from '../../../application/services/interfaces/product-variant.service.interface.js';

import {
  AddVariantHttpDTO,
  UpdateVariantHttpDTO,
  ListVariantsHttpQueryDTO,
} from '../../dtos/requests/variant.request.dto.js';

import type {
  VariantHttpResponseDTO,
  VariantListHttpResponseDTO,
  VariantStatsHttpResponseDTO,
} from '../../dtos/responses/variant.response.dto.js';

import { VariantControllerMapper } from '../../mappers/variant.controller.mapper.js';
import { ProductLoggingInterceptor } from '../../interceptors/product-logging.interceptor.js';
import { ProductTimeoutInterceptor } from '../../interceptors/product-timeout.interceptor.js';
import {
  ApiVariantTag,
  ApiAddVariant,
  ApiUpdateVariant,
  ApiGetVariant,
  ApiListVariants,
  ApiGetVariantStats,
} from '../../swagger/variant.swagger.js';

@ApiVariantTag()
@ApiBearerAuth('bearer')
@Controller('product-variants')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ProductLoggingInterceptor, ProductTimeoutInterceptor)
export class ProductVariantController extends BaseController {
  constructor(
    @Inject(VARIANT_SERVICE)
    private readonly variantService: IProductVariantService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiAddVariant()
  async add(
    @Body() dto: AddVariantHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<VariantHttpResponseDTO> {
    const appDto = VariantControllerMapper.toAddAppDto(dto);
    const result = await this.variantService.add(appDto, user.userId);
    return VariantControllerMapper.toHttpResponse(result);
  }

  @Patch(':id')
  @ApiUpdateVariant()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVariantHttpDTO,
  ): Promise<VariantHttpResponseDTO> {
    const appDto = VariantControllerMapper.toUpdateAppDto(id, dto);
    const result = await this.variantService.update(appDto);
    return VariantControllerMapper.toHttpResponse(result);
  }

  @Get()
  @ApiListVariants()
  async list(@Query() q: ListVariantsHttpQueryDTO): Promise<VariantListHttpResponseDTO> {
    const options = VariantControllerMapper.toListOptions(q);
    const result = await this.variantService.list(options);
    return VariantControllerMapper.toListHttp(result);
  }

  @Get('stats')
  @ApiGetVariantStats()
  async stats(
    @Query('productId') productId?: string,
  ): Promise<VariantStatsHttpResponseDTO> {
    const result = await this.variantService.getStats(productId);
    return VariantControllerMapper.toStatsHttp(result);
  }

  @Get(':id')
  @ApiGetVariant()
  async getById(@Param('id') id: string): Promise<VariantHttpResponseDTO> {
    const result = await this.variantService.getById(id);
    return VariantControllerMapper.toHttpResponse(result);
  }
}
