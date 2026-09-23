import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { StartFulfillmentCommand } from '../../../application/commands/fulfillment/start-fulfillment.command';
import { CompleteFulfillmentCommand } from '../../../application/commands/fulfillment/complete-fulfillment.command';
import { GetFulfillmentQuery } from '../../../application/queries/fulfillment/get-fulfillment.query';
import { ListFulfillmentsQuery } from '../../../application/queries/fulfillment/list-fulfillments.query';
import type { StartFulfillmentRequestDTO } from '../../dtos/requests/fulfillment.request.dto';

@Controller('logistics/fulfillments')
@UseGuards(JwtAuthGuard)
export class FulfillmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('start')
  @Permissions(LOGISTICS_PERMISSION.FULFILLMENT_MANAGE)
  async start(@Body() body: StartFulfillmentRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new StartFulfillmentCommand(
        body.orderId,
        body.warehouseId,
        body.type,
        body.strategy,
      ),
    );
  }

  @Get()
  @Permissions(LOGISTICS_PERMISSION.FULFILLMENT_VIEW)
  async list(
    @Query('orderId') orderId?: string,
    @Query('status') status?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListFulfillmentsQuery(orderId, status));
  }

  @Get(':id')
  @Permissions(LOGISTICS_PERMISSION.FULFILLMENT_VIEW)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetFulfillmentQuery(id));
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  @Permissions(LOGISTICS_PERMISSION.FULFILLMENT_MANAGE)
  async complete(@Param('id') id: string): Promise<unknown> {
    return this.commandBus.execute(new CompleteFulfillmentCommand(id));
  }
}
