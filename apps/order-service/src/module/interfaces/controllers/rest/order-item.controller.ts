import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { AddOrderItemCommand } from '../../../application/commands/order-item/add-order-item.command';
import { UpdateOrderItemCommand } from '../../../application/commands/order-item/update-order-item.command';
import { RemoveOrderItemCommand } from '../../../application/commands/order-item/remove-order-item.command';
import { ListOrderItemsQuery } from '../../../application/queries/order-item/list-order-items.query';
import { GetOrderItemQuery } from '../../../application/queries/order-item/get-order-item.query';

interface AddItemBody {
  orderId: string;
  productId: string;
  variantId?: string;
  productName: string;
  quantity: number;
  price: number;
}

interface UpdateItemBody {
  quantity?: number;
  price?: number;
}

@ApiTags('Order Items')
@Controller('orders/:orderId/items')
@UseGuards(JwtAuthGuard)
export class OrderItemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@Param('orderId') orderId: string): Promise<unknown> {
    return this.queryBus.execute(new ListOrderItemsQuery(orderId));
  }

  @Get(':itemId')
  async get(@Param('itemId') itemId: string): Promise<unknown> {
    return this.queryBus.execute(new GetOrderItemQuery(itemId));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(
    @Param('orderId') orderId: string,
    @Body() body: AddItemBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddOrderItemCommand(
        orderId,
        body.productId,
        body.productName,
        body.quantity,
        body.price,
        body.variantId,
      ),
    );
  }

  @Put(':itemId')
  async update(
    @Param('itemId') itemId: string,
    @Body() body: UpdateItemBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateOrderItemCommand(itemId, body.quantity, body.price),
    );
  }

  @Delete(':itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('itemId') itemId: string): Promise<void> {
    return this.commandBus.execute(new RemoveOrderItemCommand(itemId));
  }
}
