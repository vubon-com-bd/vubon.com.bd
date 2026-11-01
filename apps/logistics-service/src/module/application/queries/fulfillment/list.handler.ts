import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListFulfillmentQuery } from './list.query.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentListResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@QueryHandler(ListFulfillmentQuery)
export class ListFulfillmentHandler implements IQueryHandler<ListFulfillmentQuery, FulfillmentListResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(q: ListFulfillmentQuery): Promise<FulfillmentListResponseDTO> { return this.service.list(q.options); }
}
