import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListCancelsQuery } from './list-cancels.query.js';
import { ORDER_CANCEL_SERVICE, type IOrderCancelService } from '../../services/interfaces/order-cancel.service.interface.js';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto.js';

@QueryHandler(ListCancelsQuery)
export class ListCancelsHandler implements IQueryHandler<ListCancelsQuery, readonly CancelResponseDTO[]> {
  constructor(@Inject(ORDER_CANCEL_SERVICE) private readonly service: IOrderCancelService) {}
  async execute(q: ListCancelsQuery): Promise<readonly CancelResponseDTO[]> {
    return this.service.listByOrder(q.orderId);
  }
}
