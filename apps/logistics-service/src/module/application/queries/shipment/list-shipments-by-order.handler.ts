import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListShipmentsByOrderQuery } from './list-shipments-by-order.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@QueryHandler(ListShipmentsByOrderQuery)
export class ListShipmentsByOrderHandler implements IQueryHandler<ListShipmentsByOrderQuery, readonly ShipmentResponseDTO[]> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: ListShipmentsByOrderQuery): Promise<readonly ShipmentResponseDTO[]> {
    return this.service.listByOrder(q.orderId);
  }
}
