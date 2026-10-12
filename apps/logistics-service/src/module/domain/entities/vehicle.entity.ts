/**
 * VehicleEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VEHICLE } from '@vubon/shared-constants/logistics';

import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo.js';
import { VehicleStatusVO } from '../value-objects/primitives/vehicle-status.vo.js';
import { VehicleTypeVO } from '../value-objects/primitives/vehicle-type.vo.js';
import { VehicleFuelTypeVO } from '../value-objects/primitives/vehicle-fuel-type.vo.js';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo.js';

import {
  VehicleRegisteredEvent,
  VehicleAssignedEvent,
  VehicleUnassignedEvent,
  VehicleAvailableEvent,
  VehicleInUseEvent,
  VehicleMaintenanceStartedEvent,
  VehicleMaintenanceCompletedEvent,
  VehicleOutOfServiceEvent,
  VehicleRetiredEvent,
  VehicleMileageUpdatedEvent,
} from '../events/vehicle.events.js';

import { InvalidVehicleStatusTransitionError } from '../errors/vehicle.errors.js';

export interface VehicleEntityProps {
  readonly registrationNumber: string;
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
  readonly assignedDriverId?: DriverIdVO;
  readonly isActive: boolean;
}

export class VehicleEntity extends AggregateRoot<string> {
  private _status: VehicleStatusVO;
  private _assignedDriverId?: DriverIdVO;
  private _mileageKm: number;
  private _isActive: boolean;
  private _lastServiceAt?: string;
  private _nextServiceAt?: string;

  private readonly _registrationNumber: string;
  private readonly _type: VehicleTypeVO;
  private readonly _fuelType: VehicleFuelTypeVO;
  private readonly _make: string;
  private readonly _model: string;
  private readonly _year: number;
  private readonly _color?: string;
  private readonly _maxWeightKg: number;
  private readonly _maxVolumeM3?: number;
  private readonly _capacity?: number;
  private readonly _insuranceExpiresAt?: string;
  private readonly _registrationExpiresAt?: string;

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: VehicleEntityProps, deletedAt?: string | null,
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
    this._mileageKm = props.mileageKm ?? 0;
    this._lastServiceAt = props.lastServiceAt;
    this._nextServiceAt = props.nextServiceAt;
    this._insuranceExpiresAt = props.insuranceExpiresAt;
    this._registrationExpiresAt = props.registrationExpiresAt;
    this._assignedDriverId = props.assignedDriverId;
    this._isActive = props.isActive;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._registrationNumber.trim().length === 0 || this._registrationNumber.length > VEHICLE.REGISTRATION_NUMBER_MAX_LENGTH) {
      throw new ValidationError(`Registration number must be 1-${VEHICLE.REGISTRATION_NUMBER_MAX_LENGTH}`, 'registrationNumber');
    }
    if (this._year < VEHICLE.MIN_YEAR || this._year > VEHICLE.MAX_YEAR) {
      throw new ValidationError(`Year must be ${VEHICLE.MIN_YEAR}-${VEHICLE.MAX_YEAR}`, 'year');
    }
    if (this._maxWeightKg <= 0 || this._maxWeightKg > VEHICLE.MAX_WEIGHT_KG) {
      throw new ValidationError(`maxWeightKg must be 1-${VEHICLE.MAX_WEIGHT_KG}`, 'maxWeightKg');
    }
    if (this._mileageKm < 0) {
      throw new ValidationError('mileageKm cannot be negative', 'mileageKm');
    }
  }

  get registrationNumber(): string { return this._registrationNumber; }
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
  get mileageKm(): number { return this._mileageKm; }
  get lastServiceAt(): string | undefined { return this._lastServiceAt; }
  get nextServiceAt(): string | undefined { return this._nextServiceAt; }
  get insuranceExpiresAt(): string | undefined { return this._insuranceExpiresAt; }
  get registrationExpiresAt(): string | undefined { return this._registrationExpiresAt; }
  get assignedDriverId(): DriverIdVO | undefined { return this._assignedDriverId; }
  get isActive(): boolean { return this._isActive; }
  get toIdVO(): VehicleIdVO { return VehicleIdVO.reconstitute(this.id); }

  isAvailable(): boolean { return this._status.isAvailable(); }
  isInUse(): boolean { return this._status.isInUse(); }
  isRetired(): boolean { return this._status.isRetired(); }
  canBeAssigned(): boolean { return this._status.canBeAssigned() && this._isActive; }
  hasDriver(): boolean { return this._assignedDriverId !== undefined; }

  isInsuranceExpired(at: Date = new Date()): boolean {
    if (!this._insuranceExpiresAt) return false;
    return new Date(this._insuranceExpiresAt).getTime() < at.getTime();
  }

  isRegistrationExpired(at: Date = new Date()): boolean {
    if (!this._registrationExpiresAt) return false;
    return new Date(this._registrationExpiresAt).getTime() < at.getTime();
  }

  needsServiceSoon(at: Date = new Date()): boolean {
    if (!this._nextServiceAt) return false;
    const days = (new Date(this._nextServiceAt).getTime() - at.getTime()) / (1000 * 60 * 60 * 24);
    return days <= 7;
  }

  canCarry(weightKg: number, volumeM3?: number): boolean {
    if (weightKg > this._maxWeightKg) return false;
    if (volumeM3 !== undefined && this._maxVolumeM3 !== undefined && volumeM3 > this._maxVolumeM3) return false;
    return true;
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new InvalidVehicleStatusTransitionError(this._status.value, target);
    }
  }
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  assignDriver(driverId: DriverIdVO, now: string = new Date().toISOString()): void {
    this._assignedDriverId = driverId;
    this.addDomainEvent(new VehicleAssignedEvent({
      aggregateId: this.id,
      payload: { vehicleId: this.id, driverId: driverId.value, assignedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  unassignDriver(now: string = new Date().toISOString()): void {
    if (!this._assignedDriverId) return;
    const previous = this._assignedDriverId;
    this._assignedDriverId = undefined;
    this.addDomainEvent(new VehicleUnassignedEvent({
      aggregateId: this.id,
      payload: { vehicleId: this.id, driverId: previous.value, assignedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markAvailable(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('available');
    const from = this._status.value;
    this._status = VehicleStatusVO.available();
    this.addDomainEvent(new VehicleAvailableEvent({
      aggregateId: this.id,
      payload: { vehicleId: this.id, fromStatus: from, toStatus: 'available' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markInUse(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('in_use');
    const from = this._status.value;
    this._status = VehicleStatusVO.inUse();
    this.addDomainEvent(new VehicleInUseEvent({
      aggregateId: this.id,
      payload: { vehicleId: this.id, fromStatus: from, toStatus: 'in_use' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  startMaintenance(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('maintenance');
    const from = this._status.value;
    this._status = VehicleStatusVO.maintenance();
    this.addDomainEvent(new VehicleMaintenanceStartedEvent({
      aggregateId: this.id,
      payload: { vehicleId: this.id, fromStatus: from, toStatus: 'maintenance', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  completeMaintenance(now: string = new Date().toISOString()): void {
    if (!this._status.isMaintenance()) {
      throw new BusinessRuleError('Vehicle is not under maintenance', 'VEHICLE_NOT_IN_MAINTENANCE', { vehicleId: this.id });
    }
    const from = this._status.value;
    this._status = VehicleStatusVO.available();
    this._lastServiceAt = now;
    this.addDomainEvent(new VehicleMaintenanceCompletedEvent({
      aggregateId: this.id,
      payload: { vehicleId: this.id, fromStatus: from, toStatus: 'available' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markOutOfService(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('out_of_service');
    const from = this._status.value;
    this._status = VehicleStatusVO.outOfService();
    this.addDomainEvent(new VehicleOutOfServiceEvent({
      aggregateId: this.id,
      payload: { vehicleId: this.id, fromStatus: from, toStatus: 'out_of_service', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  retire(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('retired');
    const from = this._status.value;
    this._status = VehicleStatusVO.retired();
    this._isActive = false;
    this.addDomainEvent(new VehicleRetiredEvent({
      aggregateId: this.id,
      payload: { vehicleId: this.id, fromStatus: from, toStatus: 'retired', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  updateMileage(newKm: number, now: string = new Date().toISOString()): void {
    if (!Number.isFinite(newKm) || newKm < this._mileageKm) {
      throw new ValidationError('Mileage cannot decrease', 'mileageKm');
    }
    const previous = this._mileageKm;
    this._mileageKm = newKm;
    this.addDomainEvent(new VehicleMileageUpdatedEvent({
      aggregateId: this.id,
      payload: { vehicleId: this.id, previousKm: previous, newKm, updatedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: Omit<VehicleEntityProps, 'status'> & { status?: VehicleStatusVO };
    now: string;
  }): VehicleEntity {
    const status = params.props.status ?? VehicleStatusVO.available();
    const fullProps: VehicleEntityProps = { ...params.props, status };
    const entity = new VehicleEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new VehicleRegisteredEvent({
      aggregateId: params.id,
      payload: {
        vehicleId: params.id,
        registrationNumber: fullProps.registrationNumber,
        type: fullProps.type.value,
        make: fullProps.make,
        model: fullProps.model,
        year: fullProps.year,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string; createdAt: string; updatedAt: string;
    deletedAt?: string | null; props: VehicleEntityProps; version?: number;
  }): VehicleEntity {
    const entity = new VehicleEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
