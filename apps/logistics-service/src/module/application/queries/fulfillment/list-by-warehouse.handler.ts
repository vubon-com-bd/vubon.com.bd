import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListByWarehouseFulfillmentQuery } from './list-by-warehouse.query.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentListResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@QueryHandler(ListByWarehouseFulfillmentQuery)
export class ListByWarehouseFulfillmentHandler implements IQueryHandler<ListByWarehouseFulfillmentQuery, FulfillmentListResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(q: ListByWarehouseFulfillmentQuery): Promise<FulfillmentListResponseDTO> { return this.service.listByWarehouse(q.warehouseId); }
}
