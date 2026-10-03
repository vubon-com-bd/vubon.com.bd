import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListReturnsQuery } from './list-returns.query.js';
import { ORDER_RETURN_SERVICE, type IOrderReturnService } from '../../services/interfaces/order-return.service.interface.js';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto.js';

@QueryHandler(ListReturnsQuery)
export class ListReturnsHandler implements IQueryHandler<ListReturnsQuery, readonly ReturnResponseDTO[]> {
  constructor(@Inject(ORDER_RETURN_SERVICE) private readonly service: IOrderReturnService) {}
  async execute(q: ListReturnsQuery): Promise<readonly ReturnResponseDTO[]> {
    return this.service.listByOrder(q.orderId);
  }
}
