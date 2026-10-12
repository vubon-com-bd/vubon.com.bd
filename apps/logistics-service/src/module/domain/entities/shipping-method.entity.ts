/**
 * ShippingMethodEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPPING_METHOD_LIMIT } from '@vubon/shared-constants/logistics';

import { ShippingMethodIdVO } from '../value-objects/primitives/shipping-method-id.vo.js';
import { ShippingMethodStatusVO } from '../value-objects/primitives/shipping-method-status.vo.js';
import { ShippingMethodValueVO } from '../value-objects/primitives/shipping-method-value.vo.js';
import { ShippingRateTypeVO } from '../value-objects/primitives/shipping-rate-type.vo.js';
import { ShippingCostVO } from '../value-objects/primitives/shipping-cost.vo.js';
import { WeightKgVO } from '../value-objects/primitives/weight-kg.vo.js';

import {
  ShippingMethodCreatedEvent,
  ShippingMethodActivatedEvent,
  ShippingMethodDeactivatedEvent,
  ShippingMethodSeasonalEvent,
  ShippingMethodSuspendedEvent,
  ShippingMethodRateUpdatedEvent,
  ShippingMethodMadeDefaultEvent,
} from '../events/shipping-method.events.js';

export interface ShippingMethodEntityProps {
  readonly name: string;
  readonly code: ShippingMethodValueVO;
  readonly displayName: string;
  readonly status: ShippingMethodStatusVO;
  readonly rateType: ShippingRateTypeVO;
  readonly baseCost: ShippingCostVO;
  readonly freeAbove?: ShippingCostVO;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly maxWeightKg?: WeightKgVO;
  readonly maxDimensionsCm?: number;
  readonly codEnabled: boolean;
  readonly trackingEnabled: boolean;
  readonly coverageZones: readonly string[];
  readonly couriers: readonly string[];
  readonly isDefault: boolean;
  readonly isActive: boolean;
}

export class ShippingMethodEntity extends AggregateRoot<string> {
  private _status: ShippingMethodStatusVO;
  private _baseCost: ShippingCostVO;
  private _isDefault: boolean;
  private _isActive: boolean;

  private readonly _name: string;
  private readonly _code: ShippingMethodValueVO;
  private readonly _displayName: string;
  private readonly _rateType: ShippingRateTypeVO;
  private readonly _freeAbove?: ShippingCostVO;
  private readonly _minDeliveryDays: number;
  private readonly _maxDeliveryDays: number;
  private readonly _maxWeightKg?: WeightKgVO;
  private readonly _maxDimensionsCm?: number;
  private readonly _codEnabled: boolean;
  private readonly _trackingEnabled: boolean;
  private readonly _coverageZones: readonly string[];
  private readonly _couriers: readonly string[];

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: ShippingMethodEntityProps, deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._code = props.code;
    this._displayName = props.displayName;
    this._status = props.status;
    this._rateType = props.rateType;
    this._baseCost = props.baseCost;
    this._freeAbove = props.freeAbove;
    this._minDeliveryDays = props.minDeliveryDays;
    this._maxDeliveryDays = props.maxDeliveryDays;
    this._maxWeightKg = props.maxWeightKg;
    this._maxDimensionsCm = props.maxDimensionsCm;
    this._codEnabled = props.codEnabled;
    this._trackingEnabled = props.trackingEnabled;
    this._coverageZones = [...props.coverageZones];
    this._couriers = [...props.couriers];
    this._isDefault = props.isDefault;
    this._isActive = props.isActive;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._name.trim().length === 0) throw new ValidationError('Shipping method name required', 'name');
    if (this._minDeliveryDays < SHIPPING_METHOD_LIMIT.MIN_DELIVERY_DAYS) {
      throw new ValidationError('minDeliveryDays below limit', 'minDeliveryDays');
    }
    if (this._maxDeliveryDays > SHIPPING_METHOD_LIMIT.MAX_DELIVERY_DAYS) {
      throw new ValidationError('maxDeliveryDays above limit', 'maxDeliveryDays');
    }
    if (this._maxDeliveryDays < this._minDeliveryDays) {
      throw new ValidationError('maxDeliveryDays must be ≥ min', 'maxDeliveryDays');
    }
    if (this._baseCost.amount < SHIPPING_METHOD_LIMIT.MIN_SHIPPING_COST) {
      throw new ValidationError('Shipping cost below min', 'baseCost');
    }
    if (this._baseCost.amount > SHIPPING_METHOD_LIMIT.MAX_SHIPPING_COST) {
      throw new ValidationError('Shipping cost above max', 'baseCost');
    }
  }

  get name(): string { return this._name; }
  get code(): ShippingMethodValueVO { return this._code; }
  get displayName(): string { return this._displayName; }
  get status(): ShippingMethodStatusVO { return this._status; }
  get rateType(): ShippingRateTypeVO { return this._rateType; }
  get baseCost(): ShippingCostVO { return this._baseCost; }
  get freeAbove(): ShippingCostVO | undefined { return this._freeAbove; }
  get minDeliveryDays(): number { return this._minDeliveryDays; }
  get maxDeliveryDays(): number { return this._maxDeliveryDays; }
  get maxWeightKg(): WeightKgVO | undefined { return this._maxWeightKg; }
  get maxDimensionsCm(): number | undefined { return this._maxDimensionsCm; }
  get codEnabled(): boolean { return this._codEnabled; }
  get trackingEnabled(): boolean { return this._trackingEnabled; }
  get coverageZones(): readonly string[] { return this._coverageZones; }
  get couriers(): readonly string[] { return this._couriers; }
  get isDefault(): boolean { return this._isDefault; }
  get isActive(): boolean { return this._isActive; }
  get toIdVO(): ShippingMethodIdVO { return ShippingMethodIdVO.reconstitute(this.id); }

  isSelectable(): boolean { return this._status.isSelectable() && this._isActive; }

  coversZone(zoneId: string): boolean {
    return this._coverageZones.length === 0 || this._coverageZones.includes(zoneId);
  }

  canHandleWeight(weightKg: number): boolean {
    if (!this._maxWeightKg) return true;
    return weightKg <= this._maxWeightKg.value;
  }

  calculateCost(orderValue: number, weightKg: number): ShippingCostVO {
    if (this._freeAbove && orderValue >= this._freeAbove.amount) {
      return ShippingCostVO.zero(this._baseCost.currency);
    }
    if (this._rateType.requiresWeight() && weightKg > 5) {
      const extra = Math.ceil(weightKg - 5) * 10;
      return ShippingCostVO.create(this._baseCost.amount + extra, this._baseCost.currency);
    }
    return this._baseCost;
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new ValidationError(`Invalid shipping method status transition: ${this._status.value} → ${target}`, 'status');
    }
  }
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = ShippingMethodStatusVO.active();
    this._isActive = true;
    this.addDomainEvent(new ShippingMethodActivatedEvent({
      aggregateId: this.id,
      payload: { methodId: this.id, fromStatus: from, toStatus: 'active' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = ShippingMethodStatusVO.inactive();
    this._isActive = false;
    this.addDomainEvent(new ShippingMethodDeactivatedEvent({
      aggregateId: this.id,
      payload: { methodId: this.id, fromStatus: from, toStatus: 'inactive', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  makeSeasonal(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('seasonal');
    const from = this._status.value;
    this._status = ShippingMethodStatusVO.seasonal();
    this.addDomainEvent(new ShippingMethodSeasonalEvent({
      aggregateId: this.id,
      payload: { methodId: this.id, fromStatus: from, toStatus: 'seasonal' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  suspend(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('suspended');
    const from = this._status.value;
    this._status = ShippingMethodStatusVO.suspended();
    this._isActive = false;
    this.addDomainEvent(new ShippingMethodSuspendedEvent({
      aggregateId: this.id,
      payload: { methodId: this.id, fromStatus: from, toStatus: 'suspended', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  updateBaseCost(newCost: ShippingCostVO, now: string = new Date().toISOString()): void {
    const previous = this._baseCost.amount;
    this._baseCost = newCost;
    this.addDomainEvent(new ShippingMethodRateUpdatedEvent({
      aggregateId: this.id,
      payload: {
        methodId: this.id,
        previousCost: previous,
        newCost: newCost.amount,
        currency: newCost.currency,
        updatedAt: now,
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markAsDefault(now: string = new Date().toISOString()): void {
    this._isDefault = true;
    this.addDomainEvent(new ShippingMethodMadeDefaultEvent({
      aggregateId: this.id,
      payload: { methodId: this.id, isDefault: true, changedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  unmarkAsDefault(now: string = new Date().toISOString()): void {
    if (!this._isDefault) return;
    this._isDefault = false;
    this.addDomainEvent(new ShippingMethodMadeDefaultEvent({
      aggregateId: this.id,
      payload: { methodId: this.id, isDefault: false, changedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: Omit<ShippingMethodEntityProps, 'status' | 'isActive'> & { status?: ShippingMethodStatusVO };
    now: string;
  }): ShippingMethodEntity {
    const status = params.props.status ?? ShippingMethodStatusVO.active();
    const fullProps: ShippingMethodEntityProps = {
      ...params.props,
      status,
      isActive: status.isSelectable(),
    };
    const entity = new ShippingMethodEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new ShippingMethodCreatedEvent({
      aggregateId: params.id,
      payload: {
        methodId: params.id,
        code: fullProps.code.value,
        name: fullProps.name,
        rateType: fullProps.rateType.value,
        baseCost: fullProps.baseCost.amount,
        currency: fullProps.baseCost.currency,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string; createdAt: string; updatedAt: string;
    deletedAt?: string | null; props: ShippingMethodEntityProps; version?: number;
  }): ShippingMethodEntity {
    const entity = new ShippingMethodEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
