import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPaymentsByOrderQuery } from './list-payments-by-order.query.js';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '../../services/interfaces/payment.service.interface.js';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto.js';

@QueryHandler(ListPaymentsByOrderQuery)
export class ListPaymentsByOrderHandler
  implements IQueryHandler<ListPaymentsByOrderQuery, readonly PaymentResponseDTO[]>
{
  constructor(@Inject(PAYMENT_SERVICE) private readonly service: IPaymentService) {}

  async execute(q: ListPaymentsByOrderQuery): Promise<readonly PaymentResponseDTO[]> {
    return this.service.listByOrder(q.orderId);
  }
}
