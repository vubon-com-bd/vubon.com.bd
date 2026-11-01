/**
 * ProductMediaController — REST endpoints
 * @module product-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject,
  Param, Post, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import {
  MEDIA_SERVICE,
  type IProductMediaService,
} from '../../../application/services/interfaces/product-media.service.interface.js';

import type { MediaHttpResponseDTO } from '../../dtos/responses/media.response.dto.js';
import type { AddMediaHttpDTO } from '../../dtos/requests/media.request.dto.js';

import { ProductLoggingInterceptor } from '../../interceptors/product-logging.interceptor.js';
import { ProductTimeoutInterceptor } from '../../interceptors/product-timeout.interceptor.js';

@ApiTags('product-media')
@ApiBearerAuth('bearer')
@Controller('products/:productId/media')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ProductLoggingInterceptor, ProductTimeoutInterceptor)
export class ProductMediaController extends BaseController {
  constructor(
    @Inject(MEDIA_SERVICE)
    private readonly mediaService: IProductMediaService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add media to product' })
  async add(
    @Param('productId') productId: string,
    @Body() dto: AddMediaHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<MediaHttpResponseDTO> {
    const result = await this.mediaService.addMedia({
      productId,
      items: dto.items.map((i) => ({
        url: i.url,
        type: i.type,
        alt: i.alt,
        order: i.order,
        isPrimary: i.isPrimary,
      })),
      actorId: user.userId,
    });
    return result as unknown as MediaHttpResponseDTO;
  }

  @Delete(':mediaUrl')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove media from product' })
  async remove(
    @Param('productId') productId: string,
    @Param('mediaUrl') mediaUrl: string,
  ): Promise<MediaHttpResponseDTO> {
    const result = await this.mediaService.removeMedia({ productId, mediaUrl });
    return result as unknown as MediaHttpResponseDTO;
  }

  @Get()
  @ApiOperation({ summary: 'List product media' })
  async getByProduct(
    @Param('productId') productId: string,
  ): Promise<MediaHttpResponseDTO> {
    const result = await this.mediaService.getByProduct(productId);
    return result as unknown as MediaHttpResponseDTO;
  }
}
