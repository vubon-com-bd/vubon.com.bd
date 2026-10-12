/**
 * VehicleType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VEHICLE_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidVehicleTypeError } from '../../errors/vehicle.errors.js';

const ALLOWED = Object.values(VEHICLE_TYPE) as readonly string[];

export class VehicleTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): VehicleTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidVehicleTypeError(String(raw));
    }
    return new VehicleTypeVO(raw);
  }

  static reconstitute(raw: string): VehicleTypeVO { return new VehicleTypeVO(raw); }

  static motorcycle(): VehicleTypeVO { return new VehicleTypeVO(VEHICLE_TYPE.MOTORCYCLE); }
  static bicycle(): VehicleTypeVO { return new VehicleTypeVO(VEHICLE_TYPE.BICYCLE); }
  static car(): VehicleTypeVO { return new VehicleTypeVO(VEHICLE_TYPE.CAR); }
  static van(): VehicleTypeVO { return new VehicleTypeVO(VEHICLE_TYPE.VAN); }
  static pickup(): VehicleTypeVO { return new VehicleTypeVO(VEHICLE_TYPE.PICKUP); }
  static truckSmall(): VehicleTypeVO { return new VehicleTypeVO(VEHICLE_TYPE.TRUCK_SMALL); }
  static truckMedium(): VehicleTypeVO { return new VehicleTypeVO(VEHICLE_TYPE.TRUCK_MEDIUM); }
  static truckLarge(): VehicleTypeVO { return new VehicleTypeVO(VEHICLE_TYPE.TRUCK_LARGE); }
  static container(): VehicleTypeVO { return new VehicleTypeVO(VEHICLE_TYPE.CONTAINER); }
  static refrigerated(): VehicleTypeVO { return new VehicleTypeVO(VEHICLE_TYPE.REFRIGERATED); }

  isTwoWheeler(): boolean {
    return [VEHICLE_TYPE.MOTORCYCLE, VEHICLE_TYPE.BICYCLE].includes(this.value as never);
  }
  isTruck(): boolean {
    return [VEHICLE_TYPE.TRUCK_SMALL, VEHICLE_TYPE.TRUCK_MEDIUM, VEHICLE_TYPE.TRUCK_LARGE].includes(this.value as never);
  }
  isRefrigerated(): boolean { return this.value === VEHICLE_TYPE.REFRIGERATED; }
  isContainer(): boolean { return this.value === VEHICLE_TYPE.CONTAINER; }

  /** Suitable for cold-chain deliveries. */
  supportsColdChain(): boolean { return this.isRefrigerated(); }

  /** Heavy-duty vehicle (trucks, containers). */
  isHeavyDuty(): boolean { return this.isTruck() || this.isContainer(); }

  /** Can only carry small parcels. */
  isLightDuty(): boolean { return this.isTwoWheeler() || this.value === VEHICLE_TYPE.CAR; }
}
