import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListFulfillmentsQuery } from './list-fulfillments.query.js';
import { ORDER_FULFILLMENT_SERVICE, type IOrderFulfillmentService } from '../../services/interfaces/order-fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto.js';

@QueryHandler(ListFulfillmentsQuery)
export class ListFulfillmentsHandler implements IQueryHandler<ListFulfillmentsQuery, readonly FulfillmentResponseDTO[]> {
  constructor(@Inject(ORDER_FULFILLMENT_SERVICE) private readonly service: IOrderFulfillmentService) {}
  async execute(q: ListFulfillmentsQuery): Promise<readonly FulfillmentResponseDTO[]> {
    return this.service.listByOrder(q.orderId);
  }
}
