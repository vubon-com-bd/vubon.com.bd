/**
 * Vehicle Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { VehicleIdVO } from '../primitives/vehicle-id.vo.js';
import { VehicleNumberVO } from '../primitives/vehicle-number.vo.js';
import { VehicleTypeVO } from '../primitives/vehicle-type.vo.js';
import { VehicleStatusVO } from '../primitives/vehicle-status.vo.js';
import { VehicleFuelTypeVO } from '../primitives/vehicle-fuel-type.vo.js';

export interface VehicleVOProps {
  readonly id: VehicleIdVO;
  readonly registrationNumber: VehicleNumberVO;
  readonly type: VehicleTypeVO;
  readonly status: VehicleStatusVO;
  readonly fuelType: VehicleFuelTypeVO;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly color?: string;
  readonly maxWeightKg: number;
  readonly maxVolumeM3?: number;
  readonly capacity?: number;
  readonly mileageKm?: number;
  readonly lastServiceAt?: string;
  readonly nextServiceAt?: string;
  readonly insuranceExpiresAt?: string;
  readonly registrationExpiresAt?: string;
  readonly assignedDriverId?: string;
  readonly warehouseId?: string;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VehicleVO extends BaseVO<VehicleVOProps> {
  private constructor(props: VehicleVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VehicleVOProps): VehicleVO {
    const vo = new VehicleVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VehicleVOProps): VehicleVO {
    return new VehicleVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.make) throw new ValidationError('Make required', 'make');
    if (!v.model) throw new ValidationError('Model required', 'model');
    if (v.year < 2000 || v.year > 2100) {
      throw new ValidationError('Year must be 2000-2100', 'year');
    }
    if (v.maxWeightKg <= 0) {
      throw new ValidationError('Max weight must be positive', 'maxWeightKg');
    }
    if (v.maxVolumeM3 !== undefined && v.maxVolumeM3 <= 0) {
      throw new ValidationError('Max volume must be positive', 'maxVolumeM3');
    }
    if (v.mileageKm !== undefined && v.mileageKm < 0) {
      throw new ValidationError('Mileage cannot be negative', 'mileageKm');
    }
  }

  get id(): VehicleIdVO { return this.value.id; }
  get registrationNumber(): VehicleNumberVO { return this.value.registrationNumber; }
  get type(): VehicleTypeVO { return this.value.type; }
  get status(): VehicleStatusVO { return this.value.status; }
  get fuelType(): VehicleFuelTypeVO { return this.value.fuelType; }
  get make(): string { return this.value.make; }
  get model(): string { return this.value.model; }
  get year(): number { return this.value.year; }
  get color(): string | undefined { return this.value.color; }
  get maxWeightKg(): number { return this.value.maxWeightKg; }
  get maxVolumeM3(): number | undefined { return this.value.maxVolumeM3; }
  get capacity(): number | undefined { return this.value.capacity; }
  get mileageKm(): number | undefined { return this.value.mileageKm; }
  get lastServiceAt(): string | undefined { return this.value.lastServiceAt; }
  get nextServiceAt(): string | undefined { return this.value.nextServiceAt; }
  get insuranceExpiresAt(): string | undefined { return this.value.insuranceExpiresAt; }
  get registrationExpiresAt(): string | undefined { return this.value.registrationExpiresAt; }
  get assignedDriverId(): string | undefined { return this.value.assignedDriverId; }
  get warehouseId(): string | undefined { return this.value.warehouseId; }
  get isActive(): boolean { return this.value.isActive; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isAvailable(): boolean { return this.status.isAvailable(); }
  isInUse(): boolean { return this.status.isInUse(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isUsable(): boolean { return this.status.isUsable(); }

  hasAssignedDriver(): boolean { return !!this.assignedDriverId; }

  isInsuranceValid(ref: Date = new Date()): boolean {
    if (!this.insuranceExpiresAt) return false;
    return new Date(this.insuranceExpiresAt) > ref;
  }

  isRegistrationValid(ref: Date = new Date()): boolean {
    if (!this.registrationExpiresAt) return false;
    return new Date(this.registrationExpiresAt) > ref;
  }

  get displayName(): string {
    return `${this.registrationNumber.value} (${this.make} ${this.model})`;
  }
}
