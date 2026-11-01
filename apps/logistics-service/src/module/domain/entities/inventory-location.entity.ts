/**
 * InventoryLocationEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 *
 * State machine:
 *   active ⇄ inactive
 *   active → quarantine → active
 *   any → archived ✓ (final)
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { InventoryLocationIdVO } from '../value-objects/primitives/inventory-location-id.vo.js';
import { InventoryLocationCodeVO } from '../value-objects/primitives/inventory-location-code.vo.js';
import { InventoryLocationNameVO } from '../value-objects/primitives/inventory-location-name.vo.js';
import { InventoryLocationStatusVO } from '../value-objects/primitives/inventory-location-status.vo.js';

import {
  InventoryLocationCreatedEvent,
  InventoryLocationActivatedEvent,
  InventoryLocationDeactivatedEvent,
  InventoryLocationQuarantinedEvent,
  InventoryLocationUnquarantinedEvent,
  InventoryLocationArchivedEvent,
  InventoryLocationStockAddedEvent,
  InventoryLocationStockRemovedEvent,
  InventoryLocationCapacityUpdatedEvent,
  InventoryLocationStatusChangedEvent,
} from '../events/inventory-location.events.js';

export interface InventoryLocationEntityProps {
  readonly warehouseId: string;
  readonly code: InventoryLocationCodeVO;
  readonly name: InventoryLocationNameVO;
  readonly zone: string;
  readonly aisle?: string;
  readonly rack?: string;
  readonly shelf?: string;
  readonly bin?: string;
  readonly barcode?: string;
  readonly maxCapacityKg?: number;
  readonly maxCapacityM3?: number;
  readonly currentKg: number;
  readonly currentM3: number;
  readonly status: InventoryLocationStatusVO;
  readonly isQuarantine: boolean;
  readonly isPickable: boolean;
  readonly priority: number;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly quarantinedAt?: string;
  readonly archivedAt?: string;
  readonly reason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class InventoryLocationEntity extends AggregateRoot<string> {
  private _status: InventoryLocationStatusVO;
  private _currentKg: number;
  private _currentM3: number;
  private _maxCapacityKg?: number;
  private _maxCapacityM3?: number;
  private _isQuarantine: boolean;
  private _isPickable: boolean;
  private _priority: number;
  private _activatedAt?: string;
  private _deactivatedAt?: string;
  private _quarantinedAt?: string;
  private _archivedAt?: string;
  private _reason?: string;
  private _notes?: string;

  private readonly _warehouseId: string;
  private readonly _code: InventoryLocationCodeVO;
  private readonly _name: InventoryLocationNameVO;
  private readonly _zone: string;
  private readonly _aisle?: string;
  private readonly _rack?: string;
  private readonly _shelf?: string;
  private readonly _bin?: string;
  private readonly _barcode?: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: InventoryLocationEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._warehouseId = props.warehouseId;
    this._code = props.code;
    this._name = props.name;
    this._zone = props.zone;
    this._aisle = props.aisle;
    this._rack = props.rack;
    this._shelf = props.shelf;
    this._bin = props.bin;
    this._barcode = props.barcode;
    this._maxCapacityKg = props.maxCapacityKg;
    this._maxCapacityM3 = props.maxCapacityM3;
    this._currentKg = props.currentKg;
    this._currentM3 = props.currentM3;
    this._status = props.status;
    this._isQuarantine = props.isQuarantine;
    this._isPickable = props.isPickable;
    this._priority = props.priority;
    this._activatedAt = props.activatedAt;
    this._deactivatedAt = props.deactivatedAt;
    this._quarantinedAt = props.quarantinedAt;
    this._archivedAt = props.archivedAt;
    this._reason = props.reason;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._warehouseId) throw new ValidationError('WarehouseId required', 'warehouseId');
    if (!this._zone) throw new ValidationError('Zone required', 'zone');
    if (this._currentKg < 0) throw new ValidationError('Current kg cannot be negative', 'currentKg');
    if (this._currentM3 < 0) throw new ValidationError('Current m3 cannot be negative', 'currentM3');
    if (this._maxCapacityKg !== undefined && this._currentKg > this._maxCapacityKg) {
      throw new ValidationError(
        `currentKg ${this._currentKg} exceeds maxCapacityKg ${this._maxCapacityKg}`,
        'currentKg',
      );
    }
    if (this._maxCapacityM3 !== undefined && this._currentM3 > this._maxCapacityM3) {
      throw new ValidationError(
        `currentM3 ${this._currentM3} exceeds maxCapacityM3 ${this._maxCapacityM3}`,
        'currentM3',
      );
    }
    if (!Number.isInteger(this._priority) || this._priority < 0) {
      throw new ValidationError('Priority must be non-negative integer', 'priority');
    }
  }

  // Getters
  get warehouseId(): string { return this._warehouseId; }
  get code(): InventoryLocationCodeVO { return this._code; }
  get name(): InventoryLocationNameVO { return this._name; }
  get zone(): string { return this._zone; }
  get aisle(): string | undefined { return this._aisle; }
  get rack(): string | undefined { return this._rack; }
  get shelf(): string | undefined { return this._shelf; }
  get bin(): string | undefined { return this._bin; }
  get barcode(): string | undefined { return this._barcode; }
  get maxCapacityKg(): number | undefined { return this._maxCapacityKg; }
  get maxCapacityM3(): number | undefined { return this._maxCapacityM3; }
  get currentKg(): number { return this._currentKg; }
  get currentM3(): number { return this._currentM3; }
  get status(): InventoryLocationStatusVO { return this._status; }
  get isQuarantine(): boolean { return this._isQuarantine; }
  get isPickable(): boolean { return this._isPickable; }
  get priority(): number { return this._priority; }
  get activatedAt(): string | undefined { return this._activatedAt; }
  get deactivatedAt(): string | undefined { return this._deactivatedAt; }
  get quarantinedAt(): string | undefined { return this._quarantinedAt; }
  get archivedAt(): string | undefined { return this._archivedAt; }
  get reason(): string | undefined { return this._reason; }
  get notes(): string | undefined { return this._notes; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get isActive(): boolean { return this._status.isActive(); }
  get isInactive(): boolean { return this._status.isInactive(); }
  get isArchived(): boolean { return this._status.isArchived(); }
  get isFinal(): boolean { return this._status.isFinal(); }
  get isUsable(): boolean { return this._status.isUsable() && !this._isQuarantine; }

  get toIdVO(): InventoryLocationIdVO {
    return InventoryLocationIdVO.reconstitute(this.id);
  }

  availableKg(): number {
    return Math.max(0, (this._maxCapacityKg ?? 0) - this._currentKg);
  }
  availableM3(): number {
    return Math.max(0, (this._maxCapacityM3 ?? 0) - this._currentM3);
  }
  utilizationPercentKg(): number {
    if (!this._maxCapacityKg) return 0;
    return (this._currentKg / this._maxCapacityKg) * 100;
  }
  utilizationPercentM3(): number {
    if (!this._maxCapacityM3) return 0;
    return (this._currentM3 / this._maxCapacityM3) * 100;
  }
  canHold(weightKg: number, volumeM3?: number): boolean {
    if (!this.isUsable) return false;
    if (weightKg > this.availableKg()) return false;
    if (volumeM3 !== undefined && volumeM3 > this.availableM3()) return false;
    return true;
  }
  get displayLocation(): string {
    return [this._zone, this._aisle, this._rack, this._shelf, this._bin]
      .filter((p): p is string => !!p)
      .join('/');
  }

  // ═══ Business Actions ═══
  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = InventoryLocationStatusVO.active();
    this._activatedAt = now;
    this.emitStatusChange(from, 'active');
    this.addDomainEvent(
      new InventoryLocationActivatedEvent({
        aggregateId: this.id,
        payload: { inventoryLocationId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = InventoryLocationStatusVO.create('inactive');
    this._deactivatedAt = now;
    this._reason = reason;
    this.emitStatusChange(from, 'inactive', reason);
    this.addDomainEvent(
      new InventoryLocationDeactivatedEvent({
        aggregateId: this.id,
        payload: { inventoryLocationId: this.id, reason, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  quarantine(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('quarantine');
    const from = this._status.value;
    this._status = InventoryLocationStatusVO.create('quarantine');
    this._isQuarantine = true;
    this._quarantinedAt = now;
    this._reason = reason;
    this.emitStatusChange(from, 'quarantine', reason);
    this.addDomainEvent(
      new InventoryLocationQuarantinedEvent({
        aggregateId: this.id,
        payload: { inventoryLocationId: this.id, reason, quarantinedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  unquarantine(now: string = new Date().toISOString()): void {
    if (!this._isQuarantine) {
      throw new BusinessRuleError(
        `Inventory location "${this.id}" is not in quarantine`,
        'INVENTORY_LOCATION_NOT_QUARANTINED',
        { id: this.id },
      );
    }
    const from = this._status.value;
    this._status = InventoryLocationStatusVO.active();
    this._isQuarantine = false;
    this._quarantinedAt = undefined;
    this._reason = undefined;
    this.emitStatusChange(from, 'active');
    this.addDomainEvent(
      new InventoryLocationUnquarantinedEvent({
        aggregateId: this.id,
        payload: { inventoryLocationId: this.id, unquarantinedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  archive(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('archived');
    const from = this._status.value;
    this._status = InventoryLocationStatusVO.create('archived');
    this._archivedAt = now;
    this._reason = reason;
    this.emitStatusChange(from, 'archived', reason);
    this.addDomainEvent(
      new InventoryLocationArchivedEvent({
        aggregateId: this.id,
        payload: { inventoryLocationId: this.id, reason, archivedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  addStock(weightKg: number, volumeM3?: number, now: string = new Date().toISOString()): void {
    if (weightKg <= 0) {
      throw new ValidationError('Weight must be positive', 'weightKg');
    }
    if (!this.isUsable) {
      throw new BusinessRuleError(
        `Cannot add stock to location in status "${this._status.value}" (quarantine: ${this._isQuarantine})`,
        'INVENTORY_LOCATION_CANNOT_BE_MODIFIED',
        { id: this.id, status: this._status.value, isQuarantine: this._isQuarantine },
      );
    }
    if (!this.canHold(weightKg, volumeM3)) {
      throw new BusinessRuleError(
        `Insufficient capacity (availableKg: ${this.availableKg()}, requested: ${weightKg})`,
        'INVENTORY_LOCATION_INSUFFICIENT_CAPACITY',
        { id: this.id, availableKg: this.availableKg(), requestedKg: weightKg },
      );
    }
    this._currentKg += weightKg;
    if (volumeM3 !== undefined) this._currentM3 += volumeM3;
    this.addDomainEvent(
      new InventoryLocationStockAddedEvent({
        aggregateId: this.id,
        payload: {
          inventoryLocationId: this.id,
          weightKg,
          volumeM3,
          newCurrentKg: this._currentKg,
          newCurrentM3: this._currentM3,
          addedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  removeStock(weightKg: number, volumeM3?: number, now: string = new Date().toISOString()): void {
    if (weightKg <= 0) {
      throw new ValidationError('Weight must be positive', 'weightKg');
    }
    if (weightKg > this._currentKg) {
      throw new ValidationError(
        `Cannot remove ${weightKg}kg (current: ${this._currentKg}kg)`,
        'weightKg',
      );
    }
    this._currentKg -= weightKg;
    if (volumeM3 !== undefined) {
      this._currentM3 = Math.max(0, this._currentM3 - volumeM3);
    }
    this.addDomainEvent(
      new InventoryLocationStockRemovedEvent({
        aggregateId: this.id,
        payload: {
          inventoryLocationId: this.id,
          weightKg,
          volumeM3,
          newCurrentKg: this._currentKg,
          newCurrentM3: this._currentM3,
          removedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateCapacity(
    maxCapacityKg?: number,
    maxCapacityM3?: number,
    now: string = new Date().toISOString(),
  ): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        'Cannot update capacity for archived location',
        'INVENTORY_LOCATION_CANNOT_BE_MODIFIED',
        { id: this.id, status: this._status.value },
      );
    }
    if (maxCapacityKg !== undefined) {
      if (maxCapacityKg < 0) {
        throw new ValidationError('maxCapacityKg cannot be negative', 'maxCapacityKg');
      }
      if (maxCapacityKg < this._currentKg) {
        throw new ValidationError(
          `Cannot reduce capacity below current kg (${this._currentKg})`,
          'maxCapacityKg',
        );
      }
      this._maxCapacityKg = maxCapacityKg;
    }
    if (maxCapacityM3 !== undefined) {
      if (maxCapacityM3 < 0) {
        throw new ValidationError('maxCapacityM3 cannot be negative', 'maxCapacityM3');
      }
      if (maxCapacityM3 < this._currentM3) {
        throw new ValidationError(
          `Cannot reduce capacity below current m3 (${this._currentM3})`,
          'maxCapacityM3',
        );
      }
      this._maxCapacityM3 = maxCapacityM3;
    }
    this.addDomainEvent(
      new InventoryLocationCapacityUpdatedEvent({
        aggregateId: this.id,
        payload: {
          inventoryLocationId: this.id,
          maxCapacityKg: this._maxCapacityKg,
          maxCapacityM3: this._maxCapacityM3,
          updatedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateFlags(
    updates: { isPickable?: boolean; priority?: number },
    now: string = new Date().toISOString(),
  ): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        'Cannot update flags for archived location',
        'INVENTORY_LOCATION_CANNOT_BE_MODIFIED',
        { id: this.id, status: this._status.value },
      );
    }
    if (updates.isPickable !== undefined) this._isPickable = updates.isPickable;
    if (updates.priority !== undefined) {
      if (!Number.isInteger(updates.priority) || updates.priority < 0) {
        throw new ValidationError('Priority must be non-negative integer', 'priority');
      }
      this._priority = updates.priority;
    }
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid inventory location status transition: "${this._status.value}" → "${target}"`,
        'INVALID_INVENTORY_LOCATION_STATUS_TRANSITION',
        { from: this._status.value, to: target, id: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new InventoryLocationStatusChangedEvent({
        aggregateId: this.id,
        payload: { inventoryLocationId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: InventoryLocationIdVO;
    props: Omit<InventoryLocationEntityProps, 'status' | 'isQuarantine'>;
    now: string;
  }): InventoryLocationEntity {
    const entity = new InventoryLocationEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        status: InventoryLocationStatusVO.create('inactive'),
        isQuarantine: false,
      },
    );
    entity.addDomainEvent(
      new InventoryLocationCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          inventoryLocationId: params.id.value,
          code: params.props.code.value,
          name: params.props.name.value,
          warehouseId: params.props.warehouseId,
          zone: params.props.zone,
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
    props: InventoryLocationEntityProps;
    version?: number;
  }): InventoryLocationEntity {
    const entity = new InventoryLocationEntity(
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
