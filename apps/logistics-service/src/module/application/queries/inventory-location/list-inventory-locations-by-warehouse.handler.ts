import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListInventoryLocationsByWarehouseQuery } from './list-inventory-locations-by-warehouse.query.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationListResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@QueryHandler(ListInventoryLocationsByWarehouseQuery)
export class ListInventoryLocationsByWarehouseHandler implements IQueryHandler<ListInventoryLocationsByWarehouseQuery, InventoryLocationListResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(q: ListInventoryLocationsByWarehouseQuery): Promise<InventoryLocationListResponseDTO> { return this.service.listByWarehouse(q.warehouseId); }
}
