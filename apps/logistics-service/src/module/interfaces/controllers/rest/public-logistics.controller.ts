import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Public } from '@vubon/shared-kernel/interfaces';
import { GetTrackingQuery } from '../../../application/queries/tracking/get-tracking.query';

@Controller('public/logistics')
export class PublicLogisticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Get('track/:trackingNumber')
  async track(@Param('trackingNumber') trackingNumber: string): Promise<unknown> {
    return this.queryBus.execute(new GetTrackingQuery(trackingNumber));
  }
}
