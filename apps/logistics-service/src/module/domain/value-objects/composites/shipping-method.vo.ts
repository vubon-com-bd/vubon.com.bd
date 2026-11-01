/**
 * ShippingMethod Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ShippingMethodIdVO } from '../primitives/shipping-method-id.vo.js';
import { ShippingMethodTypeVO } from '../primitives/shipping-method-type.vo.js';
import { ShippingMethodStatusVO } from '../primitives/shipping-method-status.vo.js';
import { ShippingRateTypeVO } from '../primitives/shipping-rate-type.vo.js';

export interface ShippingMethodVOProps {
  readonly id: ShippingMethodIdVO;
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
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class ShippingMethodVO extends BaseVO<ShippingMethodVOProps> {
  private constructor(props: ShippingMethodVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ShippingMethodVOProps): ShippingMethodVO {
    const vo = new ShippingMethodVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ShippingMethodVOProps): ShippingMethodVO {
    return new ShippingMethodVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.code) throw new ValidationError('Code required', 'code');
    if (!v.displayName) throw new ValidationError('Display name required', 'displayName');
    if (!v.currency) throw new ValidationError('Currency required', 'currency');
    if (v.baseCost < 0) {
      throw new ValidationError('Base cost cannot be negative', 'baseCost');
    }
    if (v.freeAbove !== undefined && v.freeAbove < 0) {
      throw new ValidationError('Free-above amount cannot be negative', 'freeAbove');
    }
    if (v.minDeliveryDays < 0) {
      throw new ValidationError('Min delivery days cannot be negative', 'minDeliveryDays');
    }
    if (v.maxDeliveryDays < v.minDeliveryDays) {
      throw new ValidationError(
        'maxDeliveryDays must be ≥ minDeliveryDays',
        'maxDeliveryDays',
      );
    }
    if (v.maxWeightKg !== undefined && v.maxWeightKg <= 0) {
      throw new ValidationError('Max weight must be positive', 'maxWeightKg');
    }
  }

  get id(): ShippingMethodIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get code(): string { return this.value.code; }
  get displayName(): string { return this.value.displayName; }
  get status(): ShippingMethodStatusVO { return this.value.status; }
  get type(): ShippingMethodTypeVO { return this.value.type; }
  get rateType(): ShippingRateTypeVO { return this.value.rateType; }
  get baseCost(): number { return this.value.baseCost; }
  get freeAbove(): number | undefined { return this.value.freeAbove; }
  get currency(): string { return this.value.currency; }
  get minDeliveryDays(): number { return this.value.minDeliveryDays; }
  get maxDeliveryDays(): number { return this.value.maxDeliveryDays; }
  get maxWeightKg(): number | undefined { return this.value.maxWeightKg; }
  get maxDimensionsCm(): number | undefined { return this.value.maxDimensionsCm; }
  get codEnabled(): boolean { return this.value.codEnabled; }
  get trackingEnabled(): boolean { return this.value.trackingEnabled; }
  get coverageZones(): readonly string[] | undefined { return this.value.coverageZones; }
  get couriers(): readonly string[] | undefined { return this.value.couriers; }
  get isDefault(): boolean { return this.value.isDefault; }
  get isActive(): boolean { return this.value.isActive; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isMethodActive(): boolean { return this.status.isActive(); }
  isUsable(): boolean { return this.status.isUsable(); }

  coversZone(zone: string): boolean {
    if (!this.value.coverageZones || this.value.coverageZones.length === 0) return true;
    return this.value.coverageZones.includes(zone);
  }

  canHandleWeight(weightKg: number): boolean {
    if (this.value.maxWeightKg === undefined) return true;
    return weightKg <= this.value.maxWeightKg;
  }

  isFreeShipping(orderAmount: number): boolean {
    if (this.value.freeAbove === undefined) return false;
    return orderAmount >= this.value.freeAbove;
  }

  get deliveryRange(): string {
    return `${this.minDeliveryDays}-${this.maxDeliveryDays} days`;
  }
}
