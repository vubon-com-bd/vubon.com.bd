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
import { ScheduleDeliveryCommand } from '../../../application/commands/delivery/schedule-delivery.command';
import { RescheduleDeliveryCommand } from '../../../application/commands/delivery/reschedule-delivery.command';
import { ConfirmDeliveryCommand } from '../../../application/commands/delivery/confirm-delivery.command';
import { GetDeliveryByOrderQuery } from '../../../application/queries/delivery/get-delivery-by-order.query';
import { GetDeliveryMethodsQuery } from '../../../application/queries/delivery/get-delivery-methods.query';
import {
  ScheduleDeliveryRequestDto,
  RescheduleDeliveryRequestDto,
} from '../../dtos/requests/delivery.request.dto';
import { DeliverySwagger } from '../../swagger/delivery.swagger';

@ApiTags('Delivery')
@Controller('deliveries')
@UseGuards(JwtAuthGuard)
export class DeliveryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PERMISSION.ORDER_UPDATE)
  @DeliverySwagger.Schedule()
  async schedule(@Body() body: ScheduleDeliveryRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new ScheduleDeliveryCommand(
        body.orderId,
        body.deliveryType,
        body.methodId,
        body.scheduledAt,
      ),
    );
  }

  @Get('methods')
  async listMethods(): Promise<unknown> {
    return this.queryBus.execute(new GetDeliveryMethodsQuery());
  }

  @Get('order/:orderId')
  @DeliverySwagger.Get()
  async getByOrder(@Param('orderId') orderId: string): Promise<unknown> {
    return this.queryBus.execute(new GetDeliveryByOrderQuery(orderId));
  }

  @Post(':id/reschedule')
  async reschedule(
    @Param('id') id: string,
    @Body() body: RescheduleDeliveryRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RescheduleDeliveryCommand(id, body.scheduledAt),
    );
  }

  @Post(':id/confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ORDER_UPDATE)
  async confirm(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new ConfirmDeliveryCommand(id));
  }
}
