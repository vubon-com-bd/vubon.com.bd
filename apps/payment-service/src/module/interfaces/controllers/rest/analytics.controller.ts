/**
 * AnalyticsController
 * @module payment-service/interfaces/controllers/rest
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { GetRevenueQuery } from '@application/queries/analytics/get-revenue.query';
import { GetPaymentMethodsAnalyticsQuery } from '@application/queries/analytics/get-payment-methods.query';

@ApiTags('analytics')
@ApiBearerAuth('bearer')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  @Get('revenue')
  async revenue(
    @Query('userId') userId?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetRevenueQuery(userId, fromDate, toDate));
  }

  @Get('payment-methods')
  async paymentMethods(
    @Query('userId') userId?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetPaymentMethodsAnalyticsQuery(userId, fromDate, toDate),
    );
  }
}
