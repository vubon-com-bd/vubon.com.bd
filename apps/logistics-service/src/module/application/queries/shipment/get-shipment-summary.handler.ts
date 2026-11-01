import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShipmentSummaryQuery } from './get-shipment-summary.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@QueryHandler(GetShipmentSummaryQuery)
export class GetShipmentSummaryHandler implements IQueryHandler<GetShipmentSummaryQuery, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: GetShipmentSummaryQuery): Promise<ShipmentResponseDTO> {
    return this.service.getSummary(q.shipmentId);
  }
}
