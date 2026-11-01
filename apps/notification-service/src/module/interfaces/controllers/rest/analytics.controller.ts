/**
 * AnalyticsController
 * @module notification-service/interfaces/controllers/rest
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { GetDeliveryRateQuery } from '@application/queries/analytics/get-delivery-rate.query.js';
import { GetChannelStatsQuery } from '@application/queries/analytics/get-channel-stats.query.js';
import { GetEngagementQuery } from '@application/queries/analytics/get-engagement.query.js';
import { GetTemplatePerformanceQuery } from '@application/queries/analytics/get-template-performance.query.js';

@ApiTags('analytics')
@ApiBearerAuth('bearer')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  @Get('delivery-rate')
  @ApiOperation({ summary: 'Get notification delivery rate' })
  async deliveryRate(
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
    @Query('channel') channel?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetDeliveryRateQuery(fromDate, toDate, channel),
    );
  }

  @Get('channels')
  @ApiOperation({ summary: 'Get channel statistics' })
  async channels(
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetChannelStatsQuery(fromDate, toDate));
  }

  @Get('engagement')
  @ApiOperation({ summary: 'Get engagement metrics' })
  async engagement(
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetEngagementQuery(fromDate, toDate));
  }

  @Get('template-performance')
  @ApiOperation({ summary: 'Get template performance' })
  async templatePerformance(
    @Query('templateId') templateId: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetTemplatePerformanceQuery(templateId, fromDate, toDate),
    );
  }
}
