/**
 * BusinessType Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Business operation type: manufacturer, wholesaler, retailer, etc.
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_BUSINESS_TYPE } from '@vubon/shared-constants/business';

export type BusinessTypeValue = (typeof VENDOR_BUSINESS_TYPE)[keyof typeof VENDOR_BUSINESS_TYPE];

const VALID_TYPES = new Set<string>(Object.values(VENDOR_BUSINESS_TYPE));

export class BusinessTypeVO extends BaseTypeVO<BusinessTypeValue> {
  private constructor(value: BusinessTypeValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_TYPES;
  }

  static create(raw: string): BusinessTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('BusinessType must be a string', 'businessType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.has(normalized)) {
      throw new ValidationError(
        `Invalid BusinessType: "${normalized}". Allowed: ${[...VALID_TYPES].join(', ')}`,
        'businessType',
      );
    }
    return new BusinessTypeVO(normalized as BusinessTypeValue);
  }

  static reconstitute(raw: string): BusinessTypeVO {
    return new BusinessTypeVO(raw as BusinessTypeValue);
  }

  // ─── Predicates ───
  isManufacturer(): boolean { return this.value === 'manufacturer'; }
  isWholesaler(): boolean { return this.value === 'wholesaler'; }
  isRetailer(): boolean { return this.value === 'retailer'; }
  isDistributor(): boolean { return this.value === 'distributor'; }
  isReseller(): boolean { return this.value === 'reseller'; }
  isServiceProvider(): boolean { return this.value === 'service_provider'; }
  isDropshipper(): boolean { return this.value === 'dropshipper'; }

  /** Business holds physical inventory */
  holdsInventory(): boolean {
    return (
      this.isManufacturer() ||
      this.isWholesaler() ||
      this.isRetailer() ||
      this.isDistributor()
    );
  }

  /** Business needs tax registration */
  requiresTaxRegistration(): boolean {
    return this.isManufacturer() || this.isWholesaler() || this.isDistributor();
  }
}
