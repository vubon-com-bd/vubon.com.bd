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
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { CreateOrderCommand } from '../../../application/commands/order/create-order.command';
import { UpdateOrderCommand } from '../../../application/commands/order/update-order.command';
import { DeleteOrderCommand } from '../../../application/commands/order/delete-order.command';
import { ConfirmOrderCommand } from '../../../application/commands/order/confirm-order.command';
import { HoldOrderCommand } from '../../../application/commands/order/hold-order.command';
import { ReleaseOrderCommand } from '../../../application/commands/order/release-order.command';
import { GetOrderQuery } from '../../../application/queries/order/get-order.query';
import { GetOrderByNumberQuery } from '../../../application/queries/order/get-order-by-number.query';
import { ListOrdersQuery } from '../../../application/queries/order/list-orders.query';
import { ListOrdersByCustomerQuery } from '../../../application/queries/order/list-orders-by-customer.query';
import { GetOrderStatsQuery } from '../../../application/queries/order/get-order-stats.query';
import {
  CreateOrderRequestDto,
  UpdateOrderRequestDto,
  ConfirmOrderRequestDto,
  HoldOrderRequestDto,
} from '../../dtos/requests/order.request.dto';
import { OrderSwagger } from '../../swagger/order.swagger';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PERMISSION.ORDER_VIEW)
  @OrderSwagger.Create()
  async create(@Body() body: CreateOrderRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CreateOrderCommand(
        body.customerId,
        body.items,
        body.channel ?? 'web',
        body.source ?? 'direct',
        body.vendorId,
        body.note,
      ),
    );
  }

  @Get()
  @Permissions(PERMISSION.ORDER_VIEW)
  @OrderSwagger.List()
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    const p = page ? Number(page) : 1;
    const l = limit ? Number(limit) : 20;
    return this.queryBus.execute(new ListOrdersQuery(p, l));
  }

  @Get('stats')
  @Permissions(PERMISSION.REPORT_VIEW)
  async stats(): Promise<unknown> {
    return this.queryBus.execute(new GetOrderStatsQuery());
  }

  @Get('number/:orderNumber')
  @Permissions(PERMISSION.ORDER_VIEW)
  async getByNumber(
    @Param('orderNumber') orderNumber: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetOrderByNumberQuery(orderNumber));
  }

  @Get('customer/:customerId')
  @Permissions(PERMISSION.ORDER_VIEW)
  async listByCustomer(
    @Param('customerId') customerId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListOrdersByCustomerQuery(customerId));
  }

  @Get(':id')
  @Permissions(PERMISSION.ORDER_VIEW)
  @OrderSwagger.Get()
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetOrderQuery(id));
  }

  @Patch(':id')
  @Permissions(PERMISSION.ORDER_UPDATE)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateOrderRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateOrderCommand(id, body.note, body.channel, body.source),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ORDER_UPDATE)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteOrderCommand(id));
  }

  @Post(':id/confirm')
  @Permissions(PERMISSION.ORDER_UPDATE)
  async confirm(
    @Param('id') id: string,
    @Body() body: ConfirmOrderRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(new ConfirmOrderCommand(id, body.paymentId));
  }

  @Post(':id/hold')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ORDER_UPDATE)
  async hold(
    @Param('id') id: string,
    @Body() body: HoldOrderRequestDto,
  ): Promise<void> {
    return this.commandBus.execute(new HoldOrderCommand(id, body.reason));
  }

  @Post(':id/release')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ORDER_UPDATE)
  async release(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new ReleaseOrderCommand(id));
  }
}
