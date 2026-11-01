/**
 * VendorType Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Legal entity type: individual, sole_proprietor, partnership, etc.
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_TYPE } from '@vubon/shared-constants/business';

export type VendorTypeValue = (typeof VENDOR_TYPE)[keyof typeof VENDOR_TYPE];

const VALID_TYPES = new Set<string>(Object.values(VENDOR_TYPE));

export class VendorTypeVO extends BaseTypeVO<VendorTypeValue> {
  private constructor(value: VendorTypeValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_TYPES;
  }

  static create(raw: string): VendorTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('VendorType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.has(normalized)) {
      throw new ValidationError(
        `Invalid VendorType: "${normalized}". Allowed: ${[...VALID_TYPES].join(', ')}`,
        'type',
      );
    }
    return new VendorTypeVO(normalized as VendorTypeValue);
  }

  static reconstitute(raw: string): VendorTypeVO {
    return new VendorTypeVO(raw as VendorTypeValue);
  }

  // ─── Predicates ───
  isIndividual(): boolean { return this.value === 'individual'; }
  isSoleProprietor(): boolean { return this.value === 'sole_proprietor'; }
  isPartnership(): boolean { return this.value === 'partnership'; }
  isLimitedCompany(): boolean { return this.value === 'limited_company'; }
  isCorporation(): boolean { return this.value === 'corporation'; }
  isCooperative(): boolean { return this.value === 'cooperative'; }
  isGovernment(): boolean { return this.value === 'government'; }

  /** Requires legal documentation */
  requiresLegalDocs(): boolean {
    return !this.isIndividual();
  }

  /** Eligible for premium tiers */
  eligibleForPremiumTier(): boolean {
    return this.isLimitedCompany() || this.isCorporation() || this.isGovernment();
  }
}
