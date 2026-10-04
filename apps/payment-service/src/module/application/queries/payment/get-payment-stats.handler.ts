import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPaymentStatsQuery } from './get-payment-stats.query.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentStatsResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@QueryHandler(GetPaymentStatsQuery)
export class GetPaymentStatsHandler
  implements IQueryHandler<GetPaymentStatsQuery, PaymentStatsResponseDTO>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(q: GetPaymentStatsQuery): Promise<PaymentStatsResponseDTO> {
    return this.service.getStats(q.userId, q.gateway);
  }
}
