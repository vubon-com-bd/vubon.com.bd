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
import { ScheduleDeliveryCommand } from '../../../application/commands/delivery/schedule-delivery.command';
import { CompleteDeliveryCommand } from '../../../application/commands/delivery/complete-delivery.command';
import { FailDeliveryCommand } from '../../../application/commands/delivery/fail-delivery.command';
import { GetDeliveryQuery } from '../../../application/queries/delivery/get-delivery.query';
import { ListDeliveriesQuery } from '../../../application/queries/delivery/list-deliveries.query';

@Controller('logistics/deliveries')
@UseGuards(JwtAuthGuard)
export class DeliveryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('schedule')
  @Permissions(LOGISTICS_PERMISSION.DELIVERY_MANAGE)
  async schedule(
    @Body() body: { shipmentId: string; scheduledAt?: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ScheduleDeliveryCommand(body.shipmentId, body.scheduledAt),
    );
  }

  @Get('shipment/:shipmentId')
  @Permissions(LOGISTICS_PERMISSION.DELIVERY_VIEW)
  async listByShipment(
    @Param('shipmentId') shipmentId: string,
    @Query('status') status?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListDeliveriesQuery(shipmentId, status));
  }

  @Get(':id')
  @Permissions(LOGISTICS_PERMISSION.DELIVERY_VIEW)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetDeliveryQuery(id));
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  @Permissions(LOGISTICS_PERMISSION.DELIVERY_MANAGE)
  async complete(
    @Param('id') id: string,
    @Body() body: { signature?: string; photoUrl?: string; otp?: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CompleteDeliveryCommand(id, body.signature, body.photoUrl, body.otp),
    );
  }

  @Post(':id/fail')
  @HttpCode(HttpStatus.OK)
  @Permissions(LOGISTICS_PERMISSION.DELIVERY_MANAGE)
  async fail(
    @Param('id') id: string,
    @Body() body: { reason: string },
  ): Promise<unknown> {
    return this.commandBus.execute(new FailDeliveryCommand(id, body.reason));
  }
}
