import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { InventoryLocationServiceInterface } from '../interfaces/inventory-location.service.interface';
import type { InventoryLocationRepository } from '../../../domain/repositories/inventory-location.repository.interface';
import type { InventoryLocationEntity } from '../../../domain/entities/inventory-location.entity';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo';

@Injectable()
export class InventoryLocationService
  extends BaseService<InventoryLocationEntity, string>
  implements InventoryLocationServiceInterface
{
  readonly name = 'InventoryLocationService';

  constructor(private readonly repo: InventoryLocationRepository) {
    super();
  }

  async listByWarehouse(warehouseId: string): Promise<readonly InventoryLocationEntity[]> {
    return this.repo.findByWarehouse(WarehouseIdVO.create(warehouseId));
  }

  async listAvailable(warehouseId: string): Promise<readonly InventoryLocationEntity[]> {
    return this.repo.findAvailable(WarehouseIdVO.create(warehouseId));
  }
}
