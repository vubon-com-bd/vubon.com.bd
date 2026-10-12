/**
 * DriverEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DRIVER } from '@vubon/shared-constants/logistics';
import type { Phone, Email, UserId } from '@vubon/shared-types/common';

import { DriverIdVO } from '../value-objects/primitives/driver-id.vo.js';
import { DriverStatusVO } from '../value-objects/primitives/driver-status.vo.js';
import { DriverTypeVO } from '../value-objects/primitives/driver-type.vo.js';
import { DriverLicenseTypeVO } from '../value-objects/primitives/driver-license-type.vo.js';
import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo.js';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';

import {
  DriverRegisteredEvent,
  DriverStatusChangedEvent,
  DriverVehicleAssignedEvent,
  DriverVehicleUnassignedEvent,
  DriverDeliveryCompletedEvent,
  DriverCashUpdatedEvent,
  DriverRatingUpdatedEvent,
} from '../events/driver.events.js';

import {
  InvalidDriverStatusTransitionError,
  DriverLicenseExpiredError,
  DriverCashLimitExceededError,
} from '../errors/driver.errors.js';

export interface DriverEntityProps {
  readonly userId?: UserId;
  readonly name: string;
  readonly phone: Phone;
  readonly email?: Email;
  readonly status: DriverStatusVO;
  readonly type: DriverTypeVO;
  readonly licenseNumber: string;
  readonly licenseType: DriverLicenseTypeVO;
  readonly licenseExpiresAt: string;
  readonly dateOfBirth?: string;
  readonly address?: string;
  readonly vehicleId?: VehicleIdVO;
  readonly warehouseId?: WarehouseIdVO;
  readonly rating?: number;
  readonly totalDeliveries: number;
  readonly totalDistanceKm?: number;
  readonly cashLimit?: number;
  readonly cashInHand?: number;
  readonly isAvailable: boolean;
  readonly lastActiveAt?: string;
}

export class DriverEntity extends AggregateRoot<string> {
  private _status: DriverStatusVO;
  private _vehicleId?: VehicleIdVO;
  private _warehouseId?: WarehouseIdVO;
  private _rating?: number;
  private _totalDeliveries: number;
  private _totalDistanceKm: number;
  private _cashInHand: number;
  private _isAvailable: boolean;
  private _lastActiveAt?: string;
  private _email?: Email;

  private readonly _userId?: UserId;
  private readonly _name: string;
  private readonly _phone: Phone;
  private readonly _type: DriverTypeVO;
  private readonly _licenseNumber: string;
  private readonly _licenseType: DriverLicenseTypeVO;
  private readonly _licenseExpiresAt: string;
  private readonly _dateOfBirth?: string;
  private readonly _address?: string;
  private readonly _cashLimit: number;

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: DriverEntityProps, deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._name = props.name;
    this._phone = props.phone;
    this._email = props.email;
    this._status = props.status;
    this._type = props.type;
    this._licenseNumber = props.licenseNumber;
    this._licenseType = props.licenseType;
    this._licenseExpiresAt = props.licenseExpiresAt;
    this._dateOfBirth = props.dateOfBirth;
    this._address = props.address;
    this._vehicleId = props.vehicleId;
    this._warehouseId = props.warehouseId;
    this._rating = props.rating;
    this._totalDeliveries = props.totalDeliveries;
    this._totalDistanceKm = props.totalDistanceKm ?? 0;
    this._cashLimit = props.cashLimit ?? DRIVER.MAX_CASH_LIMIT;
    this._cashInHand = props.cashInHand ?? 0;
    this._isAvailable = props.isAvailable;
    this._lastActiveAt = props.lastActiveAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._name.trim().length === 0) {
      throw new ValidationError('Driver name cannot be empty', 'name');
    }
    if (!this._licenseNumber || this._licenseNumber.trim().length === 0) {
      throw new ValidationError('License number required', 'licenseNumber');
    }
    if (this._rating !== undefined && (this._rating < DRIVER.MIN_RATING || this._rating > DRIVER.MAX_RATING)) {
      throw new ValidationError(`Rating must be ${DRIVER.MIN_RATING}-${DRIVER.MAX_RATING}`, 'rating');
    }
    if (this._cashInHand < 0) {
      throw new ValidationError('cashInHand cannot be negative', 'cashInHand');
    }
    if (this._totalDeliveries < 0) {
      throw new ValidationError('totalDeliveries cannot be negative', 'totalDeliveries');
    }
  }

  get userId(): UserId | undefined { return this._userId; }
  get name(): string { return this._name; }
  get phone(): Phone { return this._phone; }
  get email(): Email | undefined { return this._email; }
  get status(): DriverStatusVO { return this._status; }
  get type(): DriverTypeVO { return this._type; }
  get licenseNumber(): string { return this._licenseNumber; }
  get licenseType(): DriverLicenseTypeVO { return this._licenseType; }
  get licenseExpiresAt(): string { return this._licenseExpiresAt; }
  get dateOfBirth(): string | undefined { return this._dateOfBirth; }
  get address(): string | undefined { return this._address; }
  get vehicleId(): VehicleIdVO | undefined { return this._vehicleId; }
  get warehouseId(): WarehouseIdVO | undefined { return this._warehouseId; }
  get rating(): number | undefined { return this._rating; }
  get totalDeliveries(): number { return this._totalDeliveries; }
  get totalDistanceKm(): number { return this._totalDistanceKm; }
  get cashLimit(): number { return this._cashLimit; }
  get cashInHand(): number { return this._cashInHand; }
  get isAvailable(): boolean { return this._isAvailable; }
  get lastActiveAt(): string | undefined { return this._lastActiveAt; }
  get toIdVO(): DriverIdVO { return DriverIdVO.reconstitute(this.id); }

  canBeAssigned(): boolean {
    return this._isAvailable && this._status.canBeAssigned() && !this.isLicenseExpired();
  }

  isLicenseExpired(at: Date = new Date()): boolean {
    return new Date(this._licenseExpiresAt).getTime() < at.getTime();
  }

  isLicenseExpiringSoon(daysThreshold = DRIVER.LICENSE_EXPIRY_WARNING_DAYS, at: Date = new Date()): boolean {
    const days = (new Date(this._licenseExpiresAt).getTime() - at.getTime()) / (1000 * 60 * 60 * 24);
    return days > 0 && days <= daysThreshold;
  }

  get availableCashLimit(): number { return this._cashLimit - this._cashInHand; }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new InvalidDriverStatusTransitionError(this._status.value, target);
    }
  }
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateStatus(status: DriverStatusVO, reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo(status.value);
    const from = this._status.value;
    this._status = status;
    this._isAvailable = status.canBeAssigned();
    this._lastActiveAt = now;
    this.addDomainEvent(new DriverStatusChangedEvent({
      aggregateId: this.id,
      payload: { driverId: this.id, fromStatus: from, toStatus: status.value, reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  goOnDuty(now: string = new Date().toISOString()): void {
    this.updateStatus(DriverStatusVO.onDuty(), undefined, now);
  }
  goOffDuty(reason?: string, now: string = new Date().toISOString()): void {
    this.updateStatus(DriverStatusVO.offDuty(), reason, now);
  }
  startBreak(now: string = new Date().toISOString()): void {
    this.updateStatus(DriverStatusVO.onBreak(), undefined, now);
  }
  endBreak(now: string = new Date().toISOString()): void {
    this.updateStatus(DriverStatusVO.onDuty(), undefined, now);
  }
  suspend(reason: string, now: string = new Date().toISOString()): void {
    this.updateStatus(DriverStatusVO.suspended(), reason, now);
  }
  reactivate(now: string = new Date().toISOString()): void {
    this.updateStatus(DriverStatusVO.available(), undefined, now);
  }

  assignVehicle(vehicleId: VehicleIdVO, now: string = new Date().toISOString()): void {
    this._vehicleId = vehicleId;
    this.addDomainEvent(new DriverVehicleAssignedEvent({
      aggregateId: this.id,
      payload: { driverId: this.id, vehicleId: vehicleId.value, assignedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  unassignVehicle(now: string = new Date().toISOString()): void {
    if (!this._vehicleId) return;
    const prev = this._vehicleId;
    this._vehicleId = undefined;
    this.addDomainEvent(new DriverVehicleUnassignedEvent({
      aggregateId: this.id,
      payload: { driverId: this.id, vehicleId: prev.value, assignedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  assignWarehouse(warehouseId: WarehouseIdVO, now: string = new Date().toISOString()): void {
    this._warehouseId = warehouseId;
    this.touch(now);
    this.incrementVersion();
  }

  recordDelivery(shipmentId: string, distanceKm?: number, now: string = new Date().toISOString()): void {
    this._totalDeliveries += 1;
    if (distanceKm) this._totalDistanceKm = Math.round((this._totalDistanceKm + distanceKm) * 100) / 100;
    this._lastActiveAt = now;
    this.addDomainEvent(new DriverDeliveryCompletedEvent({
      aggregateId: this.id,
      payload: { driverId: this.id, shipmentId, distanceKm, completedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  receiveCash(amount: number, now: string = new Date().toISOString()): void {
    if (amount <= 0) {
      throw new ValidationError('Cash amount must be positive', 'amount');
    }
    const newCash = this._cashInHand + amount;
    if (newCash > this._cashLimit) {
      throw new DriverCashLimitExceededError(this.id, newCash, this._cashLimit);
    }
    const previous = this._cashInHand;
    this._cashInHand = newCash;
    this.addDomainEvent(new DriverCashUpdatedEvent({
      aggregateId: this.id,
      payload: { driverId: this.id, previousCash: previous, newCash, delta: amount, updatedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  remitCash(amount: number, now: string = new Date().toISOString()): void {
    if (amount <= 0 || amount > this._cashInHand) {
      throw new ValidationError('Remit amount must be positive and ≤ cashInHand', 'amount');
    }
    const previous = this._cashInHand;
    this._cashInHand -= amount;
    this.addDomainEvent(new DriverCashUpdatedEvent({
      aggregateId: this.id,
      payload: { driverId: this.id, previousCash: previous, newCash: this._cashInHand, delta: -amount, updatedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  updateRating(newRating: number, now: string = new Date().toISOString()): void {
    if (newRating < DRIVER.MIN_RATING || newRating > DRIVER.MAX_RATING) {
      throw new ValidationError(`Rating must be ${DRIVER.MIN_RATING}-${DRIVER.MAX_RATING}`, 'rating');
    }
    const previous = this._rating;
    this._rating = newRating;
    this.addDomainEvent(new DriverRatingUpdatedEvent({
      aggregateId: this.id,
      payload: { driverId: this.id, previousRating: previous, newRating, updatedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  updateEmail(email: Email, now: string = new Date().toISOString()): void {
    this._email = email;
    this.touch(now);
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: Omit<DriverEntityProps, 'status' | 'totalDeliveries' | 'isAvailable'>;
    now: string;
  }): DriverEntity {
    const fullProps: DriverEntityProps = {
      ...params.props,
      status: DriverStatusVO.available(),
      totalDeliveries: 0,
      isAvailable: true,
    };
    const entity = new DriverEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new DriverRegisteredEvent({
      aggregateId: params.id,
      payload: {
        driverId: params.id,
        name: fullProps.name,
        phone: fullProps.phone,
        licenseNumber: fullProps.licenseNumber,
        type: fullProps.type.value,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string; createdAt: string; updatedAt: string;
    deletedAt?: string | null; props: DriverEntityProps; version?: number;
  }): DriverEntity {
    const entity = new DriverEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
