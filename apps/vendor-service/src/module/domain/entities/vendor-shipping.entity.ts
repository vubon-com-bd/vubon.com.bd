/**
 * VendorShippingEntity — vendor's shipping configuration
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SHIPPING } from '@vubon/shared-constants/business';
import { ShippingMethodVO } from '../value-objects/primitives/shipping-method.vo.js';
import { ShippingZoneVO } from '../value-objects/primitives/shipping-zone.vo.js';
import { ShippingCostVO } from '../value-objects/primitives/shipping-cost.vo.js';
import { DeliveryDaysVO } from '../value-objects/primitives/delivery-days.vo.js';

export interface ShippingRateProps {
  readonly method: ShippingMethodVO;
  readonly zone: ShippingZoneVO;
  readonly cost: ShippingCostVO;
  readonly deliveryDays: DeliveryDaysVO;
  readonly isActive: boolean;
}

export interface VendorShippingEntityProps {
  readonly vendorId: string;
  readonly rates: readonly ShippingRateProps[];
  readonly defaultMethod: ShippingMethodVO;
  readonly trackingRequired: boolean;
  readonly allowPickup: boolean;
  readonly allowCourier: boolean;
  readonly freeShippingThreshold?: number;
}

export class VendorShippingEntity extends BaseEntity<string> {
  private _rates: ShippingRateProps[];
  private _defaultMethod: ShippingMethodVO;
  private _trackingRequired: boolean;
  private _allowPickup: boolean;
  private _allowCourier: boolean;
  private _freeShippingThreshold?: number;

  private readonly _vendorId: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorShippingEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._rates = [...props.rates];
    this._defaultMethod = props.defaultMethod;
    this._trackingRequired = props.trackingRequired;
    this._allowPickup = props.allowPickup;
    this._allowCourier = props.allowCourier;
    this._freeShippingThreshold = props.freeShippingThreshold;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._rates.length > 50) {
      throw new ValidationError('Shipping rates cannot exceed 50 items', 'rates');
    }
    const seen = new Set<string>();
    for (const r of this._rates) {
      const key = `${r.method.value}:${r.zone.value}`;
      if (seen.has(key)) {
        throw new ValidationError(`Duplicate shipping rate ${key}`, 'rates');
      }
      seen.add(key);
    }
    // Default method must be in active rates
    const hasDefault = this._rates.some(
      (r) => r.method.value === this._defaultMethod.value && r.isActive,
    );
    if (!hasDefault && this._rates.length > 0) {
      throw new ValidationError(
        `Default method "${this._defaultMethod.value}" has no active rate`,
        'defaultMethod',
      );
    }
    if (this._freeShippingThreshold !== undefined && this._freeShippingThreshold < 0) {
      throw new ValidationError('Free shipping threshold must be non-negative', 'freeShippingThreshold');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get rates(): readonly ShippingRateProps[] { return this._rates; }
  get defaultMethod(): ShippingMethodVO { return this._defaultMethod; }
  get trackingRequired(): boolean { return this._trackingRequired; }
  get allowPickup(): boolean { return this._allowPickup; }
  get allowCourier(): boolean { return this._allowCourier; }
  get freeShippingThreshold(): number | undefined { return this._freeShippingThreshold; }

  getActiveRates(): readonly ShippingRateProps[] {
    return this._rates.filter((r) => r.isActive);
  }

  getRatesForZone(zone: ShippingZoneVO): readonly ShippingRateProps[] {
    return this._rates.filter((r) => r.zone.value === zone.value && r.isActive);
  }

  findRate(method: ShippingMethodVO, zone: ShippingZoneVO): ShippingRateProps | undefined {
    return this._rates.find((r) => r.method.value === method.value && r.zone.value === zone.value);
  }

  getCheapestRate(zone: ShippingZoneVO): ShippingRateProps | undefined {
    const rates = this.getRatesForZone(zone);
    if (rates.length === 0) return undefined;
    return [...rates].sort((a, b) => a.cost.amount - b.cost.amount)[0];
  }

  getFastestRate(zone: ShippingZoneVO): ShippingRateProps | undefined {
    const rates = this.getRatesForZone(zone);
    if (rates.length === 0) return undefined;
    return [...rates].sort((a, b) => a.deliveryDays.max - b.deliveryDays.max)[0];
  }

  supportsZone(zone: ShippingZoneVO): boolean {
    return this.getRatesForZone(zone).length > 0;
  }

  supportsMethod(method: ShippingMethodVO): boolean {
    return this._rates.some((r) => r.method.value === method.value && r.isActive);
  }

  /** Determine shipping cost for an order. */
  calculateShipping(zone: ShippingZoneVO, orderTotal: number, method?: ShippingMethodVO): number {
    if (this._freeShippingThreshold !== undefined && orderTotal >= this._freeShippingThreshold) {
      return 0;
    }
    const rate = method
      ? this.findRate(method, zone)
      : this.getCheapestRate(zone);
    if (!rate) {
      throw new BusinessRuleError(
        `No shipping rate available for zone "${zone.value}"`,
        'NO_SHIPPING_RATE',
        { zone: zone.value, method: method?.value },
      );
    }
    return rate.cost.calculateForOrder(orderTotal);
  }

  addRate(rate: ShippingRateProps, now: string = new Date().toISOString()): void {
    const existing = this._rates.findIndex(
      (r) => r.method.value === rate.method.value && r.zone.value === rate.zone.value,
    );
    if (existing >= 0) {
      this._rates[existing] = rate;
    } else {
      if (this._rates.length >= 50) {
        throw new ValidationError('Shipping rates cannot exceed 50 items', 'rates');
      }
      this._rates.push(rate);
    }
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  removeRate(method: ShippingMethodVO, zone: ShippingZoneVO, now: string = new Date().toISOString()): void {
    if (method.value === this._defaultMethod.value) {
      throw new BusinessRuleError(
        'Cannot remove default method rate',
        'CANNOT_REMOVE_DEFAULT_RATE',
        { method: method.value },
      );
    }
    this._rates = this._rates.filter(
      (r) => !(r.method.value === method.value && r.zone.value === zone.value),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  setFreeShippingThreshold(amount: number | undefined, now: string = new Date().toISOString()): void {
    if (amount !== undefined && (!Number.isFinite(amount) || amount < 0)) {
      throw new ValidationError('Free shipping threshold must be non-negative', 'freeShippingThreshold');
    }
    this._freeShippingThreshold = amount;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vendorId: string;
    defaultMethod: ShippingMethodVO;
    now: string;
  }): VendorShippingEntity {
    return new VendorShippingEntity(params.id, params.now, params.now, {
      vendorId: params.vendorId,
      rates: [],
      defaultMethod: params.defaultMethod,
      trackingRequired: VENDOR_SHIPPING.TRACKING_REQUIRED,
      allowPickup: VENDOR_SHIPPING.ALLOW_PICKUP,
      allowCourier: VENDOR_SHIPPING.ALLOW_COURIER,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorShippingEntityProps;
    deletedAt?: string | null;
  }): VendorShippingEntity {
    return new VendorShippingEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
  }
}
