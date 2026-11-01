/**
 * DriverEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DRIVER } from '@vubon/shared-constants/logistics';

import { DriverIdVO } from '../value-objects/primitives/driver-id.vo.js';
import { DriverNameVO } from '../value-objects/primitives/driver-name.vo.js';
import { DriverStatusVO } from '../value-objects/primitives/driver-status.vo.js';
import { DriverTypeVO } from '../value-objects/primitives/driver-type.vo.js';
import { DriverLicenseVO } from '../value-objects/primitives/driver-license.vo.js';

import {
  DriverCreatedEvent,
  DriverAvailableEvent,
  DriverOnDutyEvent,
  DriverOnBreakEvent,
  DriverOffDutyEvent,
  DriverOnLeaveEvent,
  DriverSuspendedEvent,
  DriverDeactivatedEvent,
  DriverVehicleAssignedEvent,
  DriverVehicleUnassignedEvent,
  DriverCashCollectedEvent,
  DriverCashDepositedEvent,
  DriverDeliveryCompletedEvent,
  DriverStatusChangedEvent,
} from '../events/driver.events.js';

export interface DriverEntityProps {
  readonly userId?: string;
  readonly name: DriverNameVO;
  readonly phone: string;
  readonly email?: string;
  readonly status: DriverStatusVO;
  readonly type: DriverTypeVO;
  readonly license: DriverLicenseVO;
  readonly dateOfBirth?: string;
  readonly address?: string;
  readonly vehicleId?: string;
  readonly warehouseId?: string;
  readonly rating?: number;
  readonly totalDeliveries: number;
  readonly totalDistanceKm?: number;
  readonly cashLimit?: number;
  readonly cashInHand?: number;
  readonly isAvailable: boolean;
  readonly lastActiveAt?: string;
  readonly onLeaveStartAt?: string;
  readonly onLeaveEndAt?: string;
  readonly suspendedAt?: string;
  readonly suspensionReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class DriverEntity extends AggregateRoot<string> {
  private _status: DriverStatusVO;
  private _vehicleId?: string;
  private _rating?: number;
  private _totalDeliveries: number;
  private _totalDistanceKm?: number;
  private _cashInHand?: number;
  private _isAvailable: boolean;
  private _lastActiveAt?: string;
  private _onLeaveStartAt?: string;
  private _onLeaveEndAt?: string;
  private _suspendedAt?: string;
  private _suspensionReason?: string;

  private readonly _userId?: string;
  private readonly _name: DriverNameVO;
  private readonly _phone: string;
  private readonly _email?: string;
  private readonly _type: DriverTypeVO;
  private readonly _license: DriverLicenseVO;
  private readonly _dateOfBirth?: string;
  private readonly _address?: string;
  private readonly _warehouseId?: string;
  private readonly _cashLimit?: number;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DriverEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._name = props.name;
    this._phone = props.phone;
    this._email = props.email;
    this._status = props.status;
    this._type = props.type;
    this._license = props.license;
    this._dateOfBirth = props.dateOfBirth;
    this._address = props.address;
    this._vehicleId = props.vehicleId;
    this._warehouseId = props.warehouseId;
    this._rating = props.rating;
    this._totalDeliveries = props.totalDeliveries;
    this._totalDistanceKm = props.totalDistanceKm;
    this._cashLimit = props.cashLimit;
    this._cashInHand = props.cashInHand;
    this._isAvailable = props.isAvailable;
    this._lastActiveAt = props.lastActiveAt;
    this._onLeaveStartAt = props.onLeaveStartAt;
    this._onLeaveEndAt = props.onLeaveEndAt;
    this._suspendedAt = props.suspendedAt;
    this._suspensionReason = props.suspensionReason;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._phone || this._phone.trim().length < 10) {
      throw new ValidationError('Valid phone required', 'phone');
    }
    if (this._rating !== undefined && (this._rating < 0 || this._rating > 5)) {
      throw new ValidationError('Rating must be 0-5', 'rating');
    }
    if (this._totalDeliveries < 0) {
      throw new ValidationError('Total deliveries cannot be negative', 'totalDeliveries');
    }
    if (this._cashInHand !== undefined && this._cashInHand < 0) {
      throw new ValidationError('Cash in hand cannot be negative', 'cashInHand');
    }
    if (this._cashLimit !== undefined && this._cashInHand !== undefined) {
      if (this._cashInHand > this._cashLimit) {
        throw new ValidationError(
          `Cash in hand ${this._cashInHand} exceeds limit ${this._cashLimit}`,
          'cashInHand',
        );
      }
    }
    if (this._dateOfBirth) {
      const age = this.calculateAge(new Date(this._dateOfBirth));
      if (age < DRIVER.MIN_AGE) {
        throw new ValidationError(
          `Driver age ${age} is below minimum ${DRIVER.MIN_AGE}`,
          'dateOfBirth',
        );
      }
    }
  }

  private calculateAge(dob: Date): number {
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
    return age;
  }

  get userId(): string | undefined { return this._userId; }
  get name(): DriverNameVO { return this._name; }
  get phone(): string { return this._phone; }
  get email(): string | undefined { return this._email; }
  get status(): DriverStatusVO { return this._status; }
  get type(): DriverTypeVO { return this._type; }
  get license(): DriverLicenseVO { return this._license; }
  get dateOfBirth(): string | undefined { return this._dateOfBirth; }
  get address(): string | undefined { return this._address; }
  get vehicleId(): string | undefined { return this._vehicleId; }
  get warehouseId(): string | undefined { return this._warehouseId; }
  get rating(): number | undefined { return this._rating; }
  get totalDeliveries(): number { return this._totalDeliveries; }
  get totalDistanceKm(): number | undefined { return this._totalDistanceKm; }
  get cashLimit(): number | undefined { return this._cashLimit; }
  get cashInHand(): number | undefined { return this._cashInHand; }
  get isAvailable(): boolean { return this._isAvailable; }
  get lastActiveAt(): string | undefined { return this._lastActiveAt; }
  get onLeaveStartAt(): string | undefined { return this._onLeaveStartAt; }
  get onLeaveEndAt(): string | undefined { return this._onLeaveEndAt; }
  get suspendedAt(): string | undefined { return this._suspendedAt; }
  get suspensionReason(): string | undefined { return this._suspensionReason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): DriverIdVO { return DriverIdVO.reconstitute(this.id); }

  isAvailableStatus(): boolean { return this._status.isAvailable(); }
  isOnDuty(): boolean { return this._status.isOnDuty(); }
  isOnBreak(): boolean { return this._status.isOnBreak(); }
  isOffDuty(): boolean { return this._status.isOffDuty(); }
  isOnLeave(): boolean { return this._status.isOnLeave(); }
  isSuspended(): boolean { return this._status.isSuspended(); }
  isInactive(): boolean { return this._status.isInactive(); }

  isLicenseValid(): boolean { return !this._license.isExpired(); }
  isLicenseExpired(ref?: Date): boolean { return this._license.isExpired(ref); }

  hasVehicle(): boolean { return !!this._vehicleId; }

  canAcceptDelivery(): boolean {
    return (
      this._isAvailable &&
      this.isAvailableStatus() &&
      this.isLicenseValid() &&
      !this.isCashLimitExceeded()
    );
  }

  isCashLimitExceeded(): boolean {
    if (this._cashLimit === undefined) return false;
    return (this._cashInHand ?? 0) >= this._cashLimit;
  }

  get cashUtilization(): number {
    if (!this._cashLimit || this._cashLimit === 0) return 0;
    return ((this._cashInHand ?? 0) / this._cashLimit) * 100;
  }

  // ═══ Business Actions ═══
  markAvailable(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('available');
    const from = this._status.value;
    this._status = DriverStatusVO.available();
    this._isAvailable = true;
    this._lastActiveAt = now;
    this.emitStatusChange(from, 'available');
    this.addDomainEvent(
      new DriverAvailableEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, availableAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  goOnDuty(now: string = new Date().toISOString()): void {
    if (this.isOnDuty()) {
      throw new BusinessRuleError(
        'Driver is already on duty',
        'DRIVER_ON_DUTY',
        { driverId: this.id },
      );
    }
    this.assertTransitionTo('on_duty');
    const from = this._status.value;
    this._status = DriverStatusVO.create('on_duty');
    this._isAvailable = true;
    this._lastActiveAt = now;
    this.emitStatusChange(from, 'on_duty');
    this.addDomainEvent(
      new DriverOnDutyEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, onDutyAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  goOnBreak(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('on_break');
    const from = this._status.value;
    this._status = DriverStatusVO.create('on_break');
    this._isAvailable = false;
    this.emitStatusChange(from, 'on_break');
    this.addDomainEvent(
      new DriverOnBreakEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, onBreakAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  goOffDuty(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('off_duty');
    const from = this._status.value;
    this._status = DriverStatusVO.create('off_duty');
    this._isAvailable = false;
    this.emitStatusChange(from, 'off_duty');
    this.addDomainEvent(
      new DriverOffDutyEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, offDutyAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  goOnLeave(leaveEndAt?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('on_leave');
    const from = this._status.value;
    this._status = DriverStatusVO.create('on_leave');
    this._isAvailable = false;
    this._onLeaveStartAt = now;
    this._onLeaveEndAt = leaveEndAt;
    this.emitStatusChange(from, 'on_leave');
    this.addDomainEvent(
      new DriverOnLeaveEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, leaveStartAt: now, leaveEndAt },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  suspend(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('suspended');
    const from = this._status.value;
    this._status = DriverStatusVO.create('suspended');
    this._isAvailable = false;
    this._suspendedAt = now;
    this._suspensionReason = reason;
    this.emitStatusChange(from, 'suspended', reason);
    this.addDomainEvent(
      new DriverSuspendedEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, reason, suspendedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = DriverStatusVO.create('inactive');
    this._isAvailable = false;
    this.emitStatusChange(from, 'inactive', reason);
    this.addDomainEvent(
      new DriverDeactivatedEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, reason, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  assignVehicle(vehicleId: string, now: string = new Date().toISOString()): void {
    if (this.isSuspended() || this.isInactive()) {
      throw new BusinessRuleError(
        `Cannot assign vehicle to inactive/suspended driver`,
        'DRIVER_NOT_AVAILABLE',
        { driverId: this.id, status: this._status.value },
      );
    }
    this._vehicleId = vehicleId;
    this.addDomainEvent(
      new DriverVehicleAssignedEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, vehicleId, assignedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  unassignVehicle(now: string = new Date().toISOString()): void {
    if (!this._vehicleId) {
      throw new BusinessRuleError(
        'No vehicle assigned',
        'DRIVER_NO_VEHICLE',
        { driverId: this.id },
      );
    }
    const vehicleId = this._vehicleId;
    this._vehicleId = undefined;
    this.addDomainEvent(
      new DriverVehicleUnassignedEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, vehicleId, unassignedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  collectCash(
    amount: number,
    currency: string = 'BDT',
    now: string = new Date().toISOString(),
  ): void {
    if (amount <= 0) {
      throw new ValidationError('Amount must be positive', 'amount');
    }
    const newTotal = (this._cashInHand ?? 0) + amount;
    if (this._cashLimit !== undefined && newTotal > this._cashLimit) {
      throw new BusinessRuleError(
        `Cash collection would exceed limit (${newTotal}/${this._cashLimit})`,
        'DRIVER_CASH_LIMIT_EXCEEDED',
        { driverId: this.id, newTotal, cashLimit: this._cashLimit },
      );
    }
    this._cashInHand = newTotal;
    this.addDomainEvent(
      new DriverCashCollectedEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, amount, currency, collectedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  depositCash(
    amount: number,
    currency: string = 'BDT',
    now: string = new Date().toISOString(),
  ): void {
    if (amount <= 0) {
      throw new ValidationError('Amount must be positive', 'amount');
    }
    const current = this._cashInHand ?? 0;
    if (amount > current) {
      throw new ValidationError(
        `Cannot deposit ${amount}, only ${current} in hand`,
        'amount',
      );
    }
    this._cashInHand = current - amount;
    this.addDomainEvent(
      new DriverCashDepositedEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, amount, currency, depositedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  recordDelivery(
    deliveryId: string,
    distanceKm?: number,
    now: string = new Date().toISOString(),
  ): void {
    this._totalDeliveries += 1;
    if (distanceKm) {
      this._totalDistanceKm = (this._totalDistanceKm ?? 0) + distanceKm;
    }
    this._lastActiveAt = now;
    this.addDomainEvent(
      new DriverDeliveryCompletedEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, deliveryId, completedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid driver status transition: "${this._status.value}" → "${target}"`,
        'INVALID_DRIVER_STATUS_TRANSITION',
        { from: this._status.value, to: target, driverId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new DriverStatusChangedEvent({
        aggregateId: this.id,
        payload: { driverId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: DriverIdVO;
    props: Omit<DriverEntityProps, 'status' | 'isAvailable'>;
    now: string;
  }): DriverEntity {
    const entity = new DriverEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        status: DriverStatusVO.create('inactive'),
        isAvailable: false,
      },
    );
    entity.addDomainEvent(
      new DriverCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          driverId: params.id.value,
          name: params.props.name.value,
          phone: params.props.phone,
          licenseNumber: params.props.license.licenseNumber,
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
    props: DriverEntityProps;
    version?: number;
  }): DriverEntity {
    const entity = new DriverEntity(
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
