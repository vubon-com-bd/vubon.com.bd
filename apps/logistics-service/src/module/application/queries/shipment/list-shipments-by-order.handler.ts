import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListShipmentsByOrderQuery } from './list-shipments-by-order.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentListResponseDTO } from '@application/dtos/responses/shipment/index.js';

@QueryHandler(ListShipmentsByOrderQuery)
export class ListShipmentsByOrderHandler implements IQueryHandler<ListShipmentsByOrderQuery, ShipmentListResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: ListShipmentsByOrderQuery): Promise<ShipmentListResponseDTO> {
    return this.service.listByOrder(q.orderId);
  }
}
