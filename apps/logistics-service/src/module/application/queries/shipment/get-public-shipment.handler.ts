import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPublicShipmentQuery } from './get-public-shipment.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentPublicResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@QueryHandler(GetPublicShipmentQuery)
export class GetPublicShipmentHandler implements IQueryHandler<GetPublicShipmentQuery, ShipmentPublicResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: GetPublicShipmentQuery): Promise<ShipmentPublicResponseDTO> {
    return this.service.getPublic(q.shipmentId);
  }
}
