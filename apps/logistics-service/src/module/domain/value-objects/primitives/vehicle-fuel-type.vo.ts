/**
 * VehicleFuelType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VEHICLE_FUEL_TYPE } from '@vubon/shared-constants/logistics';

export type VehicleFuelTypeValue =
  (typeof VEHICLE_FUEL_TYPE)[keyof typeof VEHICLE_FUEL_TYPE];

const VALID_FUEL_TYPES: readonly string[] = Object.values(VEHICLE_FUEL_TYPE);

export class VehicleFuelTypeVO extends BaseVO<VehicleFuelTypeValue> {
  private constructor(value: VehicleFuelTypeValue) {
    super(value);
  }

  static create(raw: string): VehicleFuelTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('VehicleFuelType must be a string', 'fuelType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_FUEL_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid VehicleFuelType: "${normalized}". Allowed: ${VALID_FUEL_TYPES.join(', ')}`,
        'fuelType',
      );
    }
    return new VehicleFuelTypeVO(normalized as VehicleFuelTypeValue);
  }

  static reconstitute(raw: string): VehicleFuelTypeVO {
    return new VehicleFuelTypeVO(raw as VehicleFuelTypeValue);
  }

  isPetrol(): boolean { return this.value === VEHICLE_FUEL_TYPE.PETROL; }
  isDiesel(): boolean { return this.value === VEHICLE_FUEL_TYPE.DIESEL; }
  isCNG(): boolean { return this.value === VEHICLE_FUEL_TYPE.CNG; }
  isElectric(): boolean { return this.value === VEHICLE_FUEL_TYPE.ELECTRIC; }
  isHybrid(): boolean { return this.value === VEHICLE_FUEL_TYPE.HYBRID; }
  isLPG(): boolean { return this.value === VEHICLE_FUEL_TYPE.LPG; }

  isGreen(): boolean {
    return this.isElectric() || this.isHybrid();
  }
}
