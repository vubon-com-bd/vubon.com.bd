import { BaseEntity } from '../../common/base.types';
import { VENDOR_RATING } from '@vubon/shared-constants/src/business/vendor/vendor-rating.constants';
import { Vendor } from './vendor.types';

export interface VendorRatingCriteria {
  productQuality: number;
  shippingSpeed: number;
  customerService: number;
  valueForMoney: number;
  packaging: number;
  accuracy: number;
}

export interface VendorRating extends BaseEntity {
  ratingId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_RATING.TYPES | string;
  score: number;
  criteria: VendorRatingCriteria;
  count: number;
  average: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
