/**
 * ListReturnsHandler
 * @module order-service/application/queries/return
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListReturnsQuery } from './list-returns.query.js';
import {
  ORDER_RETURN_SERVICE,
  type IOrderReturnService,
} from '../../services/interfaces/order-return.service.interface.js';
import type { ReturnListResponseDTO } from '../../dtos/responses/return-response.dto.js';

@QueryHandler(ListReturnsQuery)
export class ListReturnsHandler
  implements IQueryHandler<ListReturnsQuery, ReturnListResponseDTO>
{
  constructor(
    @Inject(ORDER_RETURN_SERVICE)
    private readonly service: IOrderReturnService,
  ) {}

  async execute(q: ListReturnsQuery): Promise<ReturnListResponseDTO> {
    return this.service.list(q.options);
  }
}
