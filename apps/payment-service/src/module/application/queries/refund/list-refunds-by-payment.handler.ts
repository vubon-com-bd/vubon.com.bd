import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListRefundsByPaymentQuery } from './list-refunds-by-payment.query.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '../../services/interfaces/refund.service.interface.js';
import type { RefundResponseDTO } from '../../dtos/responses/refund-response.dto.js';

@QueryHandler(ListRefundsByPaymentQuery)
export class ListRefundsByPaymentHandler
  implements IQueryHandler<ListRefundsByPaymentQuery, readonly RefundResponseDTO[]>
{
  constructor(@Inject(REFUND_SERVICE) private readonly service: IRefundService) {}

  async execute(q: ListRefundsByPaymentQuery): Promise<readonly RefundResponseDTO[]> {
    return this.service.listByPayment(q.paymentId);
  }
}
