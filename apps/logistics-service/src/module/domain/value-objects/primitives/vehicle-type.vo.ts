/**
 * VehicleType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VEHICLE_TYPE } from '@vubon/shared-constants/logistics';

export type VehicleTypeValue =
  (typeof VEHICLE_TYPE)[keyof typeof VEHICLE_TYPE];

const VALID_TYPES: readonly string[] = Object.values(VEHICLE_TYPE);

export class VehicleTypeVO extends BaseVO<VehicleTypeValue> {
  private constructor(value: VehicleTypeValue) {
    super(value);
  }

  static create(raw: string): VehicleTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('VehicleType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid VehicleType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new VehicleTypeVO(normalized as VehicleTypeValue);
  }

  static reconstitute(raw: string): VehicleTypeVO {
    return new VehicleTypeVO(raw as VehicleTypeValue);
  }

  isMotorcycle(): boolean { return this.value === VEHICLE_TYPE.MOTORCYCLE; }
  isBicycle(): boolean { return this.value === VEHICLE_TYPE.BICYCLE; }
  isCar(): boolean { return this.value === VEHICLE_TYPE.CAR; }
  isVan(): boolean { return this.value === VEHICLE_TYPE.VAN; }
  isPickup(): boolean { return this.value === VEHICLE_TYPE.PICKUP; }
  isTruck(): boolean {
    return (
      this.value === VEHICLE_TYPE.TRUCK_SMALL ||
      this.value === VEHICLE_TYPE.TRUCK_MEDIUM ||
      this.value === VEHICLE_TYPE.TRUCK_LARGE
    );
  }
  isContainer(): boolean { return this.value === VEHICLE_TYPE.CONTAINER; }
  isRefrigerated(): boolean { return this.value === VEHICLE_TYPE.REFRIGERATED; }

  isSmall(): boolean {
    return this.isMotorcycle() || this.isBicycle() || this.isCar();
  }

  isHeavy(): boolean {
    return this.isTruck() || this.isContainer();
  }
}
