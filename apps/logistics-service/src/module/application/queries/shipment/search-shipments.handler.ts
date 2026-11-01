import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SearchShipmentsQuery } from './search-shipments.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentListResponseDTO } from '@application/dtos/responses/shipment/index.js';

@QueryHandler(SearchShipmentsQuery)
export class SearchShipmentsHandler implements IQueryHandler<SearchShipmentsQuery, ShipmentListResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: SearchShipmentsQuery): Promise<ShipmentListResponseDTO> {
    return this.service.search(q.query, q.options);
  }
}
