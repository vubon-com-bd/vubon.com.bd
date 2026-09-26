import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VehicleEntity } from '../entities/vehicle.entity';
import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo';
import { VehicleNumberVO } from '../value-objects/primitives/vehicle-number.vo';

export interface VehicleRepository
  extends BaseRepository<VehicleEntity, VehicleIdVO> {
  findByNumber(number: VehicleNumberVO): Promise<VehicleEntity | null>;
  findAvailable(): Promise<readonly VehicleEntity[]>;
  findByType(type: string): Promise<readonly VehicleEntity[]>;
}
