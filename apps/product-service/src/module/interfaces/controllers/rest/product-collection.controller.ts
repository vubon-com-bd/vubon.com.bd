/**
 * ProductCollectionController
 */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public, Roles, CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateCollectionCommand } from '../../../application/commands/collection/create-collection.command.js';
import { UpdateCollectionCommand } from '../../../application/commands/collection/update-collection.command.js';
import { DeleteCollectionCommand } from '../../../application/commands/collection/delete-collection.command.js';
import { AddProductToCollectionCommand } from '../../../application/commands/collection/add-product-to-collection.command.js';
import { RemoveProductFromCollectionCommand } from '../../../application/commands/collection/remove-product-from-collection.command.js';
import { GetCollectionQuery } from '../../../application/queries/collection/get-collection.query.js';
import { ListFeaturedCollectionsQuery } from '../../../application/queries/collection/list-featured-collections.query.js';
import { ListActiveCollectionsQuery } from '../../../application/queries/collection/list-active-collections.query.js';

import { CreateCollectionRequestDTO, UpdateCollectionRequestDTO } from '../../dtos/requests/collection.request.dto.js';
import { CollectionResponseDTO } from '../../dtos/responses/collection.response.dto.js';

@ApiTags('collections')
@ApiBearerAuth('bearer')
@Controller('collections')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductCollectionController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a collection' })
  async create(
    @Body() dto: CreateCollectionRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CollectionResponseDTO> {
    return this.commandBus.execute(new CreateCollectionCommand(dto as never, user.userId));
  }

  @Get('featured')
  @Public()
  @ApiOperation({ summary: 'List featured collections' })
  async featured(@Query('limit') limit = 20): Promise<readonly CollectionResponseDTO[]> {
    return this.queryBus.execute(new ListFeaturedCollectionsQuery(Number(limit)));
  }

  @Get('active')
  @Public()
  @ApiOperation({ summary: 'List active collections' })
  async active(): Promise<readonly CollectionResponseDTO[]> {
    return this.queryBus.execute(new ListActiveCollectionsQuery());
  }

  @Get(':collectionId')
  @Public()
  @ApiOperation({ summary: 'Get collection by ID' })
  async getById(@Param('collectionId') collectionId: string): Promise<CollectionResponseDTO | null> {
    return this.queryBus.execute(new GetCollectionQuery(collectionId));
  }

  @Patch(':collectionId')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a collection' })
  async update(
    @Param('collectionId') collectionId: string,
    @Body() dto: UpdateCollectionRequestDTO,
  ): Promise<CollectionResponseDTO> {
    return this.commandBus.execute(new UpdateCollectionCommand({ ...dto, collectionId } as never));
  }

  @Post(':collectionId/products/:productId')
  @Roles('admin')
  @ApiOperation({ summary: 'Add product to collection' })
  async addProduct(
    @Param('collectionId') collectionId: string,
    @Param('productId') productId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CollectionResponseDTO> {
    return this.commandBus.execute(
      new AddProductToCollectionCommand(collectionId, productId, user.userId),
    );
  }

  @Delete(':collectionId/products/:productId')
  @Roles('admin')
  @ApiOperation({ summary: 'Remove product from collection' })
  async removeProduct(
    @Param('collectionId') collectionId: string,
    @Param('productId') productId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CollectionResponseDTO> {
    return this.commandBus.execute(
      new RemoveProductFromCollectionCommand(collectionId, productId, user.userId),
    );
  }

  @Delete(':collectionId')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a collection' })
  async remove(
    @Param('collectionId') collectionId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(new DeleteCollectionCommand(collectionId, user.userId));
  }
}
