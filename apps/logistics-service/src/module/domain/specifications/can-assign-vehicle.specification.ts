import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VehicleEntity } from '../entities/vehicle.entity';
import { WeightVO } from '../value-objects/primitives/weight.vo';

export class CanAssignVehicleSpecification extends Specification<{
  vehicle: VehicleEntity;
  cargoWeight: WeightVO;
}> {
  isSatisfiedBy(input: { vehicle: VehicleEntity; cargoWeight: WeightVO }): boolean {
    if (!input.vehicle.capacity) return true;
    return input.cargoWeight.toKg() <= input.vehicle.capacity.value;
  }
}
