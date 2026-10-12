/**
 * RejectVendorRequestDto
 * @module vendor-service/application/dtos/requests
 */
import type { VENDOR_APPROVAL_REASON } from '@vubon/shared-constants/business';

export class RejectVendorRequestDto {
  vendorId!: string;
  reviewedBy!: string;
  reason!: (typeof VENDOR_APPROVAL_REASON)[keyof typeof VENDOR_APPROVAL_REASON];
  note?: string;
  idempotencyKey?: string;
}
