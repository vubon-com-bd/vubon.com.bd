/**
 * Vendor Rating Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-rating.constants থেকে।
 */

import type { VENDOR_RATING_CATEGORY } from '@vubon/shared-constants/business';
import type { VendorId, UserId } from '../../common/primitives';

export type VendorRatingCategoryValue =
  (typeof VENDOR_RATING_CATEGORY)[keyof typeof VENDOR_RATING_CATEGORY];

export interface VendorRating {
  readonly vendorId: VendorId;
  readonly overall: number;
  readonly totalReviews: number;
  readonly distribution: Readonly<Record<1 | 2 | 3 | 4 | 5, number>>;
  readonly categories: readonly VendorRatingCategory[];
  readonly recentWeight: number;
  readonly updatedAt: string;
}

export interface VendorRatingCategory {
  readonly category: VendorRatingCategoryValue;
  readonly score: number;
  readonly count: number;
}

export interface VendorRatingReview {
  readonly id: string;
  readonly vendorId: VendorId;
  readonly userId: UserId;
  readonly orderId: string;
  readonly rating: number;
  readonly comment?: string;
  readonly categories?: readonly VendorRatingCategory[];
  readonly isVerifiedPurchase: boolean;
  readonly createdAt: string;
}
