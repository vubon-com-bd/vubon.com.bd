import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetFulfillmentQuery } from './get.query.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@QueryHandler(GetFulfillmentQuery)
export class GetFulfillmentHandler implements IQueryHandler<GetFulfillmentQuery, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(q: GetFulfillmentQuery): Promise<FulfillmentResponseDTO> { return this.service.getById(q.fulfillmentId); }
}
