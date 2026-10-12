import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListFulfillmentsQuery } from './list-fulfillments.query.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentListResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';
@QueryHandler(ListFulfillmentsQuery)
export class ListFulfillmentsHandler implements IQueryHandler<ListFulfillmentsQuery, FulfillmentListResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(q: ListFulfillmentsQuery): Promise<FulfillmentListResponseDTO> { return this.service.list(q.options); }
}
