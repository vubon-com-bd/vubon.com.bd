import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DispatchEntity } from '../entities/dispatch.entity';
import { DispatchIdVO } from '../value-objects/primitives/dispatch-id.vo';
import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo';

export interface DispatchRepository
  extends BaseRepository<DispatchEntity, DispatchIdVO> {
  findByVehicle(vehicleId: VehicleIdVO): Promise<readonly DispatchEntity[]>;
  findByDriver(driverId: DriverIdVO): Promise<readonly DispatchEntity[]>;
  findByStatus(status: string): Promise<readonly DispatchEntity[]>;
}
