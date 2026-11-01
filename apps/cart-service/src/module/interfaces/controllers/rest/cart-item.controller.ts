/**
 * CartItemController — REST endpoints
 * @module cart-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

// Commands
import { AddItemCommand } from '../../../application/commands/item/add-item.command.js';
import { UpdateItemCommand } from '../../../application/commands/item/update-item.command.js';
import { UpdateQuantityCommand } from '../../../application/commands/item/update-quantity.command.js';
import { RemoveItemCommand } from '../../../application/commands/item/remove-item.command.js';
import { SelectItemCommand } from '../../../application/commands/item/select-item.command.js';
import { MoveToSavedCommand } from '../../../application/commands/item/move-to-saved.command.js';

// Queries
import { ListItemsQuery } from '../../../application/queries/item/list-items.query.js';
import { GetItemQuery } from '../../../application/queries/item/get-item.query.js';

// HTTP DTOs
import {
  AddItemHttpDTO,
  UpdateItemHttpDTO,
  UpdateQuantityHttpDTO,
  RemoveItemHttpDTO,
  SelectItemsHttpDTO,
  MoveToSavedHttpDTO,
  ListItemsHttpQueryDTO,
} from '../../dtos/requests/cart-item.request.dto.js';
import type {
  CartItemHttpResponseDTO,
  CartItemListHttpResponseDTO,
} from '../../dtos/responses/cart-item.response.dto.js';
import type { CartActionHttpResponseDTO } from '../../dtos/responses/cart.response.dto.js';

import { CartItemControllerMapper } from '../../mappers/cart-item.controller.mapper.js';
import { CartOwnerGuard } from '../../guards/cart-owner.guard.js';
import { CartLockInterceptor } from '../../interceptors/cart-lock.interceptor.js';
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';
import {
  ApiAddItem,
  ApiUpdateItem,
  ApiUpdateQuantity,
  ApiRemoveItem,
  ApiSelectItems,
  ApiListItems,
} from '../../swagger/cart-item.swagger.js';

@Controller('carts/:cartId/items')
@UseGuards(JwtAuthGuard, CartOwnerGuard)
@UseInterceptors(CartLockInterceptor)
@ApiBearerAuth('bearer')
export class CartItemController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ═══════════ COMMANDS ═══════════

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiAddItem()
  async add(
    @Param('cartId') cartId: string,
    @Body() dto: AddItemHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<CartItemHttpResponseDTO> {
    const appDto = CartItemControllerMapper.toAddAppDto(
      cartId,
      dto,
      'user',
      idempotencyKey,
    );
    return this.commandBus.execute(new AddItemCommand(appDto, user.userId));
  }

  @Patch(':itemId')
  @ApiUpdateItem()
  async update(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateItemHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartItemHttpResponseDTO> {
    const appDto = CartItemControllerMapper.toUpdateAppDto(cartId, itemId, dto);
    return this.commandBus.execute(new UpdateItemCommand(appDto, user.userId));
  }

  @Patch(':itemId/quantity')
  @ApiUpdateQuantity()
  async updateQuantity(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateQuantityHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartItemHttpResponseDTO> {
    const appDto = CartItemControllerMapper.toUpdateQuantityAppDto(cartId, itemId, dto);
    return this.commandBus.execute(new UpdateQuantityCommand(appDto, user.userId));
  }

  @Delete(':itemId')
  @ApiRemoveItem()
  async remove(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() dto: RemoveItemHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartActionHttpResponseDTO> {
    return this.commandBus.execute(
      new RemoveItemCommand({ cartId, itemId, reason: dto.reason }, user.userId),
    );
  }

  @Post('select')
  @HttpCode(HttpStatus.OK)
  @ApiSelectItems()
  async select(
    @Param('cartId') cartId: string,
    @Body() dto: SelectItemsHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartActionHttpResponseDTO> {
    const appDto = CartItemControllerMapper.toSelectAppDto(cartId, dto);
    return this.commandBus.execute(new SelectItemCommand(appDto, user.userId));
  }

  @Post(':itemId/move-to-saved')
  @HttpCode(HttpStatus.OK)
  async moveToSaved(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() dto: MoveToSavedHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartActionHttpResponseDTO> {
    const appDto = CartItemControllerMapper.toMoveToSavedAppDto(cartId, itemId, dto);
    return this.commandBus.execute(new MoveToSavedCommand(appDto, user.userId));
  }

  // ═══════════ QUERIES ═══════════

  @Get()
  @ApiListItems()
  async list(
    @Param('cartId') cartId: string,
    @Query() q: ListItemsHttpQueryDTO,
  ): Promise<CartItemListHttpResponseDTO> {
    const options = CartItemControllerMapper.toListOptions(cartId, q);
    return this.queryBus.execute(new ListItemsQuery(options));
  }

  @Get(':itemId')
  async getById(
    @Param('itemId') itemId: string,
  ): Promise<CartItemHttpResponseDTO> {
    return this.queryBus.execute(new GetItemQuery(itemId));
  }
}
