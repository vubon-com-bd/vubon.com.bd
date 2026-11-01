import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListShipmentsByVendorQuery } from './list-shipments-by-vendor.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentListResponseDTO } from '@application/dtos/responses/shipment/index.js';

@QueryHandler(ListShipmentsByVendorQuery)
export class ListShipmentsByVendorHandler implements IQueryHandler<ListShipmentsByVendorQuery, ShipmentListResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: ListShipmentsByVendorQuery): Promise<ShipmentListResponseDTO> {
    return this.service.listByVendor(q.vendorId, q.options);
  }
}
