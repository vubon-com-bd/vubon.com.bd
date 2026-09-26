import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  JwtAuthGuard,
  Permissions,
  Public,
} from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { GetTrackingQuery } from '../../../application/queries/tracking/get-tracking.query';
import { GetTrackingByShipmentQuery } from '../../../application/queries/tracking/get-tracking-by-shipment.query';

@Controller('logistics/tracking')
export class TrackingController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Get(':trackingNumber')
  async get(@Param('trackingNumber') trackingNumber: string): Promise<unknown> {
    return this.queryBus.execute(new GetTrackingQuery(trackingNumber));
  }

  @UseGuards(JwtAuthGuard)
  @Get('shipment/:shipmentId')
  @Permissions(LOGISTICS_PERMISSION.SHIPMENT_VIEW)
  async getByShipment(@Param('shipmentId') shipmentId: string): Promise<unknown> {
    return this.queryBus.execute(new GetTrackingByShipmentQuery(shipmentId));
  }
}
