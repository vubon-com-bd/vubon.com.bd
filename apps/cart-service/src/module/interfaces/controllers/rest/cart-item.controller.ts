import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { AddItemCommand } from '../../../application/commands/item/add-item.command.js';
import { UpdateItemCommand } from '../../../application/commands/item/update-item.command.js';
import { RemoveItemCommand } from '../../../application/commands/item/remove-item.command.js';
import { UpdateQuantityCommand } from '../../../application/commands/item/update-quantity.command.js';
import { SelectItemCommand } from '../../../application/commands/item/select-item.command.js';
import { ListItemsQuery } from '../../../application/queries/item/list-items.query.js';
import { GetItemQuery } from '../../../application/queries/item/get-item.query.js';

import {
  AddItemHttpDTO, UpdateItemHttpDTO, RemoveItemHttpDTO, UpdateQuantityHttpDTO, SelectItemHttpDTO,
} from '../../dtos/requests/cart-item.request.dto.js';
import type { CartHttpResponseDTO } from '../../dtos/responses/cart.response.dto.js';

@ApiTags('cart-items')
@ApiBearerAuth('bearer')
@Controller('cart/:cartId/items')
@UseGuards(JwtAuthGuard)
export class CartItemController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add item to cart' })
  async add(
    @Param('cartId') cartId: string,
    @Body() dto: AddItemHttpDTO,
  ): Promise<CartHttpResponseDTO> {
    return this.commandBus.execute(new AddItemCommand({ cartId, ...dto } as never));
  }

  @Get()
  @ApiOperation({ summary: 'List cart items' })
  async list(@Param('cartId') cartId: string) {
    return this.queryBus.execute(new ListItemsQuery(cartId));
  }

  @Get(':itemId')
  @ApiOperation({ summary: 'Get single cart item' })
  async getOne(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.queryBus.execute(new GetItemQuery(cartId, itemId));
  }

  @Patch(':itemId')
  @ApiOperation({ summary: 'Update cart item' })
  async update(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateItemHttpDTO,
  ): Promise<CartHttpResponseDTO> {
    return this.commandBus.execute(new UpdateItemCommand({ cartId, itemId, ...dto }));
  }

  @Patch(':itemId/quantity')
  @ApiOperation({ summary: 'Update item quantity' })
  async updateQuantity(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateQuantityHttpDTO,
  ): Promise<CartHttpResponseDTO> {
    return this.commandBus.execute(new UpdateQuantityCommand({ cartId, itemId, ...dto }));
  }

  @Patch(':itemId/select')
  @ApiOperation({ summary: 'Select/deselect item for checkout' })
  async select(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() dto: SelectItemHttpDTO,
  ): Promise<CartHttpResponseDTO> {
    return this.commandBus.execute(new SelectItemCommand({ cartId, itemId, selected: dto.selected }));
  }

  @Delete(':itemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  async remove(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() dto: RemoveItemHttpDTO,
  ): Promise<CartHttpResponseDTO> {
    return this.commandBus.execute(new RemoveItemCommand({ cartId, itemId, ...dto }));
  }
}
