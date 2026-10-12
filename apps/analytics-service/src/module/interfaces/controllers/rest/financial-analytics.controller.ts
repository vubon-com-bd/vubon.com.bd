/**
 * FinancialAnalytics Controller
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { GetFinancialAnalyticsQuery } from '../../../application/queries/analytics/get-financial-analytics.query.js';

@ApiTags('Analytics — FinancialAnalytics')
@Controller('analytics/financial')
@UseGuards(JwtAuthGuard)
export class FinancialAnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async get(
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetFinancialAnalyticsQuery(fromDate, toDate)
    );
  }
}
