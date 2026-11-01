/**
 * WarehouseEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 *
 * State machine:
 *   active ⇄ inactive
 *   active → maintenance → active
 *   active → full → active
 *   any → closed
 *   closed → archived ✓ (final)
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { WAREHOUSE } from '@vubon/shared-constants/logistics';

import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';
import { WarehouseCodeVO } from '../value-objects/primitives/warehouse-code.vo.js';
import { WarehouseNameVO } from '../value-objects/primitives/warehouse-name.vo.js';
import { WarehouseStatusVO } from '../value-objects/primitives/warehouse-status.vo.js';

import {
  WarehouseCreatedEvent,
  WarehouseActivatedEvent,
  WarehouseDeactivatedEvent,
  WarehouseMaintenanceStartedEvent,
  WarehouseMaintenanceEndedEvent,
  WarehouseFullEvent,
  WarehouseClosedEvent,
  WarehouseArchivedEvent,
  WarehouseCapacityUpdatedEvent,
} from '../events/warehouse.events.js';

export interface WarehouseEntityProps {
  readonly code: WarehouseCodeVO;
  readonly name: WarehouseNameVO;
  readonly type: string;
  readonly status: WarehouseStatusVO;
  readonly address: string;
  readonly contactName?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly managerId?: string;
  readonly capacityM3?: number;
  readonly capacityKg?: number;
  readonly usedCapacityM3?: number;
  readonly usedCapacityKg?: number;
  readonly maxSkus?: number;
  readonly zone: string;
  readonly operatingHoursStart?: number;
  readonly operatingHoursEnd?: number;
  readonly timezone: string;
  readonly isDefault: boolean;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly maintenanceStartedAt?: string;
  readonly maintenanceEndedAt?: string;
  readonly fullMarkedAt?: string;
  readonly closedAt?: string;
  readonly archivedAt?: string;
  readonly reason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class WarehouseEntity extends AggregateRoot<string> {
  private _status: WarehouseStatusVO;
  private _address: string;
  private _contactName?: string;
  private _contactPhone?: string;
  private _contactEmail?: string;
  private _managerId?: string;
  private _capacityM3?: number;
  private _capacityKg?: number;
  private _usedCapacityM3?: number;
  private _usedCapacityKg?: number;
  private _maxSkus?: number;
  private _operatingHoursStart?: number;
  private _operatingHoursEnd?: number;
  private _isDefault: boolean;
  private _activatedAt?: string;
  private _deactivatedAt?: string;
  private _maintenanceStartedAt?: string;
  private _maintenanceEndedAt?: string;
  private _fullMarkedAt?: string;
  private _closedAt?: string;
  private _archivedAt?: string;
  private _reason?: string;

  private readonly _code: WarehouseCodeVO;
  private readonly _name: WarehouseNameVO;
  private readonly _type: string;
  private readonly _zone: string;
  private readonly _timezone: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: WarehouseEntityProps,
    deletedAt?: string | null,
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
    this._capacityM3 = props.capacityM3;
    this._capacityKg = props.capacityKg;
    this._usedCapacityM3 = props.usedCapacityM3;
    this._usedCapacityKg = props.usedCapacityKg;
    this._maxSkus = props.maxSkus;
    this._zone = props.zone;
    this._operatingHoursStart = props.operatingHoursStart;
    this._operatingHoursEnd = props.operatingHoursEnd;
    this._timezone = props.timezone;
    this._isDefault = props.isDefault;
    this._activatedAt = props.activatedAt;
    this._deactivatedAt = props.deactivatedAt;
    this._maintenanceStartedAt = props.maintenanceStartedAt;
    this._maintenanceEndedAt = props.maintenanceEndedAt;
    this._fullMarkedAt = props.fullMarkedAt;
    this._closedAt = props.closedAt;
    this._archivedAt = props.archivedAt;
    this._reason = props.reason;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._type) throw new ValidationError('Type required', 'type');
    if (!this._zone) throw new ValidationError('Zone required', 'zone');
    if (!this._address) throw new ValidationError('Address required', 'address');
    if (!this._timezone) throw new ValidationError('Timezone required', 'timezone');

    if (this._capacityM3 !== undefined && this._capacityM3 > WAREHOUSE.MAX_CAPACITY_M3) {
      throw new ValidationError(
        `Capacity (m3) ${this._capacityM3} exceeds max ${WAREHOUSE.MAX_CAPACITY_M3}`,
        'capacityM3',
      );
    }
    if (this._capacityKg !== undefined && this._capacityKg > WAREHOUSE.MAX_WEIGHT_KG) {
      throw new ValidationError(
        `Capacity (kg) ${this._capacityKg} exceeds max ${WAREHOUSE.MAX_WEIGHT_KG}`,
        'capacityKg',
      );
    }
    if (this._usedCapacityM3 !== undefined && this._capacityM3 !== undefined) {
      if (this._usedCapacityM3 > this._capacityM3) {
        throw new ValidationError(
          `Used capacity (m3) ${this._usedCapacityM3} exceeds capacity ${this._capacityM3}`,
          'usedCapacityM3',
        );
      }
    }
    if (this._usedCapacityKg !== undefined && this._capacityKg !== undefined) {
      if (this._usedCapacityKg > this._capacityKg) {
        throw new ValidationError(
          `Used capacity (kg) ${this._usedCapacityKg} exceeds capacity ${this._capacityKg}`,
          'usedCapacityKg',
        );
      }
    }
  }

  get code(): WarehouseCodeVO { return this._code; }
  get name(): WarehouseNameVO { return this._name; }
  get type(): string { return this._type; }
  get status(): WarehouseStatusVO { return this._status; }
  get address(): string { return this._address; }
  get contactName(): string | undefined { return this._contactName; }
  get contactPhone(): string | undefined { return this._contactPhone; }
  get contactEmail(): string | undefined { return this._contactEmail; }
  get managerId(): string | undefined { return this._managerId; }
  get capacityM3(): number | undefined { return this._capacityM3; }
  get capacityKg(): number | undefined { return this._capacityKg; }
  get usedCapacityM3(): number | undefined { return this._usedCapacityM3; }
  get usedCapacityKg(): number | undefined { return this._usedCapacityKg; }
  get maxSkus(): number | undefined { return this._maxSkus; }
  get zone(): string { return this._zone; }
  get operatingHoursStart(): number | undefined { return this._operatingHoursStart; }
  get operatingHoursEnd(): number | undefined { return this._operatingHoursEnd; }
  get timezone(): string { return this._timezone; }
  get isDefault(): boolean { return this._isDefault; }
  get activatedAt(): string | undefined { return this._activatedAt; }
  get deactivatedAt(): string | undefined { return this._deactivatedAt; }
  get maintenanceStartedAt(): string | undefined { return this._maintenanceStartedAt; }
  get maintenanceEndedAt(): string | undefined { return this._maintenanceEndedAt; }
  get fullMarkedAt(): string | undefined { return this._fullMarkedAt; }
  get closedAt(): string | undefined { return this._closedAt; }
  get archivedAt(): string | undefined { return this._archivedAt; }
  get reason(): string | undefined { return this._reason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): WarehouseIdVO { return WarehouseIdVO.reconstitute(this.id); }

  isActive(): boolean { return this._status.isActive(); }
  isInactive(): boolean { return this._status.isInactive(); }
  isMaintenance(): boolean { return this._status.isMaintenance(); }
  isFull(): boolean { return this._status.isFull(); }
  isClosed(): boolean { return this._status.isClosed(); }
  isArchived(): boolean { return this._status.isArchived(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isOperational(): boolean { return this._status.isOperational(); }

  utilizationPercent(): number {
    if (!this._capacityM3 || !this._usedCapacityM3) return 0;
    return (this._usedCapacityM3 / this._capacityM3) * 100;
  }

  availableCapacityM3(): number {
    return (this._capacityM3 ?? 0) - (this._usedCapacityM3 ?? 0);
  }

  canAcceptMore(volumeM3: number, weightKg?: number): boolean {
    if (!this.isOperational()) return false;
    const volOk =
      this._capacityM3 === undefined ||
      (this._usedCapacityM3 ?? 0) + volumeM3 <= this._capacityM3;
    const weightOk =
      this._capacityKg === undefined ||
      weightKg === undefined ||
      (this._usedCapacityKg ?? 0) + weightKg <= this._capacityKg;
    return volOk && weightOk;
  }

  // ═══ Business Actions ═══
  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    this._status = WarehouseStatusVO.active();
    this._activatedAt = now;
    this.addDomainEvent(
      new WarehouseActivatedEvent({
        aggregateId: this.id,
        payload: { warehouseId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    this._status = WarehouseStatusVO.create('inactive');
    this._deactivatedAt = now;
    this._reason = reason;
    this.addDomainEvent(
      new WarehouseDeactivatedEvent({
        aggregateId: this.id,
        payload: { warehouseId: this.id, reason, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  startMaintenance(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('maintenance');
    this._status = WarehouseStatusVO.create('maintenance');
    this._maintenanceStartedAt = now;
    this._reason = reason;
    this.addDomainEvent(
      new WarehouseMaintenanceStartedEvent({
        aggregateId: this.id,
        payload: { warehouseId: this.id, reason, startedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  endMaintenance(now: string = new Date().toISOString()): void {
    if (!this.isMaintenance()) {
      throw new BusinessRuleError(
        `Warehouse is not in maintenance (status "${this._status.value}")`,
        'WAREHOUSE_NOT_IN_MAINTENANCE',
        { warehouseId: this.id, status: this._status.value },
      );
    }
    this._maintenanceEndedAt = now;
    this.addDomainEvent(
      new WarehouseMaintenanceEndedEvent({
        aggregateId: this.id,
        payload: { warehouseId: this.id, endedAt: now },
        version: this.version + 1,
      }),
    );
    this._status = WarehouseStatusVO.active();
    this.touch(now);
    this.incrementVersion();
  }

  markFull(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('full');
    this._status = WarehouseStatusVO.create('full');
    this._fullMarkedAt = now;
    this.addDomainEvent(
      new WarehouseFullEvent({
        aggregateId: this.id,
        payload: {
          warehouseId: this.id,
          utilizationPercent: this.utilizationPercent(),
          markedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  close(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('closed');
    this._status = WarehouseStatusVO.create('closed');
    this._closedAt = now;
    this._reason = reason;
    this.addDomainEvent(
      new WarehouseClosedEvent({
        aggregateId: this.id,
        payload: { warehouseId: this.id, reason, closedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  archive(reason?: string, now: string = new Date().toISOString()): void {
    if (!this.isClosed()) {
      throw new BusinessRuleError(
        `Warehouse must be closed before archiving (status "${this._status.value}")`,
        'WAREHOUSE_MUST_BE_CLOSED',
        { warehouseId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('archived');
    this._status = WarehouseStatusVO.create('archived');
    this._archivedAt = now;
    this._reason = reason;
    this.addDomainEvent(
      new WarehouseArchivedEvent({
        aggregateId: this.id,
        payload: { warehouseId: this.id, reason, archivedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateCapacity(
    capacityM3?: number,
    capacityKg?: number,
    now: string = new Date().toISOString(),
  ): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        `Cannot update capacity for archived warehouse`,
        'WAREHOUSE_CANNOT_BE_MODIFIED',
        { warehouseId: this.id, status: this._status.value },
      );
    }
    if (capacityM3 !== undefined) {
      if (capacityM3 < 0 || capacityM3 > WAREHOUSE.MAX_CAPACITY_M3) {
        throw new ValidationError(
          `Capacity (m3) must be 0-${WAREHOUSE.MAX_CAPACITY_M3}`,
          'capacityM3',
        );
      }
      if ((this._usedCapacityM3 ?? 0) > capacityM3) {
        throw new ValidationError(
          `Cannot reduce capacity below current usage (${this._usedCapacityM3})`,
          'capacityM3',
        );
      }
      this._capacityM3 = capacityM3;
    }
    if (capacityKg !== undefined) {
      if (capacityKg < 0 || capacityKg > WAREHOUSE.MAX_WEIGHT_KG) {
        throw new ValidationError(
          `Capacity (kg) must be 0-${WAREHOUSE.MAX_WEIGHT_KG}`,
          'capacityKg',
        );
      }
      if ((this._usedCapacityKg ?? 0) > capacityKg) {
        throw new ValidationError(
          `Cannot reduce capacity below current usage (${this._usedCapacityKg})`,
          'capacityKg',
        );
      }
      this._capacityKg = capacityKg;
    }
    this.addDomainEvent(
      new WarehouseCapacityUpdatedEvent({
        aggregateId: this.id,
        payload: {
          warehouseId: this.id,
          capacityM3: this._capacityM3,
          capacityKg: this._capacityKg,
          updatedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateUsage(
    usedM3?: number,
    usedKg?: number,
    now: string = new Date().toISOString(),
  ): void {
    if (usedM3 !== undefined) {
      if (this._capacityM3 !== undefined && usedM3 > this._capacityM3) {
        throw new ValidationError(
          `Used capacity (m3) ${usedM3} exceeds capacity ${this._capacityM3}`,
          'usedCapacityM3',
        );
      }
      this._usedCapacityM3 = usedM3;
    }
    if (usedKg !== undefined) {
      if (this._capacityKg !== undefined && usedKg > this._capacityKg) {
        throw new ValidationError(
          `Used capacity (kg) ${usedKg} exceeds capacity ${this._capacityKg}`,
          'usedCapacityKg',
        );
      }
      this._usedCapacityKg = usedKg;
    }
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid warehouse status transition: "${this._status.value}" → "${target}"`,
        'INVALID_WAREHOUSE_STATUS_TRANSITION',
        { from: this._status.value, to: target, warehouseId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: WarehouseIdVO;
    props: Omit<WarehouseEntityProps, 'status'>;
    now: string;
  }): WarehouseEntity {
    const entity = new WarehouseEntity(
      params.id.value,
      params.now,
      params.now,
      { ...params.props, status: WarehouseStatusVO.create('inactive') },
    );
    entity.addDomainEvent(
      new WarehouseCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          warehouseId: params.id.value,
          code: params.props.code.value,
          name: params.props.name.value,
          type: params.props.type,
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
    props: WarehouseEntityProps;
    version?: number;
  }): WarehouseEntity {
    const entity = new WarehouseEntity(
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
