/**
 * CanFeatureVendorSpecification
 * @module vendor-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity.js';
import { VENDOR_RATING } from '@vubon/shared-constants/business';

export class CanFeatureVendorSpecification extends Specification<VendorEntity> {
  isSatisfiedBy(vendor: VendorEntity): boolean {
    if (!vendor.isOperational()) return false;
    if (vendor.isFeatured) return false;
    if (vendor.rating.value < VENDOR_RATING.AUTO_FLAG_BELOW) return false;
    if (!vendor.isVerified) return false;
    return true;
  }

  explain(vendor: VendorEntity): string | null {
    if (!vendor.isOperational()) return 'vendor not operational';
    if (vendor.isFeatured) return 'vendor already featured';
    if (vendor.rating.value < VENDOR_RATING.AUTO_FLAG_BELOW) {
      return `rating ${vendor.rating.value} below feature threshold`;
    }
    if (!vendor.isVerified) return 'vendor not verified';
    return null;
  }
}
