import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShipmentByTrackingQuery } from './get-shipment-by-tracking.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentPublicResponseDTO } from '@application/dtos/responses/shipment/index.js';

@QueryHandler(GetShipmentByTrackingQuery)
export class GetShipmentByTrackingHandler implements IQueryHandler<GetShipmentByTrackingQuery, ShipmentPublicResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: GetShipmentByTrackingQuery): Promise<ShipmentPublicResponseDTO> {
    return this.service.getByTracking(q.trackingNumber);
  }
}
