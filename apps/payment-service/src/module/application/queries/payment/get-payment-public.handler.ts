import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPaymentPublicQuery } from './get-payment-public.query.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentPublicResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@QueryHandler(GetPaymentPublicQuery)
export class GetPaymentPublicHandler
  implements IQueryHandler<GetPaymentPublicQuery, PaymentPublicResponseDTO>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(q: GetPaymentPublicQuery): Promise<PaymentPublicResponseDTO> {
    return this.service.getPublic(q.paymentId);
  }
}
