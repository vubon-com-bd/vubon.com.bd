/**
 * VendorApprovalResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type {
  VENDOR_APPROVAL_STATUS,
  VENDOR_APPROVAL_REASON,
} from '@vubon/shared-constants/business';

export interface VendorApprovalResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly status: (typeof VENDOR_APPROVAL_STATUS)[keyof typeof VENDOR_APPROVAL_STATUS];
  readonly reason?: (typeof VENDOR_APPROVAL_REASON)[keyof typeof VENDOR_APPROVAL_REASON];
  readonly reviewerNote?: string;
  readonly submittedAt: string;
  readonly reviewedAt?: string;
  readonly reviewedBy?: string;
  readonly resubmissionCount: number;
  readonly appealDeadline?: string;
  readonly slaDeadline?: string;
  readonly isSlaBreached: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
