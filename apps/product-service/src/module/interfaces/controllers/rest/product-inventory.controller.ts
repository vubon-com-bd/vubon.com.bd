/**
 * ProductInventoryController — REST endpoints
 * @module product-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Inject, Param,
  Post, Query, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import {
  INVENTORY_SERVICE,
  type IProductInventoryService,
} from '../../../application/services/interfaces/product-inventory.service.interface.js';

import type {
  AdjustInventoryHttpDTO,
  UpdateInventoryHttpDTO,
} from '../../dtos/requests/inventory.request.dto.js';
import type {
  InventoryHttpResponseDTO,
  StockCheckHttpResponseDTO,
  InventoryStatsHttpResponseDTO,
} from '../../dtos/responses/inventory.response.dto.js';

import { InventoryControllerMapper } from '../../mappers/inventory.controller.mapper.js';
import { ProductLoggingInterceptor } from '../../interceptors/product-logging.interceptor.js';
import { ProductTimeoutInterceptor } from '../../interceptors/product-timeout.interceptor.js';
import {
  ApiInventoryTag,
  ApiGetInventory,
  ApiAdjustInventory,
  ApiCheckStock,
  ApiGetInventoryStats,
} from '../../swagger/inventory.swagger.js';

@ApiInventoryTag()
@ApiBearerAuth('bearer')
@Controller('product-inventory')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ProductLoggingInterceptor, ProductTimeoutInterceptor)
export class ProductInventoryController extends BaseController {
  constructor(
    @Inject(INVENTORY_SERVICE)
    private readonly inventoryService: IProductInventoryService,
  ) {
    super();
  }

  @Post(':id/adjust')
  @HttpCode(HttpStatus.OK)
  @ApiAdjustInventory()
  async adjust(
    @Param('id') id: string,
    @Body() dto: AdjustInventoryHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<InventoryHttpResponseDTO> {
    const appDto = InventoryControllerMapper.toAdjustAppDto(id, dto);
    const result = await this.inventoryService.adjust({
      ...appDto,
      actorId: user.userId,
    });
    return InventoryControllerMapper.toHttpResponse(result);
  }

  @Post(':id/update')
  @HttpCode(HttpStatus.OK)
  @ApiAdjustInventory()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateInventoryHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<InventoryHttpResponseDTO> {
    const appDto = InventoryControllerMapper.toUpdateAppDto(id, dto);
    const result = await this.inventoryService.update({
      ...appDto,
      actorId: user.userId,
    });
    return InventoryControllerMapper.toHttpResponse(result);
  }

  @Get('check-stock')
  @ApiCheckStock()
  async checkStock(
    @Query('productId') productId: string,
    @Query('quantity') quantity: string,
  ): Promise<StockCheckHttpResponseDTO> {
    const result = await this.inventoryService.checkStock(productId, Number(quantity ?? 1));
    return InventoryControllerMapper.toStockCheckHttp(result);
  }

  @Get('stats')
  @ApiGetInventoryStats()
  async stats(): Promise<InventoryStatsHttpResponseDTO> {
    const result = await this.inventoryService.getStats();
    return InventoryControllerMapper.toStatsHttp(result);
  }

  @Get('by-product/:productId')
  @ApiGetInventory()
  async byProduct(@Param('productId') productId: string): Promise<InventoryHttpResponseDTO> {
    const result = await this.inventoryService.getByProduct(productId);
    return InventoryControllerMapper.toHttpResponse(result);
  }

  @Get(':id')
  @ApiGetInventory()
  async getById(@Param('id') id: string): Promise<InventoryHttpResponseDTO> {
    const result = await this.inventoryService.getById(id);
    return InventoryControllerMapper.toHttpResponse(result);
  }
}
