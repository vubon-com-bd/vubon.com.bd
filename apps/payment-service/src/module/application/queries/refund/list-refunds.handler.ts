/**
 * ListRefundsHandler
 * @module payment-service/application/queries/refund
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListRefundsQuery } from './list-refunds.query.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '@application/services/interfaces/refund.service.interface.js';
import type { RefundListResponseDTO } from '@application/dtos/responses/refund-response.dto.js';

@QueryHandler(ListRefundsQuery)
export class ListRefundsHandler
  implements IQueryHandler<ListRefundsQuery, RefundListResponseDTO>
{
  constructor(
    @Inject(REFUND_SERVICE)
    private readonly service: IRefundService,
  ) {}
  async execute(q: ListRefundsQuery): Promise<RefundListResponseDTO> {
    return this.service.list({
      page: q.page,
      limit: q.limit,
      filter: q.filter,
      sortBy: q.sortBy,
      sortDir: q.sortDir,
    });
  }
}
