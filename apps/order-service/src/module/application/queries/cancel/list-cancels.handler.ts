/**
 * ListCancelsHandler
 * @module order-service/application/queries/cancel
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListCancelsQuery } from './list-cancels.query.js';
import {
  ORDER_CANCEL_SERVICE,
  type IOrderCancelService,
} from '../../services/interfaces/order-cancel.service.interface.js';
import type { CancelListResponseDTO } from '../../dtos/responses/cancel-response.dto.js';

@QueryHandler(ListCancelsQuery)
export class ListCancelsHandler
  implements IQueryHandler<ListCancelsQuery, CancelListResponseDTO>
{
  constructor(
    @Inject(ORDER_CANCEL_SERVICE)
    private readonly service: IOrderCancelService,
  ) {}

  async execute(q: ListCancelsQuery): Promise<CancelListResponseDTO> {
    return this.service.list(q.options);
  }
}
