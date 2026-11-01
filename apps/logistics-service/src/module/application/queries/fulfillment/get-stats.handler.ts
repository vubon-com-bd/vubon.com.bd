import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetStatsFulfillmentQuery } from './get-stats.query.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentStatsResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@QueryHandler(GetStatsFulfillmentQuery)
export class GetStatsFulfillmentHandler implements IQueryHandler<GetStatsFulfillmentQuery, FulfillmentStatsResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(): Promise<FulfillmentStatsResponseDTO> { return this.service.getStats(); }
}
