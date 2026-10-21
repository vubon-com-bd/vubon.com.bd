/**
 * GetRevenueHandler
 * @module payment-service/application/queries/analytics
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetRevenueQuery } from './get-revenue.query.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '@application/services/interfaces/payment.service.interface.js';
import type { PaymentStatsResponseDTO } from '@application/dtos/responses/payment-response.dto.js';

@QueryHandler(GetRevenueQuery)
export class GetRevenueHandler
  implements IQueryHandler<GetRevenueQuery, PaymentStatsResponseDTO>
{
  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly service: IPaymentService,
  ) {}
  async execute(q: GetRevenueQuery): Promise<PaymentStatsResponseDTO> {
    return this.service.getStats(q.userId);
  }
}
