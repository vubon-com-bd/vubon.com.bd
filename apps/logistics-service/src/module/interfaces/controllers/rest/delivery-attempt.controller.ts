import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { GetDeliveryAttemptsQuery } from '../../../application/queries/delivery/get-delivery-attempts.query';

@Controller('logistics/delivery-attempts')
@UseGuards(JwtAuthGuard)
export class DeliveryAttemptController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('delivery/:deliveryId')
  @Permissions(LOGISTICS_PERMISSION.DELIVERY_VIEW)
  async listByDelivery(@Param('deliveryId') deliveryId: string): Promise<unknown> {
    return this.queryBus.execute(new GetDeliveryAttemptsQuery(deliveryId));
  }
}
