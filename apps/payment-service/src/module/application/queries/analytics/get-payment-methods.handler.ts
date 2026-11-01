/**
 * GetPaymentMethodsAnalyticsHandler
 * @module payment-service/application/queries/analytics
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPaymentMethodsAnalyticsQuery } from './get-payment-methods.query.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '@application/services/interfaces/payment.service.interface.js';
import type { PaymentStatsResponseDTO } from '@application/dtos/responses/payment-response.dto.js';

@QueryHandler(GetPaymentMethodsAnalyticsQuery)
export class GetPaymentMethodsAnalyticsHandler
  implements IQueryHandler<GetPaymentMethodsAnalyticsQuery, PaymentStatsResponseDTO>
{
  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly service: IPaymentService,
  ) {}
  async execute(q: GetPaymentMethodsAnalyticsQuery): Promise<PaymentStatsResponseDTO> {
    return this.service.getStats(q.userId);
  }
}
