import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListByOrderFulfillmentQuery } from './list-by-order.query.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentListResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@QueryHandler(ListByOrderFulfillmentQuery)
export class ListByOrderFulfillmentHandler implements IQueryHandler<ListByOrderFulfillmentQuery, FulfillmentListResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(q: ListByOrderFulfillmentQuery): Promise<FulfillmentListResponseDTO> { return this.service.listByOrder(q.orderId); }
}
