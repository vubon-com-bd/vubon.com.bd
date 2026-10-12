/**
 * VendorWarrantyConfigVO — default warranty settings for vendor products
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { WarrantyTypeVO } from '../primitives/warranty-type.vo.js';
import { WarrantyPeriodDaysVO } from '../primitives/warranty-period-days.vo.js';
import { VENDOR_WARRANTY } from '@vubon/shared-constants/business';

export interface VendorWarrantyConfigVOProps {
  readonly defaultType: WarrantyTypeVO;
  readonly defaultPeriod: WarrantyPeriodDaysVO;
  readonly coversShipping: boolean;
  readonly requireProof: boolean;
  readonly autoRegister: boolean;
  readonly terms?: string;
  readonly exclusions?: readonly string[];
}

export class VendorWarrantyConfigVO extends BaseVO<VendorWarrantyConfigVOProps> {
  private constructor(props: VendorWarrantyConfigVOProps) {
    super(props);
  }

  static create(props: VendorWarrantyConfigVOProps): VendorWarrantyConfigVO {
    if (!(props.defaultType instanceof WarrantyTypeVO)) {
      throw new ValidationError('Warranty config requires WarrantyTypeVO', 'defaultType');
    }
    if (!(props.defaultPeriod instanceof WarrantyPeriodDaysVO)) {
      throw new ValidationError('Warranty config requires WarrantyPeriodDaysVO', 'defaultPeriod');
    }
    // Business rule: if type is NONE, period must not be set (or will be ignored)
    if (!props.defaultType.hasWarranty() && props.defaultPeriod.days > 0) {
      throw new ValidationError(
        'Warranty type NONE cannot have a positive period',
        'defaultPeriod',
      );
    }
    if (props.terms !== undefined && props.terms.length > 5000) {
      throw new ValidationError('Warranty terms cannot exceed 5000 chars', 'terms');
    }
    if (props.exclusions !== undefined && props.exclusions.length > 50) {
      throw new ValidationError('Warranty exclusions cannot exceed 50 items', 'exclusions');
    }
    return new VendorWarrantyConfigVO(props);
  }

  static reconstitute(props: VendorWarrantyConfigVOProps): VendorWarrantyConfigVO {
    return new VendorWarrantyConfigVO(props);
  }

  static defaults(): VendorWarrantyConfigVO {
    return VendorWarrantyConfigVO.create({
      defaultType: WarrantyTypeVO.default(),
      defaultPeriod: WarrantyPeriodDaysVO.default(),
      coversShipping: VENDOR_WARRANTY.COVER_SHIPPING,
      requireProof: VENDOR_WARRANTY.REQUIRE_PROOF,
      autoRegister: VENDOR_WARRANTY.AUTO_REGISTER,
    });
  }

  get defaultType(): WarrantyTypeVO { return this.value.defaultType; }
  get defaultPeriod(): WarrantyPeriodDaysVO { return this.value.defaultPeriod; }
  get coversShipping(): boolean { return this.value.coversShipping; }

  isWarrantyEnabled(): boolean {
    return this.value.defaultType.hasWarranty();
  }

  isManufacturerWarranty(): boolean {
    return this.value.defaultType.isManufacturerBacked();
  }

  isSellerWarranty(): boolean {
    return this.value.defaultType.isSellerBacked();
  }

  hasExclusions(): boolean {
    return (this.value.exclusions?.length ?? 0) > 0;
  }

  isExclusion(term: string): boolean {
    if (!this.value.exclusions) return false;
    const lower = term.toLowerCase();
    return this.value.exclusions.some((e) => e.toLowerCase() === lower);
  }

  /** Compute warranty expiry for a given product. */
  calculateExpiry(purchasedAt: Date): Date {
    return this.value.defaultPeriod.calculateExpiry(purchasedAt);
  }
}
