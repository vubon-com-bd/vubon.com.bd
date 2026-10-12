/**
 * VendorAnalytics Controller
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { GetVendorAnalyticsQuery } from '../../../application/queries/analytics/get-vendor-analytics.query.js';

@ApiTags('Analytics — VendorAnalytics')
@Controller('analytics/vendor')
@UseGuards(JwtAuthGuard)
export class VendorAnalyticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async get(
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetVendorAnalyticsQuery(fromDate, toDate)
    );
  }
}
