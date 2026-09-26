import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { ListTrackingEventsQuery } from '../../../application/queries/tracking/list-tracking-events.query';

@Controller('logistics/tracking-events')
@UseGuards(JwtAuthGuard)
export class TrackingEventController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('tracking/:trackingId')
  @Permissions(LOGISTICS_PERMISSION.SHIPMENT_VIEW)
  async list(
    @Param('trackingId') trackingId: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListTrackingEventsQuery(trackingId, limit ? Number(limit) : 50),
    );
  }
}
