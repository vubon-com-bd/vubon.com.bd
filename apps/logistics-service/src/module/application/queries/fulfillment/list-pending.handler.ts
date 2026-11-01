import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPendingFulfillmentQuery } from './list-pending.query.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentListResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@QueryHandler(ListPendingFulfillmentQuery)
export class ListPendingFulfillmentHandler implements IQueryHandler<ListPendingFulfillmentQuery, FulfillmentListResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(): Promise<FulfillmentListResponseDTO> { return this.service.listPending(); }
}
