/**
 * GetPaymentHandler
 * @module payment-service/application/queries/payment
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPaymentQuery } from './get-payment.query.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '@application/services/interfaces/payment.service.interface.js';
import type { PaymentResponseDTO } from '@application/dtos/responses/payment-response.dto.js';

@QueryHandler(GetPaymentQuery)
export class GetPaymentHandler
  implements IQueryHandler<GetPaymentQuery, PaymentResponseDTO>
{
  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly service: IPaymentService,
  ) {}
  async execute(q: GetPaymentQuery): Promise<PaymentResponseDTO> {
    return this.service.getById(q.paymentId);
  }
}
