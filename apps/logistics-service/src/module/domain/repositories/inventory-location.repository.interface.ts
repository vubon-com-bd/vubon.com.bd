import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { InventoryLocationEntity } from '../entities/inventory-location.entity';
import { LocationIdVO } from '../value-objects/primitives/location-id.vo';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo';

export interface InventoryLocationRepository
  extends BaseRepository<InventoryLocationEntity, LocationIdVO> {
  findByWarehouse(warehouseId: WarehouseIdVO): Promise<readonly InventoryLocationEntity[]>;
  findAvailable(warehouseId: WarehouseIdVO): Promise<readonly InventoryLocationEntity[]>;
}
