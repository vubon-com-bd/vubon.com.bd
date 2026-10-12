import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetFulfillmentQuery } from './get-fulfillment.query.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';
@QueryHandler(GetFulfillmentQuery)
export class GetFulfillmentHandler implements IQueryHandler<GetFulfillmentQuery, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(q: GetFulfillmentQuery): Promise<FulfillmentResponseDTO> { return this.service.getById(q.fulfillmentId); }
}
