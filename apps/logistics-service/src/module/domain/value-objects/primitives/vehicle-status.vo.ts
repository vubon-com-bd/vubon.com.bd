/**
 * VehicleStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VEHICLE_STATUS } from '@vubon/shared-constants/logistics';

export type VehicleStatusValue =
  (typeof VEHICLE_STATUS)[keyof typeof VEHICLE_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(VEHICLE_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<VehicleStatusValue, readonly VehicleStatusValue[]>
> = {
  available: ['in_use', 'maintenance', 'reserved', 'out_of_service', 'retired'],
  in_use: ['available', 'maintenance', 'out_of_service'],
  maintenance: ['available', 'out_of_service', 'retired'],
  reserved: ['in_use', 'available', 'out_of_service'],
  out_of_service: ['available', 'maintenance', 'retired'],
  retired: [], // final
};

export class VehicleStatusVO extends BaseStatusVO<VehicleStatusValue> {
  private constructor(value: VehicleStatusValue) {
    super(value);
  }

  static create(raw: string): VehicleStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('VehicleStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid VehicleStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new VehicleStatusVO(normalized as VehicleStatusValue);
  }

  static reconstitute(raw: string): VehicleStatusVO {
    return new VehicleStatusVO(raw as VehicleStatusValue);
  }

  static available(): VehicleStatusVO {
    return new VehicleStatusVO(VEHICLE_STATUS.AVAILABLE);
  }

  isAvailable(): boolean { return this.value === VEHICLE_STATUS.AVAILABLE; }
  isInUse(): boolean { return this.value === VEHICLE_STATUS.IN_USE; }
  isMaintenance(): boolean { return this.value === VEHICLE_STATUS.MAINTENANCE; }
  isReserved(): boolean { return this.value === VEHICLE_STATUS.RESERVED; }
  isOutOfService(): boolean { return this.value === VEHICLE_STATUS.OUT_OF_SERVICE; }
  isRetired(): boolean { return this.value === VEHICLE_STATUS.RETIRED; }

  isFinal(): boolean { return this.isRetired(); }
  isUsable(): boolean { return this.isAvailable() || this.isReserved(); }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as VehicleStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
