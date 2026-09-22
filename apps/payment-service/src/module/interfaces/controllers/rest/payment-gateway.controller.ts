import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { ListGatewaysQuery } from '../../../application/queries/gateway/list-gateways.query';
import { GetGatewayQuery } from '../../../application/queries/gateway/get-gateway.query';
import { GetRevenueQuery } from '../../../application/queries/analytics/get-revenue.query';

@Controller('v1/payment-gateways')
@UseGuards(JwtAuthGuard)
export class PaymentGatewayController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListGatewaysQuery());
  }

  @Get('revenue')
  async revenue(
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
    @Query('currency') currency?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetRevenueQuery(fromDate, toDate, currency ?? 'BDT'),
    );
  }

  @Get(':gateway')
  async get(@Param('gateway') gateway: string): Promise<unknown> {
    return this.queryBus.execute(new GetGatewayQuery(gateway));
  }
}
