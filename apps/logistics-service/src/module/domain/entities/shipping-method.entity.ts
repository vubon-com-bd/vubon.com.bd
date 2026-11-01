/**
 * ShippingMethodEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPPING_METHOD_LIMIT } from '@vubon/shared-constants/logistics';

import { ShippingMethodIdVO } from '../value-objects/primitives/shipping-method-id.vo.js';
import { ShippingMethodTypeVO } from '../value-objects/primitives/shipping-method-type.vo.js';
import { ShippingMethodStatusVO } from '../value-objects/primitives/shipping-method-status.vo.js';
import { ShippingRateTypeVO } from '../value-objects/primitives/shipping-rate-type.vo.js';

import {
  ShippingMethodCreatedEvent,
  ShippingMethodActivatedEvent,
  ShippingMethodDeactivatedEvent,
  ShippingMethodSuspendedEvent,
  ShippingMethodRateUpdatedEvent,
  ShippingMethodStatusChangedEvent,
} from '../events/shipping-method.events.js';

export interface ShippingMethodEntityProps {
  readonly name: string;
  readonly code: string;
  readonly displayName: string;
  readonly status: ShippingMethodStatusVO;
  readonly type: ShippingMethodTypeVO;
  readonly rateType: ShippingRateTypeVO;
  readonly baseCost: number;
  readonly freeAbove?: number;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly maxWeightKg?: number;
  readonly maxDimensionsCm?: number;
  readonly codEnabled: boolean;
  readonly trackingEnabled: boolean;
  readonly coverageZones?: readonly string[];
  readonly couriers?: readonly string[];
  readonly isDefault: boolean;
  readonly isActive: boolean;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly suspendedAt?: string;
  readonly suspendReason?: string;
  readonly deactivateReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class ShippingMethodEntity extends AggregateRoot<string> {
  private _status: ShippingMethodStatusVO;
  private _displayName: string;
  private _baseCost: number;
  private _freeAbove?: number;
  private _minDeliveryDays: number;
  private _maxDeliveryDays: number;
  private _maxWeightKg?: number;
  private _maxDimensionsCm?: number;
  private _codEnabled: boolean;
  private _trackingEnabled: boolean;
  private _coverageZones?: readonly string[];
  private _couriers?: readonly string[];
  private _isDefault: boolean;
  private _isActive: boolean;
  private _activatedAt?: string;
  private _deactivatedAt?: string;
  private _suspendedAt?: string;
  private _suspendReason?: string;
  private _deactivateReason?: string;

  private readonly _name: string;
  private readonly _code: string;
  private readonly _type: ShippingMethodTypeVO;
  private readonly _rateType: ShippingRateTypeVO;
  private readonly _currency: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ShippingMethodEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._code = props.code;
    this._displayName = props.displayName;
    this._status = props.status;
    this._type = props.type;
    this._rateType = props.rateType;
    this._baseCost = props.baseCost;
    this._freeAbove = props.freeAbove;
    this._currency = props.currency;
    this._minDeliveryDays = props.minDeliveryDays;
    this._maxDeliveryDays = props.maxDeliveryDays;
    this._maxWeightKg = props.maxWeightKg;
    this._maxDimensionsCm = props.maxDimensionsCm;
    this._codEnabled = props.codEnabled;
    this._trackingEnabled = props.trackingEnabled;
    this._coverageZones = props.coverageZones;
    this._couriers = props.couriers;
    this._isDefault = props.isDefault;
    this._isActive = props.isActive;
    this._activatedAt = props.activatedAt;
    this._deactivatedAt = props.deactivatedAt;
    this._suspendedAt = props.suspendedAt;
    this._suspendReason = props.suspendReason;
    this._deactivateReason = props.deactivateReason;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._code || this._code.trim().length === 0) {
      throw new ValidationError('Code required', 'code');
    }
    if (!this._displayName || this._displayName.trim().length === 0) {
      throw new ValidationError('Display name required', 'displayName');
    }
    if (!this._currency) {
      throw new ValidationError('Currency required', 'currency');
    }
    if (this._baseCost < 0 || this._baseCost > SHIPPING_METHOD_LIMIT.MAX_SHIPPING_COST) {
      throw new ValidationError(
        `Base cost must be 0-${SHIPPING_METHOD_LIMIT.MAX_SHIPPING_COST}`,
        'baseCost',
      );
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
    if (this._maxWeightKg !== undefined && this._maxWeightKg <= 0) {
      throw new ValidationError('Max weight must be positive', 'maxWeightKg');
    }
  }

  get name(): string { return this._name; }
  get code(): string { return this._code; }
  get displayName(): string { return this._displayName; }
  get status(): ShippingMethodStatusVO { return this._status; }
  get type(): ShippingMethodTypeVO { return this._type; }
  get rateType(): ShippingRateTypeVO { return this._rateType; }
  get baseCost(): number { return this._baseCost; }
  get freeAbove(): number | undefined { return this._freeAbove; }
  get currency(): string { return this._currency; }
  get minDeliveryDays(): number { return this._minDeliveryDays; }
  get maxDeliveryDays(): number { return this._maxDeliveryDays; }
  get maxWeightKg(): number | undefined { return this._maxWeightKg; }
  get maxDimensionsCm(): number | undefined { return this._maxDimensionsCm; }
  get codEnabled(): boolean { return this._codEnabled; }
  get trackingEnabled(): boolean { return this._trackingEnabled; }
  get coverageZones(): readonly string[] | undefined { return this._coverageZones; }
  get couriers(): readonly string[] | undefined { return this._couriers; }
  get isDefault(): boolean { return this._isDefault; }
  get isActive(): boolean { return this._isActive; }
  get activatedAt(): string | undefined { return this._activatedAt; }
  get deactivatedAt(): string | undefined { return this._deactivatedAt; }
  get suspendedAt(): string | undefined { return this._suspendedAt; }
  get suspendReason(): string | undefined { return this._suspendReason; }
  get deactivateReason(): string | undefined { return this._deactivateReason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): ShippingMethodIdVO {
    return ShippingMethodIdVO.reconstitute(this.id);
  }

  isMethodActive(): boolean { return this._status.isActive(); }
  isInactive(): boolean { return this._status.isInactive(); }
  isSeasonal(): boolean { return this._status.isSeasonal(); }
  isSuspended(): boolean { return this._status.isSuspended(); }
  isUsable(): boolean { return this._status.isUsable(); }

  coversZone(zone: string): boolean {
    if (!this._coverageZones || this._coverageZones.length === 0) return true;
    return this._coverageZones.includes(zone);
  }

  canHandleWeight(weightKg: number): boolean {
    if (this._maxWeightKg === undefined) return true;
    return weightKg <= this._maxWeightKg;
  }

  isFreeShipping(orderAmount: number): boolean {
    if (this._freeAbove === undefined) return false;
    return orderAmount >= this._freeAbove;
  }

  calculateCost(params: {
    orderAmount: number;
    weightKg?: number;
    isCOD?: boolean;
  }): { baseCost: number; codCharge: number; total: number; isFree: boolean } {
    const isFree = this.isFreeShipping(params.orderAmount);
    const baseCost = isFree ? 0 : this._baseCost;
    let codCharge = 0;
    if (params.isCOD && this._codEnabled) {
      codCharge = 20; // BD standard COD charge
    }
    return {
      baseCost,
      codCharge,
      total: baseCost + codCharge,
      isFree,
    };
  }

  get deliveryRange(): string {
    return `${this._minDeliveryDays}-${this._maxDeliveryDays} days`;
  }

  // ═══ Business Actions ═══
  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = ShippingMethodStatusVO.active();
    this._isActive = true;
    this._activatedAt = now;
    this.emitStatusChange(from, 'active');
    this.addDomainEvent(
      new ShippingMethodActivatedEvent({
        aggregateId: this.id,
        payload: { methodId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = ShippingMethodStatusVO.create('inactive');
    this._isActive = false;
    this._deactivatedAt = now;
    this._deactivateReason = reason;
    this.emitStatusChange(from, 'inactive', reason);
    this.addDomainEvent(
      new ShippingMethodDeactivatedEvent({
        aggregateId: this.id,
        payload: { methodId: this.id, reason, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  suspend(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('suspended');
    const from = this._status.value;
    this._status = ShippingMethodStatusVO.create('suspended');
    this._isActive = false;
    this._suspendedAt = now;
    this._suspendReason = reason;
    this.emitStatusChange(from, 'suspended', reason);
    this.addDomainEvent(
      new ShippingMethodSuspendedEvent({
        aggregateId: this.id,
        payload: { methodId: this.id, reason, suspendedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateRate(
    params: {
      baseCost?: number;
      freeAbove?: number;
      maxWeightKg?: number;
      maxDimensionsCm?: number;
    },
    now: string = new Date().toISOString(),
  ): void {
    if (params.baseCost !== undefined) {
      if (
        params.baseCost < 0 ||
        params.baseCost > SHIPPING_METHOD_LIMIT.MAX_SHIPPING_COST
      ) {
        throw new ValidationError(
          `Base cost must be 0-${SHIPPING_METHOD_LIMIT.MAX_SHIPPING_COST}`,
          'baseCost',
        );
      }
      this._baseCost = params.baseCost;
    }
    if (params.freeAbove !== undefined) this._freeAbove = params.freeAbove;
    if (params.maxWeightKg !== undefined) this._maxWeightKg = params.maxWeightKg;
    if (params.maxDimensionsCm !== undefined) this._maxDimensionsCm = params.maxDimensionsCm;

    this.addDomainEvent(
      new ShippingMethodRateUpdatedEvent({
        aggregateId: this.id,
        payload: {
          methodId: this.id,
          baseCost: this._baseCost,
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

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid shipping method status transition: "${this._status.value}" → "${target}"`,
        'INVALID_SHIPPING_METHOD_STATUS_TRANSITION',
        { from: this._status.value, to: target, methodId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new ShippingMethodStatusChangedEvent({
        aggregateId: this.id,
        payload: { methodId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: ShippingMethodIdVO;
    props: Omit<ShippingMethodEntityProps, 'status' | 'isActive'>;
    now: string;
  }): ShippingMethodEntity {
    const entity = new ShippingMethodEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        status: ShippingMethodStatusVO.create('inactive'),
        isActive: false,
      },
    );
    entity.addDomainEvent(
      new ShippingMethodCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          methodId: params.id.value,
          code: params.props.code,
          displayName: params.props.displayName,
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
    props: ShippingMethodEntityProps;
    version?: number;
  }): ShippingMethodEntity {
    const entity = new ShippingMethodEntity(
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
