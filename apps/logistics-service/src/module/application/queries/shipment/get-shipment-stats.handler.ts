import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShipmentStatsQuery } from './get-shipment-stats.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentStatsResponseDTO } from '@application/dtos/responses/shipment/index.js';

@QueryHandler(GetShipmentStatsQuery)
export class GetShipmentStatsHandler implements IQueryHandler<GetShipmentStatsQuery, ShipmentStatsResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: GetShipmentStatsQuery): Promise<ShipmentStatsResponseDTO> {
    return this.service.getStats(q.fromDate, q.toDate, q.warehouseId);
  }
}
