/**
 * Vendor Verification Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-verification.constants থেকে।
 */

import type {
  VENDOR_VERIFICATION_STATUS,
  VENDOR_VERIFICATION_TYPE,
} from '@vubon/shared-constants/business';
import type { VendorId } from '../../common/primitives';

export type VendorVerificationStatusValue =
  (typeof VENDOR_VERIFICATION_STATUS)[keyof typeof VENDOR_VERIFICATION_STATUS];

export type VendorVerificationTypeValue =
  (typeof VENDOR_VERIFICATION_TYPE)[keyof typeof VENDOR_VERIFICATION_TYPE];

export interface VendorVerification {
  readonly vendorId: VendorId;
  readonly status: VendorVerificationStatusValue;
  readonly checks: readonly VendorVerificationCheck[];
  readonly submittedAt?: string;
  readonly reviewedAt?: string;
  readonly reviewedBy?: string;
  readonly rejectionReason?: string;
  readonly expiresAt?: string;
  readonly updatedAt: string;
}

export interface VendorVerificationCheck {
  readonly type: VendorVerificationTypeValue;
  readonly status: VendorVerificationStatusValue;
  readonly verifiedAt?: string;
  readonly expiresAt?: string;
}

export interface VendorVerificationInput {
  readonly vendorId: VendorId;
  readonly type: VendorVerificationTypeValue;
  readonly data: Readonly<Record<string, unknown>>;
}
