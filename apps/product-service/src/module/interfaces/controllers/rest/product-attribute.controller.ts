/**
 * ProductAttributeController — REST endpoints
 * @module product-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject,
  Param, Patch, Post, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import {
  ATTRIBUTE_SERVICE,
  type IProductAttributeService,
} from '../../../application/services/interfaces/product-attribute.service.interface.js';

import type {
  AddAttributeRequestDTO,
  UpdateAttributeRequestDTO,
} from '../../../application/dtos/requests/attribute/index.js';
import type {
  AttributeHttpResponseDTO,
} from '../../dtos/responses/attribute.response.dto.js';

import { ProductLoggingInterceptor } from '../../interceptors/product-logging.interceptor.js';
import { ProductTimeoutInterceptor } from '../../interceptors/product-timeout.interceptor.js';

@ApiTags('product-attributes')
@ApiBearerAuth('bearer')
@Controller('products/:productId/attributes')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ProductLoggingInterceptor, ProductTimeoutInterceptor)
export class ProductAttributeController extends BaseController {
  constructor(
    @Inject(ATTRIBUTE_SERVICE)
    private readonly attributeService: IProductAttributeService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add attribute to product' })
  async add(
    @Param('productId') productId: string,
    @Body() dto: AddAttributeRequestDTO,
  ): Promise<AttributeHttpResponseDTO> {
    const result = await this.attributeService.add({ ...dto, productId });
    return result as unknown as AttributeHttpResponseDTO;
  }

  @Get()
  @ApiOperation({ summary: 'List attributes for product' })
  async list(
    @Param('productId') productId: string,
  ): Promise<readonly AttributeHttpResponseDTO[]> {
    const results = await this.attributeService.listByProduct(productId);
    return results as unknown as readonly AttributeHttpResponseDTO[];
  }

  @Patch(':attributeId')
  @ApiOperation({ summary: 'Update attribute' })
  async update(
    @Param('productId') productId: string,
    @Param('attributeId') attributeId: string,
    @Body() dto: UpdateAttributeRequestDTO,
  ): Promise<AttributeHttpResponseDTO> {
    const result = await this.attributeService.update({ ...dto, attributeId, productId });
    return result as unknown as AttributeHttpResponseDTO;
  }

  @Delete(':attributeId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove attribute' })
  async remove(
    @Param('productId') productId: string,
    @Param('attributeId') attributeId: string,
  ): Promise<{ readonly success: true; readonly attributeId: string }> {
    return this.attributeService.remove({ attributeId, productId });
  }
}
