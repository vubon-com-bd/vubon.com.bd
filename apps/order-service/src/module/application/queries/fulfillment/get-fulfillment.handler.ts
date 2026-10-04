import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetFulfillmentQuery } from './get-fulfillment.query.js';
import { ORDER_FULFILLMENT_SERVICE, type IOrderFulfillmentService } from '../../services/interfaces/order-fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto.js';

@QueryHandler(GetFulfillmentQuery)
export class GetFulfillmentHandler implements IQueryHandler<GetFulfillmentQuery, FulfillmentResponseDTO> {
  constructor(@Inject(ORDER_FULFILLMENT_SERVICE) private readonly service: IOrderFulfillmentService) {}
  async execute(q: GetFulfillmentQuery): Promise<FulfillmentResponseDTO> {
    return this.service.getById(q.fulfillmentId);
  }
}
