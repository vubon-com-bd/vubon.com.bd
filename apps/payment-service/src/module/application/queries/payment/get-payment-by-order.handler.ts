/**
 * GetPaymentByOrderHandler
 * @module payment-service/application/queries/payment
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPaymentByOrderQuery } from './get-payment-by-order.query.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '@application/services/interfaces/payment.service.interface.js';
import type { PaymentListResponseDTO } from '@application/dtos/responses/payment-response.dto.js';

@QueryHandler(GetPaymentByOrderQuery)
export class GetPaymentByOrderHandler
  implements IQueryHandler<GetPaymentByOrderQuery, PaymentListResponseDTO>
{
  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly service: IPaymentService,
  ) {}
  async execute(q: GetPaymentByOrderQuery): Promise<PaymentListResponseDTO> {
    return this.service.list({
      page: 1,
      limit: 50,
      filter: { orderId: q.orderId },
    });
  }
}
