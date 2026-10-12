/**
 * ZoneEntity — AGGREGATE ROOT (coverage area + pricing)
 * @module logistics-service/domain/events
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ZONE } from '@vubon/shared-constants/logistics';

import { ZoneIdVO } from '../value-objects/primitives/zone-id.vo.js';
import { ZoneStatusVO } from '../value-objects/primitives/zone-status.vo.js';
import { ZoneTypeVO } from '../value-objects/primitives/zone-type.vo.js';
import { ZonePricingTypeVO } from '../value-objects/primitives/zone-pricing-type.vo.js';
import { ShippingCostVO } from '../value-objects/primitives/shipping-cost.vo.js';

import {
  ZoneCreatedEvent,
  ZoneActivatedEvent,
  ZoneInactivatedEvent,
  ZoneRestrictedEvent,
  ZoneSuspendedEvent,
  ZoneArchivedEvent,
  ZoneRateUpdatedEvent,
} from '../events/zone.events.js';

import { InvalidZoneStatusTransitionError } from '../errors/zone.errors.js';

export interface ZoneEntityProps {
  readonly name: string;
  readonly code: string;
  readonly type: ZoneTypeVO;
  readonly status: ZoneStatusVO;
  readonly pricingType: ZonePricingTypeVO;
  readonly parentId?: ZoneIdVO;
  readonly postalCodes: readonly string[];
  readonly districts: readonly string[];
  readonly divisions: readonly string[];
  readonly shippingCost: ShippingCostVO;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly codEnabled: boolean;
  readonly codCharge?: number;
  readonly codMaxAmount?: number;
  readonly isRemote: boolean;
  readonly isActive: boolean;
}

export class ZoneEntity extends AggregateRoot<string> {
  private _status: ZoneStatusVO;
  private _shippingCost: ShippingCostVO;
  private _isActive: boolean;

  private readonly _name: string;
  private readonly _code: string;
  private readonly _type: ZoneTypeVO;
  private readonly _pricingType: ZonePricingTypeVO;
  private readonly _parentId?: ZoneIdVO;
  private readonly _postalCodes: readonly string[];
  private readonly _districts: readonly string[];
  private readonly _divisions: readonly string[];
  private readonly _minDeliveryDays: number;
  private readonly _maxDeliveryDays: number;
  private readonly _codEnabled: boolean;
  private readonly _codCharge?: number;
  private readonly _codMaxAmount?: number;
  private readonly _isRemote: boolean;

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: ZoneEntityProps, deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._code = props.code;
    this._type = props.type;
    this._status = props.status;
    this._pricingType = props.pricingType;
    this._parentId = props.parentId;
    this._postalCodes = [...props.postalCodes];
    this._districts = [...props.districts];
    this._divisions = [...props.divisions];
    this._shippingCost = props.shippingCost;
    this._minDeliveryDays = props.minDeliveryDays;
    this._maxDeliveryDays = props.maxDeliveryDays;
    this._codEnabled = props.codEnabled;
    this._codCharge = props.codCharge;
    this._codMaxAmount = props.codMaxAmount;
    this._isRemote = props.isRemote;
    this._isActive = props.isActive;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._name.trim().length === 0) throw new ValidationError('Zone name required', 'name');
    if (this._code.trim().length === 0) throw new ValidationError('Zone code required', 'code');
    if (this._minDeliveryDays < 0 || this._minDeliveryDays > ZONE.MAX_DELIVERY_DAYS) {
      throw new ValidationError(`minDeliveryDays must be 0-${ZONE.MAX_DELIVERY_DAYS}`, 'minDeliveryDays');
    }
    if (this._maxDeliveryDays < this._minDeliveryDays || this._maxDeliveryDays > ZONE.MAX_DELIVERY_DAYS) {
      throw new ValidationError('maxDeliveryDays must be ≥ min and ≤ max', 'maxDeliveryDays');
    }
    if (this._shippingCost.amount > ZONE.MAX_SHIPPING_COST) {
      throw new ValidationError(`Shipping cost exceeds ${ZONE.MAX_SHIPPING_COST}`, 'shippingCost');
    }
  }

  get name(): string { return this._name; }
  get code(): string { return this._code; }
  get type(): ZoneTypeVO { return this._type; }
  get status(): ZoneStatusVO { return this._status; }
  get pricingType(): ZonePricingTypeVO { return this._pricingType; }
  get parentId(): ZoneIdVO | undefined { return this._parentId; }
  get postalCodes(): readonly string[] { return this._postalCodes; }
  get districts(): readonly string[] { return this._districts; }
  get divisions(): readonly string[] { return this._divisions; }
  get shippingCost(): ShippingCostVO { return this._shippingCost; }
  get minDeliveryDays(): number { return this._minDeliveryDays; }
  get maxDeliveryDays(): number { return this._maxDeliveryDays; }
  get codEnabled(): boolean { return this._codEnabled; }
  get codCharge(): number | undefined { return this._codCharge; }
  get codMaxAmount(): number | undefined { return this._codMaxAmount; }
  get isRemote(): boolean { return this._isRemote; }
  get isActive(): boolean { return this._isActive; }
  get toIdVO(): ZoneIdVO { return ZoneIdVO.reconstitute(this.id); }

  canAcceptOrders(): boolean { return this._status.canAcceptOrders() && this._isActive; }

  coversPostalCode(code: string): boolean {
    return this._postalCodes.includes(code);
  }

  coversDistrict(district: string): boolean {
    return this._districts.includes(district);
  }

  coversDivision(division: string): boolean {
    return this._divisions.includes(division);
  }

  get estimatedDeliveryDays(): number {
    return Math.round((this._minDeliveryDays + this._maxDeliveryDays) / 2);
  }

  calculateShippingCost(weightKg: number): ShippingCostVO {
    if (this._pricingType.isFixedPrice()) {
      return this._shippingCost;
    }
    if (this._pricingType.requiresWeight() && weightKg > 5) {
      const extra = Math.ceil(weightKg - 5) * 10;
      return ShippingCostVO.create(this._shippingCost.amount + extra, this._shippingCost.currency);
    }
    return this._shippingCost;
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new InvalidZoneStatusTransitionError(this._status.value, target);
    }
  }
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = ZoneStatusVO.active();
    this._isActive = true;
    this.addDomainEvent(new ZoneActivatedEvent({
      aggregateId: this.id,
      payload: { zoneId: this.id, fromStatus: from, toStatus: 'active' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  inactivate(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = ZoneStatusVO.inactive();
    this._isActive = false;
    this.addDomainEvent(new ZoneInactivatedEvent({
      aggregateId: this.id,
      payload: { zoneId: this.id, fromStatus: from, toStatus: 'inactive', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  restrict(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('restricted');
    const from = this._status.value;
    this._status = ZoneStatusVO.restricted();
    this.addDomainEvent(new ZoneRestrictedEvent({
      aggregateId: this.id,
      payload: { zoneId: this.id, fromStatus: from, toStatus: 'restricted', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  suspend(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('suspended');
    const from = this._status.value;
    this._status = ZoneStatusVO.suspended();
    this._isActive = false;
    this.addDomainEvent(new ZoneSuspendedEvent({
      aggregateId: this.id,
      payload: { zoneId: this.id, fromStatus: from, toStatus: 'suspended', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  archive(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('archived');
    const from = this._status.value;
    this._status = ZoneStatusVO.archived();
    this._isActive = false;
    this.addDomainEvent(new ZoneArchivedEvent({
      aggregateId: this.id,
      payload: { zoneId: this.id, fromStatus: from, toStatus: 'archived' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  updateShippingCost(newCost: ShippingCostVO, now: string = new Date().toISOString()): void {
    const previous = this._shippingCost.amount;
    this._shippingCost = newCost;
    this.addDomainEvent(new ZoneRateUpdatedEvent({
      aggregateId: this.id,
      payload: {
        zoneId: this.id,
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

  static create(params: {
    id: string;
    props: Omit<ZoneEntityProps, 'status' | 'isActive'> & { status?: ZoneStatusVO };
    now: string;
  }): ZoneEntity {
    const status = params.props.status ?? ZoneStatusVO.inactive();
    const fullProps: ZoneEntityProps = {
      ...params.props,
      status,
      isActive: status.isActive(),
    };
    const entity = new ZoneEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new ZoneCreatedEvent({
      aggregateId: params.id,
      payload: {
        zoneId: params.id,
        code: fullProps.code,
        name: fullProps.name,
        type: fullProps.type.value,
        shippingCost: fullProps.shippingCost.amount,
        currency: fullProps.shippingCost.currency,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string; createdAt: string; updatedAt: string;
    deletedAt?: string | null; props: ZoneEntityProps; version?: number;
  }): ZoneEntity {
    const entity = new ZoneEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
