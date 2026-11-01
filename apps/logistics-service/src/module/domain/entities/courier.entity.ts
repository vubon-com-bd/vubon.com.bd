/**
 * CourierEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 *
 * State machine:
 *   pending → active ⇄ inactive
 *   active/inactive → suspended
 *   suspended → active
 *   any → terminated ✓ (final)
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CourierIdVO } from '../value-objects/primitives/courier-id.vo.js';
import { CourierNameVO } from '../value-objects/primitives/courier-name.vo.js';
import { CourierStatusVO } from '../value-objects/primitives/courier-status.vo.js';
import { CourierTypeVO } from '../value-objects/primitives/courier-type.vo.js';

import {
  CourierCreatedEvent,
  CourierActivatedEvent,
  CourierDeactivatedEvent,
  CourierSuspendedEvent,
  CourierTerminatedEvent,
  CourierUpdatedEvent,
  CourierStatusChangedEvent,
} from '../events/courier.events.js';

export interface CourierEntityProps {
  readonly code: string;
  readonly name: CourierNameVO;
  readonly displayName: string;
  readonly status: CourierStatusVO;
  readonly type: CourierTypeVO;
  readonly logoUrl?: string;
  readonly website?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly trackingUrlTemplate?: string;
  readonly apiEnabled: boolean;
  readonly coverageZones?: readonly string[];
  readonly supportsCOD: boolean;
  readonly supportsInsurance: boolean;
  readonly supportsInternational: boolean;
  readonly averageDeliveryDays: number;
  readonly isDefault: boolean;
  readonly priority: number;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly suspendedAt?: string;
  readonly terminatedAt?: string;
  readonly suspendReason?: string;
  readonly terminateReason?: string;
  readonly deactivateReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class CourierEntity extends AggregateRoot<string> {
  private _status: CourierStatusVO;
  private _displayName: string;
  private _logoUrl?: string;
  private _website?: string;
  private _contactPhone?: string;
  private _contactEmail?: string;
  private _trackingUrlTemplate?: string;
  private _apiEnabled: boolean;
  private _coverageZones?: readonly string[];
  private _supportsCOD: boolean;
  private _supportsInsurance: boolean;
  private _supportsInternational: boolean;
  private _averageDeliveryDays: number;
  private _isDefault: boolean;
  private _priority: number;
  private _activatedAt?: string;
  private _deactivatedAt?: string;
  private _suspendedAt?: string;
  private _terminatedAt?: string;
  private _suspendReason?: string;
  private _terminateReason?: string;
  private _deactivateReason?: string;

  private readonly _code: string;
  private readonly _name: CourierNameVO;
  private readonly _type: CourierTypeVO;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CourierEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._code = props.code;
    this._name = props.name;
    this._displayName = props.displayName;
    this._status = props.status;
    this._type = props.type;
    this._logoUrl = props.logoUrl;
    this._website = props.website;
    this._contactPhone = props.contactPhone;
    this._contactEmail = props.contactEmail;
    this._trackingUrlTemplate = props.trackingUrlTemplate;
    this._apiEnabled = props.apiEnabled;
    this._coverageZones = props.coverageZones;
    this._supportsCOD = props.supportsCOD;
    this._supportsInsurance = props.supportsInsurance;
    this._supportsInternational = props.supportsInternational;
    this._averageDeliveryDays = props.averageDeliveryDays;
    this._isDefault = props.isDefault;
    this._priority = props.priority;
    this._activatedAt = props.activatedAt;
    this._deactivatedAt = props.deactivatedAt;
    this._suspendedAt = props.suspendedAt;
    this._terminatedAt = props.terminatedAt;
    this._suspendReason = props.suspendReason;
    this._terminateReason = props.terminateReason;
    this._deactivateReason = props.deactivateReason;
    this._metadata = props.metadata;

    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._code || this._code.trim().length === 0) {
      throw new ValidationError('Courier code cannot be empty', 'code');
    }
    if (!this._displayName || this._displayName.trim().length === 0) {
      throw new ValidationError('Display name cannot be empty', 'displayName');
    }
    if (this._averageDeliveryDays < 0 || this._averageDeliveryDays > 90) {
      throw new ValidationError(
        'Average delivery days must be 0-90',
        'averageDeliveryDays',
      );
    }
    if (!Number.isInteger(this._priority) || this._priority < 0) {
      throw new ValidationError('Priority must be non-negative integer', 'priority');
    }
  }

  get code(): string { return this._code; }
  get name(): CourierNameVO { return this._name; }
  get displayName(): string { return this._displayName; }
  get status(): CourierStatusVO { return this._status; }
  get type(): CourierTypeVO { return this._type; }
  get logoUrl(): string | undefined { return this._logoUrl; }
  get website(): string | undefined { return this._website; }
  get contactPhone(): string | undefined { return this._contactPhone; }
  get contactEmail(): string | undefined { return this._contactEmail; }
  get trackingUrlTemplate(): string | undefined { return this._trackingUrlTemplate; }
  get apiEnabled(): boolean { return this._apiEnabled; }
  get coverageZones(): readonly string[] | undefined { return this._coverageZones; }
  get supportsCOD(): boolean { return this._supportsCOD; }
  get supportsInsurance(): boolean { return this._supportsInsurance; }
  get supportsInternational(): boolean { return this._supportsInternational; }
  get averageDeliveryDays(): number { return this._averageDeliveryDays; }
  get isDefault(): boolean { return this._isDefault; }
  get priority(): number { return this._priority; }
  get activatedAt(): string | undefined { return this._activatedAt; }
  get deactivatedAt(): string | undefined { return this._deactivatedAt; }
  get suspendedAt(): string | undefined { return this._suspendedAt; }
  get terminatedAt(): string | undefined { return this._terminatedAt; }
  get suspendReason(): string | undefined { return this._suspendReason; }
  get terminateReason(): string | undefined { return this._terminateReason; }
  get deactivateReason(): string | undefined { return this._deactivateReason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): CourierIdVO {
    return CourierIdVO.reconstitute(this.id);
  }

  isPending(): boolean { return this._status.isPending(); }
  isActive(): boolean { return this._status.isActive(); }
  isInactive(): boolean { return this._status.isInactive(); }
  isSuspended(): boolean { return this._status.isSuspended(); }
  isTerminated(): boolean { return this._status.isTerminated(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isOperational(): boolean { return this._status.isOperational(); }

  canBeActivated(): boolean {
    return this._status.isPending() || this._status.isInactive() || this._status.isSuspended();
  }

  canBeSuspended(): boolean {
    return this._status.isActive() || this._status.isInactive();
  }

  canBeTerminated(): boolean {
    return !this._status.isTerminated();
  }

  coversZone(zone: string): boolean {
    if (!this._coverageZones || this._coverageZones.length === 0) return true;
    return this._coverageZones.includes(zone);
  }

  hasApi(): boolean {
    return this._apiEnabled && !!this._trackingUrlTemplate;
  }

  // ═══════════════ Business Actions ═══════════════
  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = CourierStatusVO.active();
    this._activatedAt = now;
    this.emitStatusChange(from, 'active');
    this.addDomainEvent(
      new CourierActivatedEvent({
        aggregateId: this.id,
        payload: { courierId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = CourierStatusVO.create('inactive');
    this._deactivatedAt = now;
    this._deactivateReason = reason;
    this.emitStatusChange(from, 'inactive', reason);
    this.addDomainEvent(
      new CourierDeactivatedEvent({
        aggregateId: this.id,
        payload: { courierId: this.id, reason, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  suspend(reason: string, now: string = new Date().toISOString()): void {
    if (!this.canBeSuspended()) {
      throw new BusinessRuleError(
        `Cannot suspend courier in status "${this._status.value}"`,
        'COURIER_CANNOT_BE_SUSPENDED',
        { courierId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('suspended');
    const from = this._status.value;
    this._status = CourierStatusVO.create('suspended');
    this._suspendedAt = now;
    this._suspendReason = reason;
    this.emitStatusChange(from, 'suspended', reason);
    this.addDomainEvent(
      new CourierSuspendedEvent({
        aggregateId: this.id,
        payload: { courierId: this.id, reason, suspendedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  terminate(reason?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeTerminated()) {
      throw new BusinessRuleError(
        `Courier is already terminated`,
        'COURIER_ALREADY_TERMINATED',
        { courierId: this.id },
      );
    }
    this.assertTransitionTo('terminated');
    const from = this._status.value;
    this._status = CourierStatusVO.create('terminated');
    this._terminatedAt = now;
    this._terminateReason = reason;
    this.emitStatusChange(from, 'terminated', reason);
    this.addDomainEvent(
      new CourierTerminatedEvent({
        aggregateId: this.id,
        payload: { courierId: this.id, reason, terminatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateDetails(
    updates: {
      displayName?: string;
      logoUrl?: string;
      website?: string;
      contactPhone?: string;
      contactEmail?: string;
      trackingUrlTemplate?: string;
      apiEnabled?: boolean;
      coverageZones?: readonly string[];
      supportsCOD?: boolean;
      supportsInsurance?: boolean;
      supportsInternational?: boolean;
      averageDeliveryDays?: number;
      isDefault?: boolean;
      priority?: number;
    },
    now: string = new Date().toISOString(),
  ): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        `Cannot update courier in status "${this._status.value}"`,
        'COURIER_CANNOT_BE_MODIFIED',
        { courierId: this.id, status: this._status.value },
      );
    }
    const changed: string[] = [];

    if (updates.displayName !== undefined) {
      this._displayName = updates.displayName;
      changed.push('displayName');
    }
    if (updates.logoUrl !== undefined) {
      this._logoUrl = updates.logoUrl;
      changed.push('logoUrl');
    }
    if (updates.website !== undefined) {
      this._website = updates.website;
      changed.push('website');
    }
    if (updates.contactPhone !== undefined) {
      this._contactPhone = updates.contactPhone;
      changed.push('contactPhone');
    }
    if (updates.contactEmail !== undefined) {
      this._contactEmail = updates.contactEmail;
      changed.push('contactEmail');
    }
    if (updates.trackingUrlTemplate !== undefined) {
      this._trackingUrlTemplate = updates.trackingUrlTemplate;
      changed.push('trackingUrlTemplate');
    }
    if (updates.apiEnabled !== undefined) {
      this._apiEnabled = updates.apiEnabled;
      changed.push('apiEnabled');
    }
    if (updates.coverageZones !== undefined) {
      this._coverageZones = updates.coverageZones;
      changed.push('coverageZones');
    }
    if (updates.supportsCOD !== undefined) {
      this._supportsCOD = updates.supportsCOD;
      changed.push('supportsCOD');
    }
    if (updates.supportsInsurance !== undefined) {
      this._supportsInsurance = updates.supportsInsurance;
      changed.push('supportsInsurance');
    }
    if (updates.supportsInternational !== undefined) {
      this._supportsInternational = updates.supportsInternational;
      changed.push('supportsInternational');
    }
    if (updates.averageDeliveryDays !== undefined) {
      this._averageDeliveryDays = updates.averageDeliveryDays;
      changed.push('averageDeliveryDays');
    }
    if (updates.isDefault !== undefined) {
      this._isDefault = updates.isDefault;
      changed.push('isDefault');
    }
    if (updates.priority !== undefined) {
      this._priority = updates.priority;
      changed.push('priority');
    }

    if (changed.length === 0) return;

    this.addDomainEvent(
      new CourierUpdatedEvent({
        aggregateId: this.id,
        payload: { courierId: this.id, updatedFields: changed, updatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid courier status transition: "${this._status.value}" → "${target}"`,
        'INVALID_COURIER_STATUS_TRANSITION',
        { from: this._status.value, to: target, courierId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new CourierStatusChangedEvent({
        aggregateId: this.id,
        payload: { courierId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: CourierIdVO;
    props: Omit<CourierEntityProps, 'status'>;
    now: string;
  }): CourierEntity {
    const entity = new CourierEntity(
      params.id.value,
      params.now,
      params.now,
      { ...params.props, status: CourierStatusVO.pending() },
    );
    entity.addDomainEvent(
      new CourierCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          courierId: params.id.value,
          code: params.props.code,
          name: params.props.name.value,
          type: params.props.type.value,
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
    props: CourierEntityProps;
    version?: number;
  }): CourierEntity {
    const entity = new CourierEntity(
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
