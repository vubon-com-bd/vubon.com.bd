/**
 * VehicleEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VEHICLE } from '@vubon/shared-constants/logistics';

import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo.js';
import { VehicleNumberVO } from '../value-objects/primitives/vehicle-number.vo.js';
import { VehicleTypeVO } from '../value-objects/primitives/vehicle-type.vo.js';
import { VehicleStatusVO } from '../value-objects/primitives/vehicle-status.vo.js';
import { VehicleFuelTypeVO } from '../value-objects/primitives/vehicle-fuel-type.vo.js';

import {
  VehicleCreatedEvent,
  VehicleAssignedEvent,
  VehicleReleasedEvent,
  VehicleMaintenanceStartedEvent,
  VehicleMaintenanceCompletedEvent,
  VehicleRetiredEvent,
  VehicleDriverAssignedEvent,
  VehicleDriverUnassignedEvent,
  VehicleStatusChangedEvent,
} from '../events/vehicle.events.js';

export interface VehicleEntityProps {
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
  readonly maintenanceStartedAt?: string;
  readonly maintenanceCompletedAt?: string;
  readonly retiredAt?: string;
  readonly maintenanceReason?: string;
  readonly retirementReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class VehicleEntity extends AggregateRoot<string> {
  private _status: VehicleStatusVO;
  private _mileageKm?: number;
  private _lastServiceAt?: string;
  private _nextServiceAt?: string;
  private _insuranceExpiresAt?: string;
  private _registrationExpiresAt?: string;
  private _assignedDriverId?: string;
  private _isActive: boolean;
  private _maintenanceStartedAt?: string;
  private _maintenanceCompletedAt?: string;
  private _retiredAt?: string;
  private _maintenanceReason?: string;
  private _retirementReason?: string;

  private readonly _registrationNumber: VehicleNumberVO;
  private readonly _type: VehicleTypeVO;
  private readonly _fuelType: VehicleFuelTypeVO;
  private readonly _make: string;
  private readonly _model: string;
  private readonly _year: number;
  private readonly _color?: string;
  private readonly _maxWeightKg: number;
  private readonly _maxVolumeM3?: number;
  private readonly _capacity?: number;
  private readonly _warehouseId?: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VehicleEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._registrationNumber = props.registrationNumber;
    this._type = props.type;
    this._status = props.status;
    this._fuelType = props.fuelType;
    this._make = props.make;
    this._model = props.model;
    this._year = props.year;
    this._color = props.color;
    this._maxWeightKg = props.maxWeightKg;
    this._maxVolumeM3 = props.maxVolumeM3;
    this._capacity = props.capacity;
    this._mileageKm = props.mileageKm;
    this._lastServiceAt = props.lastServiceAt;
    this._nextServiceAt = props.nextServiceAt;
    this._insuranceExpiresAt = props.insuranceExpiresAt;
    this._registrationExpiresAt = props.registrationExpiresAt;
    this._assignedDriverId = props.assignedDriverId;
    this._warehouseId = props.warehouseId;
    this._isActive = props.isActive;
    this._maintenanceStartedAt = props.maintenanceStartedAt;
    this._maintenanceCompletedAt = props.maintenanceCompletedAt;
    this._retiredAt = props.retiredAt;
    this._maintenanceReason = props.maintenanceReason;
    this._retirementReason = props.retirementReason;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._make || this._make.trim().length === 0) {
      throw new ValidationError('Make required', 'make');
    }
    if (!this._model || this._model.trim().length === 0) {
      throw new ValidationError('Model required', 'model');
    }
    if (this._year < VEHICLE.MIN_YEAR || this._year > VEHICLE.MAX_YEAR) {
      throw new ValidationError(
        `Year must be ${VEHICLE.MIN_YEAR}-${VEHICLE.MAX_YEAR}`,
        'year',
      );
    }
    if (this._maxWeightKg <= 0 || this._maxWeightKg > VEHICLE.MAX_WEIGHT_KG) {
      throw new ValidationError(
        `Max weight must be 1-${VEHICLE.MAX_WEIGHT_KG}kg`,
        'maxWeightKg',
      );
    }
    if (this._maxVolumeM3 !== undefined) {
      if (this._maxVolumeM3 <= 0 || this._maxVolumeM3 > VEHICLE.MAX_VOLUME_M3) {
        throw new ValidationError(
          `Max volume must be 1-${VEHICLE.MAX_VOLUME_M3}m³`,
          'maxVolumeM3',
        );
      }
    }
  }

  get registrationNumber(): VehicleNumberVO { return this._registrationNumber; }
  get type(): VehicleTypeVO { return this._type; }
  get status(): VehicleStatusVO { return this._status; }
  get fuelType(): VehicleFuelTypeVO { return this._fuelType; }
  get make(): string { return this._make; }
  get model(): string { return this._model; }
  get year(): number { return this._year; }
  get color(): string | undefined { return this._color; }
  get maxWeightKg(): number { return this._maxWeightKg; }
  get maxVolumeM3(): number | undefined { return this._maxVolumeM3; }
  get capacity(): number | undefined { return this._capacity; }
  get mileageKm(): number | undefined { return this._mileageKm; }
  get lastServiceAt(): string | undefined { return this._lastServiceAt; }
  get nextServiceAt(): string | undefined { return this._nextServiceAt; }
  get insuranceExpiresAt(): string | undefined { return this._insuranceExpiresAt; }
  get registrationExpiresAt(): string | undefined { return this._registrationExpiresAt; }
  get assignedDriverId(): string | undefined { return this._assignedDriverId; }
  get warehouseId(): string | undefined { return this._warehouseId; }
  get isActive(): boolean { return this._isActive; }
  get maintenanceStartedAt(): string | undefined { return this._maintenanceStartedAt; }
  get maintenanceCompletedAt(): string | undefined { return this._maintenanceCompletedAt; }
  get retiredAt(): string | undefined { return this._retiredAt; }
  get maintenanceReason(): string | undefined { return this._maintenanceReason; }
  get retirementReason(): string | undefined { return this._retirementReason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): VehicleIdVO { return VehicleIdVO.reconstitute(this.id); }

  isAvailable(): boolean { return this._status.isAvailable(); }
  isInUse(): boolean { return this._status.isInUse(); }
  isMaintenance(): boolean { return this._status.isMaintenance(); }
  isReserved(): boolean { return this._status.isReserved(); }
  isOutOfService(): boolean { return this._status.isOutOfService(); }
  isRetired(): boolean { return this._status.isRetired(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isUsable(): boolean { return this._status.isUsable(); }

  hasAssignedDriver(): boolean { return !!this._assignedDriverId; }

  isInsuranceValid(ref: Date = new Date()): boolean {
    if (!this._insuranceExpiresAt) return false;
    return new Date(this._insuranceExpiresAt) > ref;
  }

  isRegistrationValid(ref: Date = new Date()): boolean {
    if (!this._registrationExpiresAt) return false;
    return new Date(this._registrationExpiresAt) > ref;
  }

  canCarry(weightKg: number, volumeM3?: number): boolean {
    if (weightKg > this._maxWeightKg) return false;
    if (this._maxVolumeM3 !== undefined && volumeM3 !== undefined) {
      if (volumeM3 > this._maxVolumeM3) return false;
    }
    return true;
  }

  // ═══ Business Actions ═══
  assign(dispatchId?: string, driverId?: string, now: string = new Date().toISOString()): void {
    if (!this.isAvailable() && !this.isReserved()) {
      throw new BusinessRuleError(
        `Vehicle not available for assignment (status "${this._status.value}")`,
        'VEHICLE_NOT_AVAILABLE',
        { vehicleId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('in_use');
    const from = this._status.value;
    this._status = VehicleStatusVO.create('in_use');
    this._isActive = true;
    if (driverId) this._assignedDriverId = driverId;
    this.emitStatusChange(from, 'in_use');
    this.addDomainEvent(
      new VehicleAssignedEvent({
        aggregateId: this.id,
        payload: { vehicleId: this.id, dispatchId, driverId, assignedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  release(now: string = new Date().toISOString()): void {
    if (!this.isInUse()) {
      throw new BusinessRuleError(
        `Vehicle is not in use (status "${this._status.value}")`,
        'VEHICLE_NOT_IN_USE',
        { vehicleId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('available');
    const from = this._status.value;
    this._status = VehicleStatusVO.available();
    this.emitStatusChange(from, 'available');
    this.addDomainEvent(
      new VehicleReleasedEvent({
        aggregateId: this.id,
        payload: { vehicleId: this.id, releasedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  startMaintenance(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('maintenance');
    const from = this._status.value;
    this._status = VehicleStatusVO.create('maintenance');
    this._maintenanceStartedAt = now;
    this._maintenanceReason = reason;
    this.emitStatusChange(from, 'maintenance', reason);
    this.addDomainEvent(
      new VehicleMaintenanceStartedEvent({
        aggregateId: this.id,
        payload: { vehicleId: this.id, reason, startedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  completeMaintenance(now: string = new Date().toISOString()): void {
    if (!this.isMaintenance()) {
      throw new BusinessRuleError(
        `Vehicle is not in maintenance`,
        'VEHICLE_NOT_IN_MAINTENANCE',
        { vehicleId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('available');
    const from = this._status.value;
    this._status = VehicleStatusVO.available();
    this._maintenanceCompletedAt = now;
    this._lastServiceAt = now;
    this.emitStatusChange(from, 'available');
    this.addDomainEvent(
      new VehicleMaintenanceCompletedEvent({
        aggregateId: this.id,
        payload: { vehicleId: this.id, completedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  retire(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('retired');
    const from = this._status.value;
    this._status = VehicleStatusVO.create('retired');
    this._retiredAt = now;
    this._retirementReason = reason;
    this._isActive = false;
    this.emitStatusChange(from, 'retired', reason);
    this.addDomainEvent(
      new VehicleRetiredEvent({
        aggregateId: this.id,
        payload: { vehicleId: this.id, reason, retiredAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  assignDriver(driverId: string, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot assign driver to retired vehicle`,
        'VEHICLE_RETIRED',
        { vehicleId: this.id },
      );
    }
    this._assignedDriverId = driverId;
    this.addDomainEvent(
      new VehicleDriverAssignedEvent({
        aggregateId: this.id,
        payload: { vehicleId: this.id, driverId, assignedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  unassignDriver(now: string = new Date().toISOString()): void {
    if (!this._assignedDriverId) {
      throw new BusinessRuleError(
        `No driver assigned to this vehicle`,
        'VEHICLE_NO_DRIVER',
        { vehicleId: this.id },
      );
    }
    const driverId = this._assignedDriverId;
    this._assignedDriverId = undefined;
    this.addDomainEvent(
      new VehicleDriverUnassignedEvent({
        aggregateId: this.id,
        payload: { vehicleId: this.id, driverId, unassignedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateMileage(km: number, now: string = new Date().toISOString()): void {
    if (km < 0) {
      throw new ValidationError('Mileage cannot be negative', 'mileageKm');
    }
    this._mileageKm = km;
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid vehicle status transition: "${this._status.value}" → "${target}"`,
        'INVALID_VEHICLE_STATUS_TRANSITION',
        { from: this._status.value, to: target, vehicleId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new VehicleStatusChangedEvent({
        aggregateId: this.id,
        payload: { vehicleId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: VehicleIdVO;
    props: Omit<VehicleEntityProps, 'status'>;
    now: string;
  }): VehicleEntity {
    const entity = new VehicleEntity(
      params.id.value,
      params.now,
      params.now,
      { ...params.props, status: VehicleStatusVO.available() },
    );
    entity.addDomainEvent(
      new VehicleCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          vehicleId: params.id.value,
          registrationNumber: params.props.registrationNumber.value,
          type: params.props.type.value,
          make: params.props.make,
          model: params.props.model,
          year: params.props.year,
          createdAt: params.now,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VehicleEntityProps;
    version?: number;
  }): VehicleEntity {
    const entity = new VehicleEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
