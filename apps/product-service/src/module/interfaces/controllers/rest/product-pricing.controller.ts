/**
 * ProductPricingController — REST endpoints
 * @module product-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Inject, Param,
  Patch, Post, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import {
  PRICING_SERVICE,
  type IProductPricingService,
} from '../../../application/services/interfaces/product-pricing.service.interface.js';

import type {
  UpdatePriceHttpDTO,
  CalculatePriceHttpDTO,
} from '../../dtos/requests/pricing.request.dto.js';
import type {
  PricingHttpResponseDTO,
  PriceCalculationHttpResponseDTO,
  PricingStatsHttpResponseDTO,
} from '../../dtos/responses/pricing.response.dto.js';

import { PricingControllerMapper } from '../../mappers/pricing.controller.mapper.js';
import { ProductLoggingInterceptor } from '../../interceptors/product-logging.interceptor.js';
import { ProductTimeoutInterceptor } from '../../interceptors/product-timeout.interceptor.js';
import {
  ApiPricingTag,
  ApiUpdatePrice,
  ApiGetPrice,
  ApiCalculatePrice,
  ApiGetPricingStats,
} from '../../swagger/pricing.swagger.js';

@ApiPricingTag()
@ApiBearerAuth('bearer')
@Controller('product-pricing')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ProductLoggingInterceptor, ProductTimeoutInterceptor)
export class ProductPricingController extends BaseController {
  constructor(
    @Inject(PRICING_SERVICE)
    private readonly pricingService: IProductPricingService,
  ) {
    super();
  }

  @Patch('by-product/:productId')
  @ApiUpdatePrice()
  async updatePrice(
    @Param('productId') productId: string,
    @Body() dto: UpdatePriceHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PricingHttpResponseDTO> {
    // eslint-disable-next-line no-console
    console.log('[DEBUG-CONTROLLER] dto received:', JSON.stringify(dto), '| sellingPrice:', (dto as any)?.sellingPrice, '| type:', typeof (dto as any)?.sellingPrice);
    const appDto = PricingControllerMapper.toUpdatePriceAppDto(productId, dto);
    const result = await this.pricingService.updatePrice({
      ...appDto,
      actorId: user.userId,
    });
    return PricingControllerMapper.toHttpResponse(result);
  }

  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  @ApiCalculatePrice()
  async calculate(
    @Body() dto: CalculatePriceHttpDTO,
  ): Promise<PriceCalculationHttpResponseDTO> {
    const input = PricingControllerMapper.toCalculateAppDto(dto);
    const result = await this.pricingService.calculate(input);
    return PricingControllerMapper.toCalculationHttp(result);
  }

  @Get('stats')
  @ApiGetPricingStats()
  async stats(): Promise<PricingStatsHttpResponseDTO> {
    const result = await this.pricingService.getStats();
    return PricingControllerMapper.toStatsHttp(result);
  }

  @Get('by-product/:productId/public')
  @ApiGetPrice()
  async publicByProduct(
    @Param('productId') productId: string,
  ): Promise<{ readonly sellingPrice: number; readonly currency: string }> {
    const result = await this.pricingService.getPublic(productId);
    return result as unknown as { readonly sellingPrice: number; readonly currency: string };
  }

  @Get('by-product/:productId')
  @ApiGetPrice()
  async byProduct(@Param('productId') productId: string): Promise<PricingHttpResponseDTO> {
    const result = await this.pricingService.getByProduct(productId);
    return PricingControllerMapper.toHttpResponse(result);
  }

  @Get(':id')
  @ApiGetPrice()
  async getById(@Param('id') id: string): Promise<PricingHttpResponseDTO> {
    const result = await this.pricingService.getById(id);
    return PricingControllerMapper.toHttpResponse(result);
  }
}
