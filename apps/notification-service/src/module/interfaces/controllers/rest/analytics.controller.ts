import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetDeliveryAnalyticsQuery } from '../../../application/queries/analytics/get-delivery-analytics.query';
import { GetChannelAnalyticsQuery } from '../../../application/queries/analytics/get-channel-analytics.query';
import { GetEngagementAnalyticsQuery } from '../../../application/queries/analytics/get-engagement-analytics.query';

@Controller('notifications/analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('delivery')
  async delivery(
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetDeliveryAnalyticsQuery(fromDate, toDate),
    );
  }

  @Get('channel')
  async channel(@Query('channel') channel: string): Promise<unknown> {
    return this.queryBus.execute(new GetChannelAnalyticsQuery(channel));
  }

  @Get('engagement')
  async engagement(
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetEngagementAnalyticsQuery(fromDate, toDate),
    );
  }
}
