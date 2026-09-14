/**
 * Vendor Warranty Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-warranty.constants থেকে।
 */

import type {
  VENDOR_WARRANTY_TYPE,
  VENDOR_WARRANTY_PERIOD,
} from '@vubon/shared-constants/business';
import type { VendorId, ProductId } from '../../common/primitives';

export type VendorWarrantyTypeValue =
  (typeof VENDOR_WARRANTY_TYPE)[keyof typeof VENDOR_WARRANTY_TYPE];

export type VendorWarrantyPeriodValue =
  (typeof VENDOR_WARRANTY_PERIOD)[keyof typeof VENDOR_WARRANTY_PERIOD];

export interface VendorWarranty {
  readonly id: string;
  readonly vendorId: VendorId;
  readonly productId?: ProductId;
  readonly categoryId?: string;
  readonly type: VendorWarrantyTypeValue;
  readonly periodDays: number;
  readonly periodValue: VendorWarrantyPeriodValue;
  readonly coversShipping: boolean;
  readonly requireProof: boolean;
  readonly autoRegister: boolean;
  readonly terms?: string;
  readonly exclusions?: readonly string[];
  readonly isActive: boolean;
  readonly updatedAt: string;
}

export interface WarrantyClaim {
  readonly id: string;
  readonly warrantyId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly productId: ProductId;
  readonly reason: string;
  readonly description?: string;
  readonly status: 'pending' | 'approved' | 'rejected' | 'resolved';
  readonly claimedAt: string;
  readonly resolvedAt?: string;
}
