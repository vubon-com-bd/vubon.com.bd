import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShipmentTimelineQuery } from './get-shipment-timeline.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentTimelineResponseDTO } from '@application/dtos/responses/shipment/index.js';

@QueryHandler(GetShipmentTimelineQuery)
export class GetShipmentTimelineHandler implements IQueryHandler<GetShipmentTimelineQuery, ShipmentTimelineResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: GetShipmentTimelineQuery): Promise<ShipmentTimelineResponseDTO> {
    return this.service.getTimeline(q.shipmentId);
  }
}
