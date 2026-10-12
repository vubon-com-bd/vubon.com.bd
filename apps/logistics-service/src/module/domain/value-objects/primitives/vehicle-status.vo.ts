/**
 * VehicleStatus Value Object — state machine
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { VEHICLE_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidVehicleStatusError } from '../../errors/vehicle.errors.js';

const ALLOWED = Object.values(VEHICLE_STATUS) as readonly string[];

export class VehicleStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): VehicleStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidVehicleStatusError(String(raw));
    }
    return new VehicleStatusVO(raw);
  }

  static reconstitute(raw: string): VehicleStatusVO { return new VehicleStatusVO(raw); }

  static available(): VehicleStatusVO { return new VehicleStatusVO(VEHICLE_STATUS.AVAILABLE); }
  static inUse(): VehicleStatusVO { return new VehicleStatusVO(VEHICLE_STATUS.IN_USE); }
  static maintenance(): VehicleStatusVO { return new VehicleStatusVO(VEHICLE_STATUS.MAINTENANCE); }
  static outOfService(): VehicleStatusVO { return new VehicleStatusVO(VEHICLE_STATUS.OUT_OF_SERVICE); }
  static retired(): VehicleStatusVO { return new VehicleStatusVO(VEHICLE_STATUS.RETIRED); }
  static reserved(): VehicleStatusVO { return new VehicleStatusVO(VEHICLE_STATUS.RESERVED); }

  isAvailable(): boolean { return this.value === VEHICLE_STATUS.AVAILABLE; }
  isInUse(): boolean { return this.value === VEHICLE_STATUS.IN_USE; }
  isMaintenance(): boolean { return this.value === VEHICLE_STATUS.MAINTENANCE; }
  isOutOfService(): boolean { return this.value === VEHICLE_STATUS.OUT_OF_SERVICE; }
  isRetired(): boolean { return this.value === VEHICLE_STATUS.RETIRED; }
  isReserved(): boolean { return this.value === VEHICLE_STATUS.RESERVED; }

  isFinal(): boolean { return this.isRetired(); }

  /** Can be assigned to a route/dispatch. */
  canBeAssigned(): boolean { return this.isAvailable() || this.isReserved(); }

  /** Should not be driven on public roads. */
  isUnusable(): boolean {
    return [VEHICLE_STATUS.MAINTENANCE, VEHICLE_STATUS.OUT_OF_SERVICE, VEHICLE_STATUS.RETIRED].includes(
      this.value as never,
    );
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [VEHICLE_STATUS.AVAILABLE]: [
        VEHICLE_STATUS.RESERVED,
        VEHICLE_STATUS.IN_USE,
        VEHICLE_STATUS.MAINTENANCE,
        VEHICLE_STATUS.OUT_OF_SERVICE,
        VEHICLE_STATUS.RETIRED,
      ],
      [VEHICLE_STATUS.RESERVED]: [
        VEHICLE_STATUS.AVAILABLE,
        VEHICLE_STATUS.IN_USE,
        VEHICLE_STATUS.MAINTENANCE,
        VEHICLE_STATUS.OUT_OF_SERVICE,
      ],
      [VEHICLE_STATUS.IN_USE]: [
        VEHICLE_STATUS.AVAILABLE,
        VEHICLE_STATUS.MAINTENANCE,
        VEHICLE_STATUS.OUT_OF_SERVICE,
      ],
      [VEHICLE_STATUS.MAINTENANCE]: [
        VEHICLE_STATUS.AVAILABLE,
        VEHICLE_STATUS.OUT_OF_SERVICE,
        VEHICLE_STATUS.RETIRED,
      ],
      [VEHICLE_STATUS.OUT_OF_SERVICE]: [
        VEHICLE_STATUS.AVAILABLE,
        VEHICLE_STATUS.MAINTENANCE,
        VEHICLE_STATUS.RETIRED,
      ],
      [VEHICLE_STATUS.RETIRED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
