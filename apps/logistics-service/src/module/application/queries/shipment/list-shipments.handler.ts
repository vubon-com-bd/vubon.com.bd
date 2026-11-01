import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListShipmentsQuery } from './list-shipments.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentListResponseDTO } from '@application/dtos/responses/shipment/index.js';

@QueryHandler(ListShipmentsQuery)
export class ListShipmentsHandler implements IQueryHandler<ListShipmentsQuery, ShipmentListResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: ListShipmentsQuery): Promise<ShipmentListResponseDTO> {
    return this.service.list(q.options);
  }
}
