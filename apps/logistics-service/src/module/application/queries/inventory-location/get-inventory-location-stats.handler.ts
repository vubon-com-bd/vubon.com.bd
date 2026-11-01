import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInventoryLocationStatsQuery } from './get-inventory-location-stats.query.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationStatsResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@QueryHandler(GetInventoryLocationStatsQuery)
export class GetInventoryLocationStatsHandler implements IQueryHandler<GetInventoryLocationStatsQuery, InventoryLocationStatsResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(q: GetInventoryLocationStatsQuery): Promise<InventoryLocationStatsResponseDTO> {
    return this.service.getStats(q.warehouseId);
  }
}
