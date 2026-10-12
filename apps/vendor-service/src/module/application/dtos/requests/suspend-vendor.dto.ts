/**
 * SuspendVendorRequestDto
 * @module vendor-service/application/dtos/requests
 */
import type { VENDOR_SUSPENSION_REASON } from '@vubon/shared-constants/business';

export class SuspendVendorRequestDto {
  vendorId!: string;
  reason!: (typeof VENDOR_SUSPENSION_REASON)[keyof typeof VENDOR_SUSPENSION_REASON];
  durationDays!: number;
  suspendedBy!: string;
  notes?: string;
  idempotencyKey?: string;
}
