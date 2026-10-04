/**
 * ProductMediaController
 */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public, Roles, CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ListMediaByProductQuery } from '../../../application/queries/media/list-media-by-product.query.js';
import type { MediaItemDTO } from '../../../application/services/interfaces/media.service.interface.js';
import { AddMediaRequestDTO } from '../../dtos/requests/media.request.dto.js';

@ApiTags('media')
@ApiBearerAuth('bearer')
@Controller('media')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductMediaController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Get('product/:productId')
  @Public()
  @ApiOperation({ summary: 'List media for a product' })
  async listByProduct(@Param('productId') productId: string): Promise<readonly MediaItemDTO[]> {
    return this.queryBus.execute(new ListMediaByProductQuery(productId));
  }

  @Post()
  @Roles('admin', 'vendor')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add media to product' })
  async add(
    @Body() dto: AddMediaRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<MediaItemDTO> {
    // Direct service call via command pattern is preferred — placeholder response
    void dto;
    void user;
    throw new Error('Use MediaService directly or create AddMediaCommand');
  }

  @Delete(':mediaId')
  @Roles('admin', 'vendor')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove media' })
  async remove(
    @Param('mediaId') mediaId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    void mediaId;
    void user;
    throw new Error('Use MediaService directly or create RemoveMediaCommand');
  }
}
