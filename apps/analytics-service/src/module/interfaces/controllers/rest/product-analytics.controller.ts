/**
 * ProductAnalytics Controller
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { GetProductAnalyticsQuery } from '../../../application/queries/analytics/get-product-analytics.query.js';

@ApiTags('Analytics — ProductAnalytics')
@Controller('analytics/product')
@UseGuards(JwtAuthGuard)
export class ProductAnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async get(
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetProductAnalyticsQuery(fromDate, toDate)
    );
  }
}
