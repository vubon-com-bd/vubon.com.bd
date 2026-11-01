/**
 * ZoneEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ZONE } from '@vubon/shared-constants/logistics';

import { ZoneIdVO } from '../value-objects/primitives/zone-id.vo.js';
import { ZoneNameVO } from '../value-objects/primitives/zone-name.vo.js';
import { ZoneStatusVO } from '../value-objects/primitives/zone-status.vo.js';
import { ZoneTypeVO } from '../value-objects/primitives/zone-type.vo.js';
import { ZonePricingTypeVO } from '../value-objects/primitives/zone-pricing-type.vo.js';

import {
  ZoneCreatedEvent,
  ZoneActivatedEvent,
  ZoneDeactivatedEvent,
  ZoneRestrictedEvent,
  ZoneSuspendedEvent,
  ZoneArchivedEvent,
  ZonePricingUpdatedEvent,
  ZoneCoverageUpdatedEvent,
  ZoneStatusChangedEvent,
} from '../events/zone.events.js';

export interface ZoneEntityProps {
  readonly name: ZoneNameVO;
  readonly code: string;
  readonly type: ZoneTypeVO;
  readonly status: ZoneStatusVO;
  readonly pricingType: ZonePricingTypeVO;
  readonly parentId?: string;
  readonly postalCodes?: readonly string[];
  readonly districts?: readonly string[];
  readonly divisions?: readonly string[];
  readonly shippingCost: number;
  readonly freeAbove?: number;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly codEnabled: boolean;
  readonly codCharge?: number;
  readonly codMaxAmount?: number;
  readonly isRemote: boolean;
  readonly isActive: boolean;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly restrictedAt?: string;
  readonly suspendedAt?: string;
  readonly archivedAt?: string;
  readonly statusReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class ZoneEntity extends AggregateRoot<string> {
  private _status: ZoneStatusVO;
  private _postalCodes?: readonly string[];
  private _districts?: readonly string[];
  private _divisions?: readonly string[];
  private _shippingCost: number;
  private _freeAbove?: number;
  private _minDeliveryDays: number;
  private _maxDeliveryDays: number;
  private _codEnabled: boolean;
  private _codCharge?: number;
  private _codMaxAmount?: number;
  private _isRemote: boolean;
  private _isActive: boolean;
  private _activatedAt?: string;
  private _deactivatedAt?: string;
  private _restrictedAt?: string;
  private _suspendedAt?: string;
  private _archivedAt?: string;
  private _statusReason?: string;

  private readonly _name: ZoneNameVO;
  private readonly _code: string;
  private readonly _type: ZoneTypeVO;
  private readonly _pricingType: ZonePricingTypeVO;
  private readonly _parentId?: string;
  private readonly _currency: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ZoneEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._code = props.code;
    this._type = props.type;
    this._status = props.status;
    this._pricingType = props.pricingType;
    this._parentId = props.parentId;
    this._postalCodes = props.postalCodes;
    this._districts = props.districts;
    this._divisions = props.divisions;
    this._shippingCost = props.shippingCost;
    this._freeAbove = props.freeAbove;
    this._currency = props.currency;
    this._minDeliveryDays = props.minDeliveryDays;
    this._maxDeliveryDays = props.maxDeliveryDays;
    this._codEnabled = props.codEnabled;
    this._codCharge = props.codCharge;
    this._codMaxAmount = props.codMaxAmount;
    this._isRemote = props.isRemote;
    this._isActive = props.isActive;
    this._activatedAt = props.activatedAt;
    this._deactivatedAt = props.deactivatedAt;
    this._restrictedAt = props.restrictedAt;
    this._suspendedAt = props.suspendedAt;
    this._archivedAt = props.archivedAt;
    this._statusReason = props.statusReason;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._code || this._code.trim().length === 0) {
      throw new ValidationError('Code required', 'code');
    }
    if (!this._currency) {
      throw new ValidationError('Currency required', 'currency');
    }
    if (this._shippingCost < 0 || this._shippingCost > ZONE.MAX_SHIPPING_COST) {
      throw new ValidationError(
        `Shipping cost must be 0-${ZONE.MAX_SHIPPING_COST}`,
        'shippingCost',
      );
    }
    if (this._freeAbove !== undefined && this._freeAbove < 0) {
      throw new ValidationError('Free-above amount cannot be negative', 'freeAbove');
    }
    if (this._minDeliveryDays < 0) {
      throw new ValidationError('Min delivery days cannot be negative', 'minDeliveryDays');
    }
    if (this._maxDeliveryDays < this._minDeliveryDays) {
      throw new ValidationError(
        'maxDeliveryDays must be ≥ minDeliveryDays',
        'maxDeliveryDays',
      );
    }
    if (this._codMaxAmount !== undefined) {
      if (this._codMaxAmount > ZONE.COD_MAX_AMOUNT) {
        throw new ValidationError(
          `COD max amount ${this._codMaxAmount} exceeds limit ${ZONE.COD_MAX_AMOUNT}`,
          'codMaxAmount',
        );
      }
    }
  }

  get name(): ZoneNameVO { return this._name; }
  get code(): string { return this._code; }
  get type(): ZoneTypeVO { return this._type; }
  get status(): ZoneStatusVO { return this._status; }
  get pricingType(): ZonePricingTypeVO { return this._pricingType; }
  get parentId(): string | undefined { return this._parentId; }
  get postalCodes(): readonly string[] | undefined { return this._postalCodes; }
  get districts(): readonly string[] | undefined { return this._districts; }
  get divisions(): readonly string[] | undefined { return this._divisions; }
  get shippingCost(): number { return this._shippingCost; }
  get freeAbove(): number | undefined { return this._freeAbove; }
  get currency(): string { return this._currency; }
  get minDeliveryDays(): number { return this._minDeliveryDays; }
  get maxDeliveryDays(): number { return this._maxDeliveryDays; }
  get codEnabled(): boolean { return this._codEnabled; }
  get codCharge(): number | undefined { return this._codCharge; }
  get codMaxAmount(): number | undefined { return this._codMaxAmount; }
  get isRemote(): boolean { return this._isRemote; }
  get isActive(): boolean { return this._isActive; }
  get activatedAt(): string | undefined { return this._activatedAt; }
  get deactivatedAt(): string | undefined { return this._deactivatedAt; }
  get restrictedAt(): string | undefined { return this._restrictedAt; }
  get suspendedAt(): string | undefined { return this._suspendedAt; }
  get archivedAt(): string | undefined { return this._archivedAt; }
  get statusReason(): string | undefined { return this._statusReason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): ZoneIdVO { return ZoneIdVO.reconstitute(this.id); }

  isZoneActive(): boolean { return this._status.isActive(); }
  isInactive(): boolean { return this._status.isInactive(); }
  isRestricted(): boolean { return this._status.isRestricted(); }
  isSuspended(): boolean { return this._status.isSuspended(); }
  isArchived(): boolean { return this._status.isArchived(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isUsable(): boolean { return this._status.isUsable(); }

  coversPostalCode(postalCode: string): boolean {
    if (!this._postalCodes) return false;
    return this._postalCodes.includes(postalCode);
  }

  coversDistrict(district: string): boolean {
    if (!this._districts) return false;
    return this._districts.includes(district);
  }

  coversDivision(division: string): boolean {
    if (!this._divisions) return false;
    return this._divisions.includes(division);
  }

  isFreeShipping(orderAmount: number): boolean {
    if (this._freeAbove === undefined) return false;
    return orderAmount >= this._freeAbove;
  }

  canAcceptCOD(amount: number): boolean {
    if (!this._codEnabled) return false;
    if (this._codMaxAmount === undefined) return true;
    return amount <= this._codMaxAmount;
  }

  get deliveryRange(): string {
    return `${this._minDeliveryDays}-${this._maxDeliveryDays} days`;
  }

  // ═══ Business Actions ═══
  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = ZoneStatusVO.active();
    this._isActive = true;
    this._activatedAt = now;
    this.emitStatusChange(from, 'active');
    this.addDomainEvent(
      new ZoneActivatedEvent({
        aggregateId: this.id,
        payload: { zoneId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = ZoneStatusVO.create('inactive');
    this._isActive = false;
    this._deactivatedAt = now;
    this._statusReason = reason;
    this.emitStatusChange(from, 'inactive', reason);
    this.addDomainEvent(
      new ZoneDeactivatedEvent({
        aggregateId: this.id,
        payload: { zoneId: this.id, reason, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  restrict(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('restricted');
    const from = this._status.value;
    this._status = ZoneStatusVO.create('restricted');
    this._restrictedAt = now;
    this._statusReason = reason;
    this.emitStatusChange(from, 'restricted', reason);
    this.addDomainEvent(
      new ZoneRestrictedEvent({
        aggregateId: this.id,
        payload: { zoneId: this.id, reason, restrictedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  suspend(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('suspended');
    const from = this._status.value;
    this._status = ZoneStatusVO.create('suspended');
    this._isActive = false;
    this._suspendedAt = now;
    this._statusReason = reason;
    this.emitStatusChange(from, 'suspended', reason);
    this.addDomainEvent(
      new ZoneSuspendedEvent({
        aggregateId: this.id,
        payload: { zoneId: this.id, reason, suspendedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  archive(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('archived');
    const from = this._status.value;
    this._status = ZoneStatusVO.create('archived');
    this._isActive = false;
    this._archivedAt = now;
    this.emitStatusChange(from, 'archived');
    this.addDomainEvent(
      new ZoneArchivedEvent({
        aggregateId: this.id,
        payload: { zoneId: this.id, archivedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updatePricing(
    params: {
      shippingCost?: number;
      freeAbove?: number;
      codEnabled?: boolean;
      codCharge?: number;
      codMaxAmount?: number;
    },
    now: string = new Date().toISOString(),
  ): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        `Cannot update pricing for archived zone`,
        'ZONE_ARCHIVED',
        { zoneId: this.id },
      );
    }
    if (params.shippingCost !== undefined) {
      if (params.shippingCost < 0 || params.shippingCost > ZONE.MAX_SHIPPING_COST) {
        throw new ValidationError(
          `Shipping cost must be 0-${ZONE.MAX_SHIPPING_COST}`,
          'shippingCost',
        );
      }
      this._shippingCost = params.shippingCost;
    }
    if (params.freeAbove !== undefined) this._freeAbove = params.freeAbove;
    if (params.codEnabled !== undefined) this._codEnabled = params.codEnabled;
    if (params.codCharge !== undefined) this._codCharge = params.codCharge;
    if (params.codMaxAmount !== undefined) this._codMaxAmount = params.codMaxAmount;

    this.addDomainEvent(
      new ZonePricingUpdatedEvent({
        aggregateId: this.id,
        payload: {
          zoneId: this.id,
          shippingCost: this._shippingCost,
          currency: this._currency,
          freeAbove: this._freeAbove,
          updatedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateCoverage(
    params: {
      postalCodes?: readonly string[];
      districts?: readonly string[];
      divisions?: readonly string[];
    },
    now: string = new Date().toISOString(),
  ): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        `Cannot update coverage for archived zone`,
        'ZONE_ARCHIVED',
        { zoneId: this.id },
      );
    }
    if (params.postalCodes !== undefined) this._postalCodes = params.postalCodes;
    if (params.districts !== undefined) this._districts = params.districts;
    if (params.divisions !== undefined) this._divisions = params.divisions;

    this.addDomainEvent(
      new ZoneCoverageUpdatedEvent({
        aggregateId: this.id,
        payload: {
          zoneId: this.id,
          postalCodes: this._postalCodes,
          districts: this._districts,
          divisions: this._divisions,
          updatedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid zone status transition: "${this._status.value}" → "${target}"`,
        'INVALID_ZONE_STATUS_TRANSITION',
        { from: this._status.value, to: target, zoneId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new ZoneStatusChangedEvent({
        aggregateId: this.id,
        payload: { zoneId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: ZoneIdVO;
    props: Omit<ZoneEntityProps, 'status' | 'isActive'>;
    now: string;
  }): ZoneEntity {
    const entity = new ZoneEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        status: ZoneStatusVO.create('inactive'),
        isActive: false,
      },
    );
    entity.addDomainEvent(
      new ZoneCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          zoneId: params.id.value,
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
    props: ZoneEntityProps;
    version?: number;
  }): ZoneEntity {
    const entity = new ZoneEntity(
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
