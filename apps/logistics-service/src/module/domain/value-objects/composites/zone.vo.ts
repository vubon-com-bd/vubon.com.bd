/**
 * Zone Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ZoneIdVO } from '../primitives/zone-id.vo.js';
import { ZoneNameVO } from '../primitives/zone-name.vo.js';
import { ZoneStatusVO } from '../primitives/zone-status.vo.js';
import { ZoneTypeVO } from '../primitives/zone-type.vo.js';
import { ZonePricingTypeVO } from '../primitives/zone-pricing-type.vo.js';

export interface ZoneVOProps {
  readonly id: ZoneIdVO;
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
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class ZoneVO extends BaseVO<ZoneVOProps> {
  private constructor(props: ZoneVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ZoneVOProps): ZoneVO {
    const vo = new ZoneVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ZoneVOProps): ZoneVO {
    return new ZoneVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.code) throw new ValidationError('Code required', 'code');
    if (!v.currency) throw new ValidationError('Currency required', 'currency');
    if (v.shippingCost < 0) {
      throw new ValidationError('Shipping cost cannot be negative', 'shippingCost');
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
    if (v.codCharge !== undefined && v.codCharge < 0) {
      throw new ValidationError('COD charge cannot be negative', 'codCharge');
    }
    if (v.codMaxAmount !== undefined && v.codMaxAmount < 0) {
      throw new ValidationError('COD max amount cannot be negative', 'codMaxAmount');
    }
  }

  get id(): ZoneIdVO { return this.value.id; }
  get name(): ZoneNameVO { return this.value.name; }
  get code(): string { return this.value.code; }
  get type(): ZoneTypeVO { return this.value.type; }
  get status(): ZoneStatusVO { return this.value.status; }
  get pricingType(): ZonePricingTypeVO { return this.value.pricingType; }
  get parentId(): string | undefined { return this.value.parentId; }
  get postalCodes(): readonly string[] | undefined { return this.value.postalCodes; }
  get districts(): readonly string[] | undefined { return this.value.districts; }
  get divisions(): readonly string[] | undefined { return this.value.divisions; }
  get shippingCost(): number { return this.value.shippingCost; }
  get freeAbove(): number | undefined { return this.value.freeAbove; }
  get currency(): string { return this.value.currency; }
  get minDeliveryDays(): number { return this.value.minDeliveryDays; }
  get maxDeliveryDays(): number { return this.value.maxDeliveryDays; }
  get codEnabled(): boolean { return this.value.codEnabled; }
  get codCharge(): number | undefined { return this.value.codCharge; }
  get codMaxAmount(): number | undefined { return this.value.codMaxAmount; }
  get isRemote(): boolean { return this.value.isRemote; }
  get isActive(): boolean { return this.value.isActive; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isZoneActive(): boolean { return this.status.isActive(); }
  isUsable(): boolean { return this.status.isUsable(); }

  coversPostalCode(postalCode: string): boolean {
    if (!this.value.postalCodes) return false;
    return this.value.postalCodes.includes(postalCode);
  }

  coversDistrict(district: string): boolean {
    if (!this.value.districts) return false;
    return this.value.districts.includes(district);
  }

  coversDivision(division: string): boolean {
    if (!this.value.divisions) return false;
    return this.value.divisions.includes(division);
  }

  isFreeShipping(orderAmount: number): boolean {
    if (this.value.freeAbove === undefined) return false;
    return orderAmount >= this.value.freeAbove;
  }

  get deliveryRange(): string {
    return `${this.minDeliveryDays}-${this.maxDeliveryDays} days`;
  }
}
