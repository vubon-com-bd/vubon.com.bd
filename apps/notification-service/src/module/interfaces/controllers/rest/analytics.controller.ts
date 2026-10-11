/**
 * AnalyticsController — REST endpoints for notification analytics
 * @module notification-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { GetAnalyticsOverviewQuery } from '../../../application/queries/analytics/get-analytics-overview.query.js';
import { GetAnalyticsTimeSeriesQuery } from '../../../application/queries/analytics/get-analytics-time-series.query.js';
import { GetChannelPerformanceQuery } from '../../../application/queries/analytics/get-channel-performance.query.js';

import {
  AnalyticsOverviewHttpQueryDTO,
  AnalyticsTimeSeriesHttpQueryDTO,
  ChannelPerformanceHttpQueryDTO,
  GenerateReportHttpDTO,
} from '../../dtos/requests/analytics/analytics.http-dto.js';

// Local report command (no CQRS yet — direct service call would go here)
@ApiTags('analytics')
@ApiBearerAuth('bearer')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {
    super();
  }

  @Get('overview')
  @ApiOperation({ summary: 'Analytics overview' })
  async overview(@Query() q: AnalyticsOverviewHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new GetAnalyticsOverviewQuery({
        userId: q.userId,
        fromDate: q.fromDate,
        toDate: q.toDate,
        channel: q.channel,
        category: q.category,
      }),
    );
  }

  @Get('time-series')
  @ApiOperation({ summary: 'Analytics time series' })
  async timeSeries(@Query() q: AnalyticsTimeSeriesHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new GetAnalyticsTimeSeriesQuery({
        userId: q.userId,
        fromDate: q.fromDate,
        toDate: q.toDate,
        interval: q.interval,
        channel: q.channel,
      }),
    );
  }

  @Get('channel-performance')
  @ApiOperation({ summary: 'Channel performance comparison' })
  async channelPerformance(@Query() q: ChannelPerformanceHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new GetChannelPerformanceQuery(q.fromDate, q.toDate),
    );
  }

  @Post('reports')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Generate an analytics report' })
  async generateReport(
    @Body() dto: GenerateReportHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    // Report generation command not yet defined — stub with a simple response
    return {
      reportType: dto.reportType,
      format: dto.format,
      generatedAt: new Date().toISOString(),
      requestedBy: user.userId,
      data: {},
    };
  }
}
