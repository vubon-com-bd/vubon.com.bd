import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPaymentDetailQuery } from './get-payment-detail.query.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentDetailResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@QueryHandler(GetPaymentDetailQuery)
export class GetPaymentDetailHandler
  implements IQueryHandler<GetPaymentDetailQuery, PaymentDetailResponseDTO>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(q: GetPaymentDetailQuery): Promise<PaymentDetailResponseDTO> {
    return this.service.getDetail(q.paymentId);
  }
}
