/**
 * UserAnalytics Controller
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { GetUserAnalyticsQuery } from '../../../application/queries/analytics/get-user-analytics.query.js';

@ApiTags('Analytics — UserAnalytics')
@Controller('analytics/user')
@UseGuards(JwtAuthGuard)
export class UserAnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async get(
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetUserAnalyticsQuery(fromDate, toDate)
    );
  }
}
