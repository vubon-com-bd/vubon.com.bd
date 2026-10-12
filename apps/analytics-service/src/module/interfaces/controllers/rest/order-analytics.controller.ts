/**
 * OrderAnalytics Controller
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { GetOrderAnalyticsQuery } from '../../../application/queries/analytics/get-order-analytics.query.js';

@ApiTags('Analytics — OrderAnalytics')
@Controller('analytics/order')
@UseGuards(JwtAuthGuard)
export class OrderAnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async get(
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetOrderAnalyticsQuery(fromDate, toDate)
    );
  }
}
