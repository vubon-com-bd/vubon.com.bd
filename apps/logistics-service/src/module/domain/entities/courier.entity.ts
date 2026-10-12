/**
 * CourierEntity — AGGREGATE ROOT (courier vendor configuration)
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import type { Phone, Email, Url } from '@vubon/shared-types/common';

import { CourierIdVO } from '../value-objects/primitives/courier-id.vo.js';
import { CourierStatusVO } from '../value-objects/primitives/courier-status.vo.js';
import { CourierTypeVO } from '../value-objects/primitives/courier-type.vo.js';
import { CourierNameVO } from '../value-objects/primitives/courier-name.vo.js';
import { CourierConfigVO } from '../value-objects/composites/courier-config.vo.js';

import {
  CourierRegisteredEvent,
  CourierActivatedEvent,
  CourierDeactivatedEvent,
  CourierSuspendedEvent,
  CourierTerminatedEvent,
  CourierConfigUpdatedEvent,
  CourierDefaultChangedEvent,
} from '../events/courier.events.js';

import { InvalidCourierStatusTransitionError } from '../errors/courier.errors.js';

export interface CourierEntityProps {
  readonly name: string;
  readonly code: CourierNameVO;
  readonly displayName: string;
  readonly type: CourierTypeVO;
  readonly status: CourierStatusVO;
  readonly logoUrl?: Url;
  readonly website?: Url;
  readonly contactPhone?: Phone;
  readonly contactEmail?: Email;
  readonly trackingUrlTemplate?: string;
  readonly apiEnabled: boolean;
  readonly config?: CourierConfigVO;
  readonly coverageZones: readonly string[];
  readonly supportsCOD: boolean;
  readonly supportsInsurance: boolean;
  readonly supportsInternational: boolean;
  readonly averageDeliveryDays: number;
  readonly isDefault: boolean;
  readonly priority: number;
}

export class CourierEntity extends AggregateRoot<string> {
  private _status: CourierStatusVO;
  private _isDefault: boolean;
  private _priority: number;
  private _config?: CourierConfigVO;
  private _apiEnabled: boolean;
  private _coverageZones: readonly string[];

  private readonly _name: string;
  private readonly _code: CourierNameVO;
  private readonly _displayName: string;
  private readonly _type: CourierTypeVO;
  private readonly _logoUrl?: Url;
  private readonly _website?: Url;
  private readonly _contactPhone?: Phone;
  private readonly _contactEmail?: Email;
  private readonly _trackingUrlTemplate?: string;
  private readonly _supportsCOD: boolean;
  private readonly _supportsInsurance: boolean;
  private readonly _supportsInternational: boolean;
  private readonly _averageDeliveryDays: number;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CourierEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._code = props.code;
    this._displayName = props.displayName;
    this._type = props.type;
    this._status = props.status;
    this._logoUrl = props.logoUrl;
    this._website = props.website;
    this._contactPhone = props.contactPhone;
    this._contactEmail = props.contactEmail;
    this._trackingUrlTemplate = props.trackingUrlTemplate;
    this._apiEnabled = props.apiEnabled;
    this._config = props.config;
    this._coverageZones = [...props.coverageZones];
    this._supportsCOD = props.supportsCOD;
    this._supportsInsurance = props.supportsInsurance;
    this._supportsInternational = props.supportsInternational;
    this._averageDeliveryDays = props.averageDeliveryDays;
    this._isDefault = props.isDefault;
    this._priority = props.priority;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._name.trim().length === 0) {
      throw new ValidationError('Courier name cannot be empty', 'name');
    }
    if (this._averageDeliveryDays < 1 || this._averageDeliveryDays > 90) {
      throw new ValidationError('averageDeliveryDays must be 1-90', 'averageDeliveryDays');
    }
    if (this._priority < 0 || this._priority > 100) {
      throw new ValidationError('Priority must be 0-100', 'priority');
    }
    if (this._apiEnabled && !this._config) {
      throw new ValidationError('API-enabled courier requires config', 'config');
    }
  }

  get name(): string { return this._name; }
  get code(): CourierNameVO { return this._code; }
  get displayName(): string { return this._displayName; }
  get type(): CourierTypeVO { return this._type; }
  get status(): CourierStatusVO { return this._status; }
  get logoUrl(): Url | undefined { return this._logoUrl; }
  get website(): Url | undefined { return this._website; }
  get contactPhone(): Phone | undefined { return this._contactPhone; }
  get contactEmail(): Email | undefined { return this._contactEmail; }
  get trackingUrlTemplate(): string | undefined { return this._trackingUrlTemplate; }
  get apiEnabled(): boolean { return this._apiEnabled; }
  get config(): CourierConfigVO | undefined { return this._config; }
  get coverageZones(): readonly string[] { return this._coverageZones; }
  get supportsCOD(): boolean { return this._supportsCOD; }
  get supportsInsurance(): boolean { return this._supportsInsurance; }
  get supportsInternational(): boolean { return this._supportsInternational; }
  get averageDeliveryDays(): number { return this._averageDeliveryDays; }
  get isDefault(): boolean { return this._isDefault; }
  get priority(): number { return this._priority; }
  get toIdVO(): CourierIdVO { return CourierIdVO.reconstitute(this.id); }

  isActive(): boolean { return this._status.isActive(); }
  isOperational(): boolean { return this._status.isOperational(); }
  isFinal(): boolean { return this._status.isFinal(); }

  canShipTo(zone: string): boolean {
    return this._coverageZones.length === 0 || this._coverageZones.includes(zone);
  }

  supportsCurrency(currency: string): boolean {
    if (!this._config) return true;
    if (this._type.isInternational()) return true;
    return currency === 'BDT';
  }

  canHandle(shipment: { isCOD: boolean; isInsured: boolean; isInternational: boolean }): boolean {
    if (shipment.isCOD && !this._supportsCOD) return false;
    if (shipment.isInsured && !this._supportsInsurance) return false;
    if (shipment.isInternational && !this._supportsInternational) return false;
    return this.isOperational();
  }

  // ─── Private helpers ───
  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new InvalidCourierStatusTransitionError(this._status.value, target);
    }
  }
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ─── Lifecycle ───
  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = CourierStatusVO.active();
    this.addDomainEvent(new CourierActivatedEvent({
      aggregateId: this.id,
      payload: { courierId: this.id, fromStatus: from, toStatus: 'active' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = CourierStatusVO.inactive();
    this.addDomainEvent(new CourierDeactivatedEvent({
      aggregateId: this.id,
      payload: { courierId: this.id, fromStatus: from, toStatus: 'inactive', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  suspend(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('suspended');
    const from = this._status.value;
    this._status = CourierStatusVO.suspended();
    this.addDomainEvent(new CourierSuspendedEvent({
      aggregateId: this.id,
      payload: { courierId: this.id, fromStatus: from, toStatus: 'suspended', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  terminate(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('terminated');
    const from = this._status.value;
    this._status = CourierStatusVO.terminated();
    this.addDomainEvent(new CourierTerminatedEvent({
      aggregateId: this.id,
      payload: { courierId: this.id, fromStatus: from, toStatus: 'terminated', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  updateConfig(config: CourierConfigVO, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot update config of courier in status "${this._status.value}"`,
        'COURIER_CANNOT_BE_MODIFIED',
        { courierId: this.id, status: this._status.value },
      );
    }
    this._config = config;
    this._apiEnabled = config.isEnabled;
    this.addDomainEvent(new CourierConfigUpdatedEvent({
      aggregateId: this.id,
      payload: { courierId: this.id, fields: ['config', 'apiEnabled'], updatedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  changePriority(priority: number, now: string = new Date().toISOString()): void {
    if (priority < 0 || priority > 100) {
      throw new ValidationError('Priority must be 0-100', 'priority');
    }
    this._priority = priority;
    this.touch(now);
    this.incrementVersion();
  }

  markAsDefault(now: string = new Date().toISOString()): void {
    if (!this.isOperational()) {
      throw new BusinessRuleError(
        'Only operational courier can be marked default',
        'COURIER_NOT_OPERATIONAL',
        { courierId: this.id, status: this._status.value },
      );
    }
    this._isDefault = true;
    this.addDomainEvent(new CourierDefaultChangedEvent({
      aggregateId: this.id,
      payload: { courierId: this.id, isDefault: true, changedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  unmarkAsDefault(now: string = new Date().toISOString()): void {
    if (!this._isDefault) return;
    this._isDefault = false;
    this.addDomainEvent(new CourierDefaultChangedEvent({
      aggregateId: this.id,
      payload: { courierId: this.id, isDefault: false, changedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  // ─── Factories ───
  static create(params: {
    id: string;
    props: Omit<CourierEntityProps, 'status'>;
    now: string;
  }): CourierEntity {
    const fullProps: CourierEntityProps = { ...params.props, status: CourierStatusVO.pending() };
    const entity = new CourierEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new CourierRegisteredEvent({
      aggregateId: params.id,
      payload: {
        courierId: params.id,
        code: fullProps.code.value,
        name: fullProps.name,
        type: fullProps.type.value,
        supportsCOD: fullProps.supportsCOD,
        supportsInsurance: fullProps.supportsInsurance,
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
    props: CourierEntityProps;
    version?: number;
  }): CourierEntity {
    const entity = new CourierEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
