import { Injectable } from '@nestjs/common';
import type { WarehouseEntity } from '../../../domain/entities/warehouse.entity';

@Injectable()
export class WarehouseAllocatorService {
  findNearest(
    warehouses: readonly WarehouseEntity[],
    district: string,
  ): WarehouseEntity | null {
    return warehouses.find((w) => w.district === district) ?? warehouses[0] ?? null;
  }
}
