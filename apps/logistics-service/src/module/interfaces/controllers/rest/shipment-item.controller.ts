import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';

@Controller('logistics/shipment-items')
@UseGuards(JwtAuthGuard)
export class ShipmentItemController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('shipment/:shipmentId')
  @Permissions(LOGISTICS_PERMISSION.SHIPMENT_VIEW)
  async listByShipment(@Param('shipmentId') shipmentId: string): Promise<unknown> {
    void this.queryBus;
    return { shipmentId, items: [] };
  }
}
