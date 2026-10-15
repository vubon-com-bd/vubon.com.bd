import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListAbandonedQuery } from './list-abandoned.query.js';
import {
  ABANDONED_CART_SERVICE,
  type IAbandonedCartService,
} from '../../services/interfaces/abandoned-cart.service.interface.js';
import type { AbandonedCartListResponseDTO } from '../../dtos/responses/abandoned-cart-response.dto.js';

@QueryHandler(ListAbandonedQuery)
export class ListAbandonedHandler
  implements IQueryHandler<ListAbandonedQuery, AbandonedCartListResponseDTO>
{
  constructor(
    @Inject(ABANDONED_CART_SERVICE)
    private readonly service: IAbandonedCartService,
  ) {}

  async execute(q: ListAbandonedQuery): Promise<AbandonedCartListResponseDTO> {
    return this.service.list(q.options);
  }
}
