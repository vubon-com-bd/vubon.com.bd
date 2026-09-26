import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VehicleIdVO } from '../primitives/vehicle-id.vo';
import { VehicleNumberVO } from '../primitives/vehicle-number.vo';
import { VehicleTypeVO } from '../primitives/vehicle-type.vo';
import { VehicleStatusVO } from '../primitives/vehicle-status.vo';
import { VehicleCapacityVO } from '../primitives/vehicle-capacity.vo';
import { VehicleFuelTypeVO } from '../primitives/vehicle-fuel-type.vo';

export interface VehicleProps {
  readonly id: VehicleIdVO;
  readonly number: VehicleNumberVO;
  readonly type: VehicleTypeVO;
  readonly status: VehicleStatusVO;
  readonly capacity: VehicleCapacityVO | null;
  readonly fuelType: VehicleFuelTypeVO | null;
}

export class VehicleVO extends BaseVO<VehicleProps> {
  private constructor(props: VehicleProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VehicleProps): VehicleVO {
    return new VehicleVO(props);
  }

  get id(): VehicleIdVO { return this.value.id; }
  get number(): VehicleNumberVO { return this.value.number; }
  get type(): VehicleTypeVO { return this.value.type; }
  get status(): VehicleStatusVO { return this.value.status; }
  get capacity(): VehicleCapacityVO | null { return this.value.capacity; }
  get fuelType(): VehicleFuelTypeVO | null { return this.value.fuelType; }
}
