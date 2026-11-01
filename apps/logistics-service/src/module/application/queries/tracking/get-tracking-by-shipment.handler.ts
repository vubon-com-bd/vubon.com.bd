import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackingByShipmentQuery } from './get-tracking-by-shipment.query.js';
import { TRACKING_SERVICE, type ITrackingService } from '@application/services/interfaces/tracking.service.interface';
import type { TrackingResponseDTO } from '@application/dtos/responses/tracking/index.js';

@QueryHandler(GetTrackingByShipmentQuery)
export class GetTrackingByShipmentHandler implements IQueryHandler<GetTrackingByShipmentQuery, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(q: GetTrackingByShipmentQuery): Promise<TrackingResponseDTO> {
    return this.service.getByShipmentId(q.shipmentId);
  }
}
