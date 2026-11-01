/**
 * ProductCollectionController — REST endpoints
 * @module product-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject,
  Param, Patch, Post, Query, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import {
  COLLECTION_SERVICE,
  type IProductCollectionService,
} from '../../../application/services/interfaces/product-collection.service.interface.js';

import type {
  CreateCollectionRequestDTO,
  UpdateCollectionRequestDTO,
} from '../../../application/dtos/requests/collection/index.js';
import type {
  CollectionHttpResponseDTO,
  CollectionListHttpResponseDTO,
  CollectionStatsHttpResponseDTO,
} from '../../dtos/responses/collection.response.dto.js';

import { ProductLoggingInterceptor } from '../../interceptors/product-logging.interceptor.js';
import { ProductTimeoutInterceptor } from '../../interceptors/product-timeout.interceptor.js';

@ApiTags('product-collections')
@ApiBearerAuth('bearer')
@Controller('product-collections')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ProductLoggingInterceptor, ProductTimeoutInterceptor)
export class ProductCollectionController extends BaseController {
  constructor(
    @Inject(COLLECTION_SERVICE)
    private readonly collectionService: IProductCollectionService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a collection' })
  async create(
    @Body() dto: CreateCollectionRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CollectionHttpResponseDTO> {
    const result = await this.collectionService.create({
      ...dto,
      actorId: user.userId,
    } as CreateCollectionRequestDTO);
    return result as unknown as CollectionHttpResponseDTO;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update collection' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCollectionRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CollectionHttpResponseDTO> {
    const result = await this.collectionService.update({
      ...dto,
      collectionId: id,
      actorId: user.userId,
    } as UpdateCollectionRequestDTO);
    return result as unknown as CollectionHttpResponseDTO;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete collection' })
  async delete(
    @Param('id') id: string,
  ): Promise<{ readonly success: true; readonly collectionId: string }> {
    return this.collectionService.delete({ collectionId: id });
  }

  @Post(':id/products/:productId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add product to collection' })
  async addProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ): Promise<CollectionHttpResponseDTO> {
    const result = await this.collectionService.addProduct({
      collectionId: id,
      productId,
    });
    return result as unknown as CollectionHttpResponseDTO;
  }

  @Delete(':id/products/:productId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove product from collection' })
  async removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ): Promise<CollectionHttpResponseDTO> {
    const result = await this.collectionService.removeProduct({
      collectionId: id,
      productId,
    });
    return result as unknown as CollectionHttpResponseDTO;
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get collection stats' })
  async stats(): Promise<CollectionStatsHttpResponseDTO> {
    const result = await this.collectionService.getStats();
    return result as unknown as CollectionStatsHttpResponseDTO;
  }

  @Get()
  @ApiOperation({ summary: 'List collections' })
  async list(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<CollectionListHttpResponseDTO> {
    const result = await this.collectionService.list({
      page: page ?? 1,
      limit: limit ?? 20,
    });
    return result as unknown as CollectionListHttpResponseDTO;
  }

  @Get('by-slug/:slug')
  @ApiOperation({ summary: 'Get collection by slug' })
  async bySlug(@Param('slug') slug: string): Promise<CollectionHttpResponseDTO> {
    const result = await this.collectionService.getBySlug(slug);
    return result as unknown as CollectionHttpResponseDTO;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get collection by ID' })
  async getById(@Param('id') id: string): Promise<CollectionHttpResponseDTO> {
    const result = await this.collectionService.getById(id);
    return result as unknown as CollectionHttpResponseDTO;
  }
}
