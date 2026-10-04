/**
 * OrderItemController
 * @module order-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { AddOrderItemCommand } from '../../../application/commands/order-item/add-order-item.command.js';
import { UpdateOrderItemCommand } from '../../../application/commands/order-item/update-order-item.command.js';
import { RemoveOrderItemCommand } from '../../../application/commands/order-item/remove-order-item.command.js';
import { GetOrderItemQuery } from '../../../application/queries/order-item/get-order-item.query.js';
import { ListOrderItemsQuery } from '../../../application/queries/order-item/list-order-items.query.js';

import type { OrderItemResponseDTO } from '../../../application/dtos/responses/order-response.dto.js';
import type { OrderItemListResponseDTO } from '../../../application/dtos/responses/order-item-response.dto.js';
import type {
  AddOrderItemRequestDTO,
  UpdateOrderItemRequestDTO,
  RemoveOrderItemRequestDTO,
} from '../../../application/dtos/requests/order-item/index.js';

@ApiTags('order-items')
@ApiBearerAuth('bearer')
@Controller('orders/:orderId/items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderItemController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add item to order' })
  async add(
    @Param('orderId') orderId: string,
    @Body() dto: Omit<AddOrderItemRequestDTO, 'orderId'>,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderItemResponseDTO> {
    return this.commandBus.execute(
      new AddOrderItemCommand({ ...dto, orderId } as AddOrderItemRequestDTO, user.userId),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List order items' })
  async list(@Param('orderId') orderId: string): Promise<OrderItemListResponseDTO> {
    return this.queryBus.execute(new ListOrderItemsQuery(orderId));
  }

  @Get(':itemId')
  @ApiOperation({ summary: 'Get order item by ID' })
  async getById(@Param('itemId') itemId: string): Promise<OrderItemResponseDTO> {
    return this.queryBus.execute(new GetOrderItemQuery(itemId));
  }

  @Patch(':itemId')
  @ApiOperation({ summary: 'Update order item' })
  async update(
    @Param('orderId') orderId: string,
    @Param('itemId') itemId: string,
    @Body() dto: Omit<UpdateOrderItemRequestDTO, 'orderId' | 'itemId'>,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderItemResponseDTO> {
    return this.commandBus.execute(
      new UpdateOrderItemCommand({ ...dto, orderId, itemId } as UpdateOrderItemRequestDTO, user.userId),
    );
  }

  @Delete(':itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove item from order' })
  async remove(
    @Param('orderId') orderId: string,
    @Param('itemId') itemId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    const dto: RemoveOrderItemRequestDTO = { orderId, itemId };
    await this.commandBus.execute(new RemoveOrderItemCommand(dto, user.userId));
  }
}
