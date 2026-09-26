import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPaymentMethodsAnalyticsQuery } from './get-payment-methods.query';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';

export interface MethodUsageView {
  readonly method: string;
  readonly count: number;
}

@QueryHandler(GetPaymentMethodsAnalyticsQuery)
export class GetPaymentMethodsAnalyticsHandler
  extends BaseQueryHandler<GetPaymentMethodsAnalyticsQuery, readonly MethodUsageView[]>
  implements IQueryHandler<GetPaymentMethodsAnalyticsQuery>
{
  readonly queryType = 'analytics.get-payment-methods';

  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
  ) {
    super();
  }

  async execute(_query: GetPaymentMethodsAnalyticsQuery): Promise<readonly MethodUsageView[]> {
    const all = await this.paymentRepo.findAll();
    void all;
    return [];
  }
}
