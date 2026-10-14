/**
 * VendorShippingVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর shipping configuration।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SHIPPING } from '@vubon/shared-constants/business';

import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { ShippingMethodVO } from '../primitives/shipping-method.vo.js';

export interface ShippingZoneConfig {
  readonly zone: 'inside_city' | 'inside_division' | 'inside_country' | 'international' | 'remote';
  readonly cost: number;
  readonly minDays: number;
  readonly maxDays: number;
  readonly isActive: boolean;
}

export interface VendorShippingVOProps {
  readonly vendorId: VendorIdVO;
  readonly methods: readonly ShippingMethodVO[];
  readonly zones: readonly ShippingZoneConfig[];
  readonly freeShippingThreshold?: number;
  readonly defaultShippingCost: number;
  readonly maxShippingCost: number;
  readonly allowsPickup: boolean;
  readonly allowsCourier: boolean;
  readonly trackingRequired: boolean;
  readonly processingDays: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const VALID_ZONES = new Set([
  'inside_city',
  'inside_division',
  'inside_country',
  'international',
  'remote',
]);

export class VendorShippingVO extends BaseVO<VendorShippingVOProps> {
  private constructor(props: VendorShippingVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorShippingVOProps): VendorShippingVO {
    const vo = new VendorShippingVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorShippingVOProps): VendorShippingVO {
    return new VendorShippingVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.methods.length === 0) {
      throw new ValidationError('At least one shipping method is required', 'methods');
    }

    const methodValues = new Set(v.methods.map((m) => m.value));
    if (methodValues.size !== v.methods.length) {
      throw new ValidationError('Shipping methods must be unique', 'methods');
    }

    if (v.zones.length === 0) {
      throw new ValidationError('At least one shipping zone is required', 'zones');
    }

    for (const zone of v.zones) {
      if (!VALID_ZONES.has(zone.zone)) {
        throw new ValidationError(`Invalid zone: "${zone.zone}"`, 'zones');
      }
      if (!Number.isFinite(zone.cost) || zone.cost < 0) {
        throw new ValidationError(`Zone "${zone.zone}" cost must be non-negative`, 'zones');
      }
      if (zone.minDays < 0 || zone.maxDays < zone.minDays) {
        throw new ValidationError(`Zone "${zone.zone}" days invalid`, 'zones');
      }
    }

    if (v.freeShippingThreshold !== undefined && v.freeShippingThreshold < 0) {
      throw new ValidationError('freeShippingThreshold must be non-negative', 'freeShippingThreshold');
    }

    if (v.defaultShippingCost < 0) {
      throw new ValidationError('defaultShippingCost must be non-negative', 'defaultShippingCost');
    }
    if (v.maxShippingCost < v.defaultShippingCost) {
      throw new ValidationError('maxShippingCost must be >= defaultShippingCost', 'maxShippingCost');
    }
    if (v.maxShippingCost > VENDOR_SHIPPING.MAX_SHIPPING_COST) {
      throw new ValidationError(
        `maxShippingCost cannot exceed ${VENDOR_SHIPPING.MAX_SHIPPING_COST}`,
        'maxShippingCost',
      );
    }

    if (!Number.isInteger(v.processingDays) || v.processingDays < 0) {
      throw new ValidationError('processingDays must be non-negative integer', 'processingDays');
    }
    if (v.processingDays > 30) {
      throw new ValidationError('processingDays cannot exceed 30', 'processingDays');
    }

    if (!v.allowsPickup && !v.allowsCourier) {
      throw new ValidationError('At least one of allowsPickup or allowsCourier must be true', 'allowsCourier');
    }
  }

  // ─── Getters ───
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get methods(): readonly ShippingMethodVO[] { return this.value.methods; }
  get zones(): readonly ShippingZoneConfig[] { return this.value.zones; }
  get freeShippingThreshold(): number | undefined { return this.value.freeShippingThreshold; }
  get defaultShippingCost(): number { return this.value.defaultShippingCost; }
  get maxShippingCost(): number { return this.value.maxShippingCost; }
  get allowsPickup(): boolean { return this.value.allowsPickup; }
  get allowsCourier(): boolean { return this.value.allowsCourier; }
  get trackingRequired(): boolean { return this.value.trackingRequired; }
  get processingDays(): number { return this.value.processingDays; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  hasFreeShipping(): boolean { return this.freeShippingThreshold !== undefined; }
  supportsMethod(method: string): boolean {
    return this.methods.some((m) => m.value === method);
  }

  supportsZone(zone: string): boolean {
    return this.zones.some((z) => z.zone === zone && z.isActive);
  }

  hasExpressShipping(): boolean {
    return this.methods.some((m) => m.isPremium());
  }

  /** Earliest delivery across all zones */
  get earliestDeliveryDays(): number {
    const active = this.zones.filter((z) => z.isActive);
    if (active.length === 0) return this.processingDays;
    const min = Math.min(...active.map((z) => z.minDays));
    return min + this.processingDays;
  }

  /** Latest delivery across all zones */
  get latestDeliveryDays(): number {
    const active = this.zones.filter((z) => z.isActive);
    if (active.length === 0) return this.processingDays;
    const max = Math.max(...active.map((z) => z.maxDays));
    return max + this.processingDays;
  }

  /**
   * Calculate shipping cost for a zone + order amount.
   * Returns 0 if free shipping threshold met।
   */
  calculateCost(zone: string, orderAmount: number): number {
    if (orderAmount < 0) {
      throw new ValidationError('orderAmount must be non-negative', 'orderAmount');
    }
    if (
      this.freeShippingThreshold !== undefined &&
      orderAmount >= this.freeShippingThreshold
    ) {
      return 0;
    }
    const config = this.zones.find((z) => z.zone === zone && z.isActive);
    if (!config) return this.defaultShippingCost;
    return Math.min(config.cost, this.maxShippingCost);
  }

  /** Can this vendor ship internationally? */
  shipsInternationally(): boolean {
    return this.supportsZone('international');
  }

  /** Min order for free shipping */
  get freeShippingMinimum(): number | null {
    return this.freeShippingThreshold ?? null;
  }
}
