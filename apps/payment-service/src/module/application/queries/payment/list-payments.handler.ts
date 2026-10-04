import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPaymentsQuery } from './list-payments.query.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentListResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@QueryHandler(ListPaymentsQuery)
export class ListPaymentsHandler
  implements IQueryHandler<ListPaymentsQuery, PaymentListResponseDTO>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(q: ListPaymentsQuery): Promise<PaymentListResponseDTO> {
    return this.service.list(q.options);
  }
}
