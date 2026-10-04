import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListRefundsQuery } from './list-refunds.query.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '../../services/interfaces/refund.service.interface.js';
import type { RefundListResponseDTO } from '../../dtos/responses/refund-response.dto.js';

@QueryHandler(ListRefundsQuery)
export class ListRefundsHandler
  implements IQueryHandler<ListRefundsQuery, RefundListResponseDTO>
{
  constructor(@Inject(REFUND_SERVICE) private readonly service: IRefundService) {}

  async execute(q: ListRefundsQuery): Promise<RefundListResponseDTO> {
    return this.service.list(q.options);
  }
}
