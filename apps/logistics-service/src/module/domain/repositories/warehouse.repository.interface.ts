import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { WarehouseEntity } from '../entities/warehouse.entity';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo';
import { WarehouseCodeVO } from '../value-objects/primitives/warehouse-code.vo';

export interface WarehouseRepository
  extends BaseRepository<WarehouseEntity, WarehouseIdVO> {
  findByCode(code: WarehouseCodeVO): Promise<WarehouseEntity | null>;
  findByDivision(division: string): Promise<readonly WarehouseEntity[]>;
  findActive(): Promise<readonly WarehouseEntity[]>;
}
