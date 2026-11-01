import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListByVendorFulfillmentQuery } from './list-by-vendor.query.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentListResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@QueryHandler(ListByVendorFulfillmentQuery)
export class ListByVendorFulfillmentHandler implements IQueryHandler<ListByVendorFulfillmentQuery, FulfillmentListResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(q: ListByVendorFulfillmentQuery): Promise<FulfillmentListResponseDTO> { return this.service.listByVendor(q.vendorId); }
}
