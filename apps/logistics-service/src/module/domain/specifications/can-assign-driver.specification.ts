import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { DriverEntity } from '../entities/driver.entity';
import { VehicleEntity } from '../entities/vehicle.entity';

export class CanAssignDriverSpecification extends Specification<{
  driver: DriverEntity;
  vehicle: VehicleEntity;
}> {
  isSatisfiedBy(input: { driver: DriverEntity; vehicle: VehicleEntity }): boolean {
    return input.driver.isAvailable;
  }
}
