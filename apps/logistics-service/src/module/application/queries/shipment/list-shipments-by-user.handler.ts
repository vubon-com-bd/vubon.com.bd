import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListShipmentsByUserQuery } from './list-shipments-by-user.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentListResponseDTO } from '@application/dtos/responses/shipment/index.js';

@QueryHandler(ListShipmentsByUserQuery)
export class ListShipmentsByUserHandler implements IQueryHandler<ListShipmentsByUserQuery, ShipmentListResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: ListShipmentsByUserQuery): Promise<ShipmentListResponseDTO> {
    return this.service.listByUser(q.userId, q.options);
  }
}
