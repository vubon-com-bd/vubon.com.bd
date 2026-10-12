/**
 * VendorVerificationResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type {
  VENDOR_VERIFICATION_STATUS,
  VENDOR_VERIFICATION_TYPE,
} from '@vubon/shared-constants/business';

export interface VerificationCheckDto {
  readonly type: (typeof VENDOR_VERIFICATION_TYPE)[keyof typeof VENDOR_VERIFICATION_TYPE];
  readonly status: (typeof VENDOR_VERIFICATION_STATUS)[keyof typeof VENDOR_VERIFICATION_STATUS];
  readonly verifiedAt?: string;
  readonly expiresAt?: string;
}

export interface VendorVerificationResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly overallStatus: (typeof VENDOR_VERIFICATION_STATUS)[keyof typeof VENDOR_VERIFICATION_STATUS];
  readonly checks: readonly VerificationCheckDto[];
  readonly submittedAt?: string;
  readonly reviewedAt?: string;
  readonly reviewedBy?: string;
  readonly rejectionReason?: string;
  readonly expiresAt?: string;
  readonly completionRatio: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}
