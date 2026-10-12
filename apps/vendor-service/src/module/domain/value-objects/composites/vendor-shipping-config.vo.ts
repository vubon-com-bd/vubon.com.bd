/**
 * VendorShippingConfigVO — shipping methods, zones, costs
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ShippingMethodVO } from '../primitives/shipping-method.vo.js';
import { ShippingZoneVO } from '../primitives/shipping-zone.vo.js';
import { ShippingCostVO } from '../primitives/shipping-cost.vo.js';
import { DeliveryDaysVO } from '../primitives/delivery-days.vo.js';

export interface ShippingRate {
  readonly method: ShippingMethodVO;
  readonly zone: ShippingZoneVO;
  readonly cost: ShippingCostVO;
  readonly deliveryDays: DeliveryDaysVO;
  readonly isActive: boolean;
}

export interface VendorShippingConfigVOProps {
  readonly rates: readonly ShippingRate[];
  readonly defaultMethod: ShippingMethodVO;
  readonly trackingRequired: boolean;
  readonly allowPickup: boolean;
  readonly allowCourier: boolean;
}

export class VendorShippingConfigVO extends BaseVO<VendorShippingConfigVOProps> {
  private constructor(props: VendorShippingConfigVOProps) {
    super(props);
  }

  static create(props: VendorShippingConfigVOProps): VendorShippingConfigVO {
    if (!Array.isArray(props.rates) || props.rates.length === 0) {
      throw new ValidationError('Shipping config requires at least one rate', 'rates');
    }
    if (props.rates.length > 50) {
      throw new ValidationError('Shipping rates cannot exceed 50 items', 'rates');
    }
    if (!(props.defaultMethod instanceof ShippingMethodVO)) {
      throw new ValidationError('Default method must be a ShippingMethodVO', 'defaultMethod');
    }
    // Reject duplicate method+zone pairs
    const seen = new Set<string>();
    for (const rate of props.rates) {
      const key = `${rate.method.value}:${rate.zone.value}`;
      if (seen.has(key)) {
        throw new ValidationError(`Duplicate shipping rate for ${key}`, 'rates');
      }
      seen.add(key);
    }
    // Default method must exist in rates
    const hasDefault = props.rates.some(
      (r) => r.method.value === props.defaultMethod.value && r.isActive,
    );
    if (!hasDefault) {
      throw new ValidationError(
        `Default method "${props.defaultMethod.value}" has no active rate`,
        'defaultMethod',
      );
    }
    return new VendorShippingConfigVO(props);
  }

  static reconstitute(props: VendorShippingConfigVOProps): VendorShippingConfigVO {
    return new VendorShippingConfigVO(props);
  }

  get rates(): readonly ShippingRate[] { return this.value.rates; }
  get defaultMethod(): ShippingMethodVO { return this.value.defaultMethod; }

  getActiveRates(): readonly ShippingRate[] {
    return this.value.rates.filter((r) => r.isActive);
  }

  getRatesForZone(zone: ShippingZoneVO): readonly ShippingRate[] {
    return this.value.rates.filter((r) => r.zone.value === zone.value && r.isActive);
  }

  findRate(method: ShippingMethodVO, zone: ShippingZoneVO): ShippingRate | undefined {
    return this.value.rates.find(
      (r) => r.method.value === method.value && r.zone.value === zone.value,
    );
  }

  getCheapestRate(zone: ShippingZoneVO): ShippingRate | undefined {
    const rates = this.getRatesForZone(zone);
    if (rates.length === 0) return undefined;
    return [...rates].sort((a, b) => a.cost.amount - b.cost.amount)[0];
  }

  getFastestRate(zone: ShippingZoneVO): ShippingRate | undefined {
    const rates = this.getRatesForZone(zone);
    if (rates.length === 0) return undefined;
    return [...rates].sort((a, b) => a.deliveryDays.max - b.deliveryDays.max)[0];
  }

  supportsZone(zone: ShippingZoneVO): boolean {
    return this.getRatesForZone(zone).length > 0;
  }

  supportsMethod(method: ShippingMethodVO): boolean {
    return this.value.rates.some((r) => r.method.value === method.value && r.isActive);
  }
}
