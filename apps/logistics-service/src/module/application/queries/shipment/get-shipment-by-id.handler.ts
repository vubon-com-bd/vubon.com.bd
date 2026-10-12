import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShipmentByIdQuery } from './get-shipment-by-id.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@QueryHandler(GetShipmentByIdQuery)
export class GetShipmentByIdHandler implements IQueryHandler<GetShipmentByIdQuery, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: GetShipmentByIdQuery): Promise<ShipmentResponseDTO> {
    return this.service.getById(q.shipmentId);
  }
}
