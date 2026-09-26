import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { InventoryLocationEntity } from '../../../domain/entities/inventory-location.entity';

export interface InventoryLocationServiceInterface
  extends BaseServiceInterface<InventoryLocationEntity, string> {
  listByWarehouse(warehouseId: string): Promise<readonly InventoryLocationEntity[]>;
  listAvailable(warehouseId: string): Promise<readonly InventoryLocationEntity[]>;
}
