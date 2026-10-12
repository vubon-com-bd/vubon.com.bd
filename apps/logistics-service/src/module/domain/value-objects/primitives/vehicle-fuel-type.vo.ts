/**
 * VehicleFuelType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VEHICLE_FUEL_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidVehicleFuelTypeError } from '../../errors/vehicle.errors.js';

const ALLOWED = Object.values(VEHICLE_FUEL_TYPE) as readonly string[];

export class VehicleFuelTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): VehicleFuelTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidVehicleFuelTypeError(String(raw));
    }
    return new VehicleFuelTypeVO(raw);
  }

  static reconstitute(raw: string): VehicleFuelTypeVO { return new VehicleFuelTypeVO(raw); }

  static petrol(): VehicleFuelTypeVO { return new VehicleFuelTypeVO(VEHICLE_FUEL_TYPE.PETROL); }
  static diesel(): VehicleFuelTypeVO { return new VehicleFuelTypeVO(VEHICLE_FUEL_TYPE.DIESEL); }
  static cng(): VehicleFuelTypeVO { return new VehicleFuelTypeVO(VEHICLE_FUEL_TYPE.CNG); }
  static electric(): VehicleFuelTypeVO { return new VehicleFuelTypeVO(VEHICLE_FUEL_TYPE.ELECTRIC); }
  static hybrid(): VehicleFuelTypeVO { return new VehicleFuelTypeVO(VEHICLE_FUEL_TYPE.HYBRID); }
  static lpg(): VehicleFuelTypeVO { return new VehicleFuelTypeVO(VEHICLE_FUEL_TYPE.LPG); }

  isPetrol(): boolean { return this.value === VEHICLE_FUEL_TYPE.PETROL; }
  isDiesel(): boolean { return this.value === VEHICLE_FUEL_TYPE.DIESEL; }
  isCng(): boolean { return this.value === VEHICLE_FUEL_TYPE.CNG; }
  isElectric(): boolean { return this.value === VEHICLE_FUEL_TYPE.ELECTRIC; }
  isHybrid(): boolean { return this.value === VEHICLE_FUEL_TYPE.HYBRID; }
  isLpg(): boolean { return this.value === VEHICLE_FUEL_TYPE.LPG; }

  /** Zero tailpipe emissions. */
  isZeroEmission(): boolean { return this.isElectric(); }

  /** Runs on fossil fuels. */
  isFossilFuel(): boolean { return this.isPetrol() || this.isDiesel() || this.isLpg(); }

  /** Alternative/green fuel. */
  isGreen(): boolean { return this.isElectric() || this.isHybrid() || this.isCng(); }
}
