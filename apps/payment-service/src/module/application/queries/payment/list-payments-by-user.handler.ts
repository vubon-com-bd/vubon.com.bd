import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPaymentsByUserQuery } from './list-payments-by-user.query.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentListResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@QueryHandler(ListPaymentsByUserQuery)
export class ListPaymentsByUserHandler
  implements IQueryHandler<ListPaymentsByUserQuery, PaymentListResponseDTO>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(q: ListPaymentsByUserQuery): Promise<PaymentListResponseDTO> {
    return this.service.listByUser(q.userId, q.options);
  }
}
