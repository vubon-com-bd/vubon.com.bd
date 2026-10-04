/**
 * OrderController — REST endpoints for order aggregate
 * @module order-service/interfaces/controllers/rest
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
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser, Roles } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateOrderCommand } from '../../../application/commands/order/create-order.command.js';
import { UpdateOrderCommand } from '../../../application/commands/order/update-order.command.js';
import { DeleteOrderCommand } from '../../../application/commands/order/delete-order.command.js';
import { ConfirmOrderCommand } from '../../../application/commands/order/confirm-order.command.js';
import { HoldOrderCommand } from '../../../application/commands/order/hold-order.command.js';
import { ReleaseOrderCommand } from '../../../application/commands/order/release-order.command.js';
import { GetOrderQuery } from '../../../application/queries/order/get-order.query.js';
import { GetOrderByNumberQuery } from '../../../application/queries/order/get-order-by-number.query.js';
import { ListOrdersQuery } from '../../../application/queries/order/list-orders.query.js';
import { ListOrdersByCustomerQuery } from '../../../application/queries/order/list-orders-by-customer.query.js';
import { GetOrderStatsQuery } from '../../../application/queries/order/get-order-stats.query.js';

import type { OrderResponseDTO } from '../../../application/dtos/responses/order-response.dto.js';
import type { OrderListResponseDTO } from '../../../application/dtos/responses/order-list-response.dto.js';
import type { OrderStatsDTO } from '../../../application/services/interfaces/order.service.interface.js';
import type {
  CreateOrderRequestDTO,
  UpdateOrderRequestDTO,
  ConfirmOrderStatusRequestDTO,
  HoldOrderRequestDTO,
  ReleaseOrderRequestDTO,
} from '../../../application/dtos/requests/order/index.js';

@ApiTags('orders')
@ApiBearerAuth('bearer')
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  async create(
    @Body() dto: CreateOrderRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderResponseDTO> {
    return this.commandBus.execute(new CreateOrderCommand(dto, user.userId));
  }

  @Get()
  @ApiOperation({ summary: 'List orders (paginated)' })
  async list(
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('status') status?: string,
    @Query('customerId') customerId?: string,
    @Query('vendorId') vendorId?: string,
  ): Promise<OrderListResponseDTO> {
    return this.queryBus.execute(
      new ListOrdersQuery({
        page: Number(page),
        limit: Number(limit),
        filter: { status, customerId, vendorId },
      }),
    );
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get order statistics' })
  @Roles('admin', 'super_admin')
  async stats(
    @Query('customerId') customerId?: string,
    @Query('vendorId') vendorId?: string,
  ): Promise<OrderStatsDTO> {
    return this.queryBus.execute(new GetOrderStatsQuery(customerId, vendorId));
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'List orders by customer' })
  async listByCustomer(
    @Param('customerId') customerId: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ): Promise<OrderListResponseDTO> {
    return this.queryBus.execute(
      new ListOrdersByCustomerQuery(customerId, {
        page: Number(page),
        limit: Number(limit),
      }),
    );
  }

  @Get('number/:orderNumber')
  @ApiOperation({ summary: 'Get order by number' })
  async getByNumber(
    @Param('orderNumber') orderNumber: string,
  ): Promise<OrderResponseDTO> {
    return this.queryBus.execute(new GetOrderByNumberQuery(orderNumber));
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Get order by ID' })
  async getById(@Param('orderId') orderId: string): Promise<OrderResponseDTO> {
    return this.queryBus.execute(new GetOrderQuery(orderId));
  }

  @Patch(':orderId')
  @ApiOperation({ summary: 'Update order' })
  async update(
    @Param('orderId') orderId: string,
    @Body() dto: UpdateOrderRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderResponseDTO> {
    return this.commandBus.execute(
      new UpdateOrderCommand({ ...dto, orderId }, user.userId),
    );
  }

  @Post(':orderId/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm order' })
  async confirm(
    @Param('orderId') orderId: string,
    @Body() body: { paymentId?: string; notes?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderResponseDTO> {
    const dto: ConfirmOrderStatusRequestDTO = {
      orderId,
      paymentId: body.paymentId,
      notes: body.notes,
    };
    return this.commandBus.execute(new ConfirmOrderCommand(dto, user.userId));
  }

  @Post(':orderId/hold')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Put order on hold' })
  @Roles('admin', 'super_admin')
  async hold(
    @Param('orderId') orderId: string,
    @Body() body: { reason: string; holdUntil?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderResponseDTO> {
    const dto: HoldOrderRequestDTO = { orderId, reason: body.reason, holdUntil: body.holdUntil };
    return this.commandBus.execute(new HoldOrderCommand(dto, user.userId));
  }

  @Post(':orderId/release')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Release order from hold' })
  @Roles('admin', 'super_admin')
  async release(
    @Param('orderId') orderId: string,
    @Body() body: { note?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderResponseDTO> {
    const dto: ReleaseOrderRequestDTO = { orderId, note: body.note };
    return this.commandBus.execute(new ReleaseOrderCommand(dto, user.userId));
  }

  @Delete(':orderId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft-delete order' })
  @Roles('admin')
  async delete(
    @Param('orderId') orderId: string,
    @Query('reason') reason: string | undefined,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(new DeleteOrderCommand({ orderId, reason }, user.userId));
  }
}
