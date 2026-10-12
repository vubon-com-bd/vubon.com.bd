/**
 * WarehouseEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { WAREHOUSE } from '@vubon/shared-constants/logistics';
import type { Phone, Email, UserId } from '@vubon/shared-types/common';

import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';
import { WarehouseStatusVO } from '../value-objects/primitives/warehouse-status.vo.js';
import { WarehouseCodeVO } from '../value-objects/primitives/warehouse-code.vo.js';
import { WarehouseTypeVO } from '../value-objects/primitives/warehouse-type.vo.js';
import { UtilizationPercentVO } from '../value-objects/primitives/utilization-percent.vo.js';
import { AddressDetailsVO } from '../value-objects/composites/address-details.vo.js';
import { CapacityVO } from '../value-objects/composites/capacity.vo.js';

import {
  WarehouseCreatedEvent,
  WarehouseActivatedEvent,
  WarehouseDeactivatedEvent,
  WarehouseMaintenanceStartedEvent,
  WarehouseMaintenanceCompletedEvent,
  WarehouseFullEvent,
  WarehouseClosedEvent,
  WarehouseArchivedEvent,
  WarehouseCapacityReservedEvent,
  WarehouseCapacityReleasedEvent,
} from '../events/warehouse.events.js';

import {
  InvalidWarehouseStatusTransitionError,
  WarehouseCapacityExceededError,
  WarehouseVolumeCapacityExceededError,
} from '../errors/warehouse.errors.js';

export interface WarehouseEntityProps {
  readonly code: WarehouseCodeVO;
  readonly name: string;
  readonly type: WarehouseTypeVO;
  readonly status: WarehouseStatusVO;
  readonly address: AddressDetailsVO;
  readonly contactName?: string;
  readonly contactPhone?: Phone;
  readonly contactEmail?: Email;
  readonly managerId?: UserId;
  readonly capacity: CapacityVO;
  readonly maxSkus: number;
  readonly zone: string;
  readonly operatingHoursStart?: number;
  readonly operatingHoursEnd?: number;
  readonly timezone: string;
  readonly isDefault: boolean;
}

export class WarehouseEntity extends AggregateRoot<string> {
  private _status: WarehouseStatusVO;
  private _capacity: CapacityVO;
  private _isDefault: boolean;
  private _contactName?: string;
  private _contactPhone?: Phone;
  private _contactEmail?: Email;
  private _managerId?: UserId;

  private readonly _code: WarehouseCodeVO;
  private readonly _name: string;
  private readonly _type: WarehouseTypeVO;
  private readonly _address: AddressDetailsVO;
  private readonly _maxSkus: number;
  private readonly _zone: string;
  private readonly _operatingHoursStart?: number;
  private readonly _operatingHoursEnd?: number;
  private readonly _timezone: string;

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: WarehouseEntityProps, deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._code = props.code;
    this._name = props.name;
    this._type = props.type;
    this._status = props.status;
    this._address = props.address;
    this._contactName = props.contactName;
    this._contactPhone = props.contactPhone;
    this._contactEmail = props.contactEmail;
    this._managerId = props.managerId;
    this._capacity = props.capacity;
    this._maxSkus = props.maxSkus;
    this._zone = props.zone;
    this._operatingHoursStart = props.operatingHoursStart;
    this._operatingHoursEnd = props.operatingHoursEnd;
    this._timezone = props.timezone;
    this._isDefault = props.isDefault;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._name.trim().length === 0) {
      throw new ValidationError('Warehouse name cannot be empty', 'name');
    }
    if (this._maxSkus < 1 || this._maxSkus > WAREHOUSE.MAX_SKUS) {
      throw new ValidationError(`maxSkus must be 1-${WAREHOUSE.MAX_SKUS}`, 'maxSkus');
    }
    if (this._operatingHoursStart !== undefined && (this._operatingHoursStart < 0 || this._operatingHoursStart > 23)) {
      throw new ValidationError('operatingHoursStart must be 0-23', 'operatingHoursStart');
    }
    if (this._operatingHoursEnd !== undefined && (this._operatingHoursEnd < 0 || this._operatingHoursEnd > 23)) {
      throw new ValidationError('operatingHoursEnd must be 0-23', 'operatingHoursEnd');
    }
    if (
      this._operatingHoursStart !== undefined &&
      this._operatingHoursEnd !== undefined &&
      this._operatingHoursEnd <= this._operatingHoursStart
    ) {
      throw new ValidationError('operatingHoursEnd must be after start', 'operatingHoursEnd');
    }
  }

  get code(): WarehouseCodeVO { return this._code; }
  get name(): string { return this._name; }
  get type(): WarehouseTypeVO { return this._type; }
  get status(): WarehouseStatusVO { return this._status; }
  get address(): AddressDetailsVO { return this._address; }
  get contactName(): string | undefined { return this._contactName; }
  get contactPhone(): Phone | undefined { return this._contactPhone; }
  get contactEmail(): Email | undefined { return this._contactEmail; }
  get managerId(): UserId | undefined { return this._managerId; }
  get capacity(): CapacityVO { return this._capacity; }
  get maxSkus(): number { return this._maxSkus; }
  get zone(): string { return this._zone; }
  get operatingHoursStart(): number | undefined { return this._operatingHoursStart; }
  get operatingHoursEnd(): number | undefined { return this._operatingHoursEnd; }
  get timezone(): string { return this._timezone; }
  get isDefault(): boolean { return this._isDefault; }
  get toIdVO(): WarehouseIdVO { return WarehouseIdVO.reconstitute(this.id); }

  isActive(): boolean { return this._status.isActive(); }
  isFull(): boolean { return this._status.isFull() || this._capacity.isFull(); }
  canAcceptInbound(): boolean { return this._status.canAcceptInbound() && !this._capacity.isFull(); }
  canDispatch(): boolean { return this._status.canDispatch(); }

  get utilizationPercent(): UtilizationPercentVO {
    return this._capacity.weightUtilization;
  }

  /** Is the warehouse open right now? */
  isOpenNow(at: Date = new Date()): boolean {
    if (!this.isActive()) return false;
    if (this._operatingHoursStart === undefined || this._operatingHoursEnd === undefined) return true;
    const hour = at.getHours();
    return hour >= this._operatingHoursStart && hour < this._operatingHoursEnd;
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new InvalidWarehouseStatusTransitionError(this._status.value, target);
    }
  }
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = WarehouseStatusVO.active();
    this.addDomainEvent(new WarehouseActivatedEvent({
      aggregateId: this.id,
      payload: { warehouseId: this.id, fromStatus: from, toStatus: 'active' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = WarehouseStatusVO.inactive();
    this.addDomainEvent(new WarehouseDeactivatedEvent({
      aggregateId: this.id,
      payload: { warehouseId: this.id, fromStatus: from, toStatus: 'inactive', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  startMaintenance(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('maintenance');
    const from = this._status.value;
    this._status = WarehouseStatusVO.maintenance();
    this.addDomainEvent(new WarehouseMaintenanceStartedEvent({
      aggregateId: this.id,
      payload: { warehouseId: this.id, fromStatus: from, toStatus: 'maintenance', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  completeMaintenance(now: string = new Date().toISOString()): void {
    if (!this._status.isMaintenance()) {
      throw new BusinessRuleError('Warehouse is not under maintenance', 'WAREHOUSE_NOT_IN_MAINTENANCE', { warehouseId: this.id });
    }
    const from = this._status.value;
    this._status = WarehouseStatusVO.active();
    this.addDomainEvent(new WarehouseMaintenanceCompletedEvent({
      aggregateId: this.id,
      payload: { warehouseId: this.id, fromStatus: from, toStatus: 'active' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markFull(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('full');
    const from = this._status.value;
    this._status = WarehouseStatusVO.full();
    this.addDomainEvent(new WarehouseFullEvent({
      aggregateId: this.id,
      payload: { warehouseId: this.id, fromStatus: from, toStatus: 'full' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  close(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('closed');
    const from = this._status.value;
    this._status = WarehouseStatusVO.closed();
    this.addDomainEvent(new WarehouseClosedEvent({
      aggregateId: this.id,
      payload: { warehouseId: this.id, fromStatus: from, toStatus: 'closed' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  archive(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('archived');
    const from = this._status.value;
    this._status = WarehouseStatusVO.archived();
    this.addDomainEvent(new WarehouseArchivedEvent({
      aggregateId: this.id,
      payload: { warehouseId: this.id, fromStatus: from, toStatus: 'archived' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  reserveCapacity(volumeM3: number, weightKg: number, now: string = new Date().toISOString()): void {
    if (!this.canAcceptInbound()) {
      throw new BusinessRuleError(
        'Warehouse cannot accept inbound shipments',
        'WAREHOUSE_NOT_ACCEPTING',
        { warehouseId: this.id, status: this._status.value },
      );
    }
    if (volumeM3 > this._capacity.availableM3) {
      throw new WarehouseVolumeCapacityExceededError(this.id, volumeM3, this._capacity.availableM3);
    }
    if (weightKg > this._capacity.availableKg) {
      throw new WarehouseCapacityExceededError(this.id, weightKg, this._capacity.availableKg);
    }
    this._capacity = this._capacity.withAdded(volumeM3, weightKg);
    this.addDomainEvent(new WarehouseCapacityReservedEvent({
      aggregateId: this.id,
      payload: {
        warehouseId: this.id,
        usedM3: this._capacity.usedM3,
        usedKg: this._capacity.usedKg,
        availableM3: this._capacity.availableM3,
        availableKg: this._capacity.availableKg,
      },
      version: this.version + 1,
    }));
    if (this._capacity.isFull() && !this._status.isFull()) {
      this._status = WarehouseStatusVO.full();
    }
    this.touch(now);
    this.incrementVersion();
  }

  releaseCapacity(volumeM3: number, weightKg: number, now: string = new Date().toISOString()): void {
    const newUsedM3 = Math.max(0, this._capacity.usedM3 - volumeM3);
    const newUsedKg = Math.max(0, this._capacity.usedKg - weightKg);
    this._capacity = CapacityVO.create({
      ...this._capacity.value,
      usedM3: newUsedM3,
      usedKg: newUsedKg,
    });
    this.addDomainEvent(new WarehouseCapacityReleasedEvent({
      aggregateId: this.id,
      payload: {
        warehouseId: this.id,
        usedM3: this._capacity.usedM3,
        usedKg: this._capacity.usedKg,
        availableM3: this._capacity.availableM3,
        availableKg: this._capacity.availableKg,
      },
      version: this.version + 1,
    }));
    if (this._status.isFull() && !this._capacity.isFull()) {
      this._status = WarehouseStatusVO.active();
    }
    this.touch(now);
    this.incrementVersion();
  }

  assignManager(managerId: UserId, now: string = new Date().toISOString()): void {
    this._managerId = managerId;
    this.touch(now);
    this.incrementVersion();
  }

  updateContact(params: { name?: string; phone?: Phone; email?: Email }, now: string = new Date().toISOString()): void {
    if (params.name !== undefined) this._contactName = params.name;
    if (params.phone !== undefined) this._contactPhone = params.phone;
    if (params.email !== undefined) this._contactEmail = params.email;
    this.touch(now);
    this.incrementVersion();
  }

  markAsDefault(now: string = new Date().toISOString()): void {
    this._isDefault = true;
    this.touch(now);
    this.incrementVersion();
  }

  unmarkAsDefault(now: string = new Date().toISOString()): void {
    if (!this._isDefault) return;
    this._isDefault = false;
    this.touch(now);
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: Omit<WarehouseEntityProps, 'status'>;
    now: string;
  }): WarehouseEntity {
    const fullProps: WarehouseEntityProps = { ...params.props, status: WarehouseStatusVO.inactive() };
    const entity = new WarehouseEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new WarehouseCreatedEvent({
      aggregateId: params.id,
      payload: {
        warehouseId: params.id,
        code: fullProps.code.value,
        name: fullProps.name,
        type: fullProps.type.value,
        zone: fullProps.zone,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: WarehouseEntityProps;
    version?: number;
  }): WarehouseEntity {
    const entity = new WarehouseEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
