/**
 * RealTimeAnalytics Controller
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { GetRealTimeAnalyticsQuery } from '../../../application/queries/analytics/get-real-time-analytics.query.js';

@ApiTags('Analytics — RealTimeAnalytics')
@Controller('analytics/real-time')
@UseGuards(JwtAuthGuard)
export class RealTimeAnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async get(
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetRealTimeAnalyticsQuery(fromDate, toDate)
    );
  }
}
