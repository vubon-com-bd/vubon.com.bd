import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { StartFulfillmentCommand } from '../../../application/commands/fulfillment/start-fulfillment.command';
import { PackOrderCommand } from '../../../application/commands/fulfillment/pack-order.command';
import { ShipOrderCommand } from '../../../application/commands/fulfillment/ship-order.command';
import { CompleteFulfillmentCommand } from '../../../application/commands/fulfillment/complete-fulfillment.command';
import { GetFulfillmentByOrderQuery } from '../../../application/queries/fulfillment/get-fulfillment-by-order.query';
import {
  StartFulfillmentRequestDto,
  PackOrderRequestDto,
  ShipOrderRequestDto,
} from '../../dtos/requests/fulfillment.request.dto';
import { FulfillmentSwagger } from '../../swagger/fulfillment.swagger';

@ApiTags('Fulfillment')
@Controller('fulfillments')
@UseGuards(JwtAuthGuard)
export class FulfillmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PERMISSION.ORDER_UPDATE)
  @FulfillmentSwagger.Start()
  async start(@Body() body: StartFulfillmentRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new StartFulfillmentCommand(body.orderId, body.vendorId),
    );
  }

  @Get('order/:orderId')
  @FulfillmentSwagger.Get()
  async getByOrder(@Param('orderId') orderId: string): Promise<unknown> {
    return this.queryBus.execute(new GetFulfillmentByOrderQuery(orderId));
  }

  @Post(':id/pack')
  async pack(
    @Param('id') id: string,
    @Body() body: PackOrderRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(new PackOrderCommand(id, body.packedBy));
  }

  @Post(':id/ship')
  async ship(
    @Param('id') id: string,
    @Body() body: ShipOrderRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ShipOrderCommand(id, body.trackingNumber),
    );
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async complete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new CompleteFulfillmentCommand(id));
  }
}
