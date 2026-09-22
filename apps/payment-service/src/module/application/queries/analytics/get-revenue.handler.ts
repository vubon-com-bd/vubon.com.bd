import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetRevenueQuery } from './get-revenue.query';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';

export interface RevenueView {
  readonly totalAmount: number;
  readonly currency: string;
  readonly paymentCount: number;
  readonly fromDate: string;
  readonly toDate: string;
}

@QueryHandler(GetRevenueQuery)
export class GetRevenueHandler
  extends BaseQueryHandler<GetRevenueQuery, RevenueView>
  implements IQueryHandler<GetRevenueQuery>
{
  readonly queryType = 'analytics.get-revenue';

  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
  ) {
    super();
  }

  async execute(query: GetRevenueQuery): Promise<RevenueView> {
    const all = await this.paymentRepo.findAll();
    void all;
    return {
      totalAmount: 0,
      currency: query.currency,
      paymentCount: 0,
      fromDate: query.fromDate,
      toDate: query.toDate,
    };
  }
}
