import { WarehouseEntity } from '../entities/warehouse.entity';

export class WarehouseAllocationService {
  findNearest(
    warehouses: readonly WarehouseEntity[],
    district: string,
  ): WarehouseEntity | null {
    return warehouses.find((w) => w.district === district) ?? warehouses[0] ?? null;
  }
}
