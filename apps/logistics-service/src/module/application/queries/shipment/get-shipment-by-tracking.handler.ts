import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShipmentByTrackingQuery } from './get-shipment-by-tracking.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@QueryHandler(GetShipmentByTrackingQuery)
export class GetShipmentByTrackingHandler implements IQueryHandler<GetShipmentByTrackingQuery, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: GetShipmentByTrackingQuery): Promise<ShipmentResponseDTO> {
    return this.service.getByTrackingNumber(q.trackingNumber);
  }
}
