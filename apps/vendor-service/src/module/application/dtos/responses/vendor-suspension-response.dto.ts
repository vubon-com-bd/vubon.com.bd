/**
 * VendorSuspensionResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type { VENDOR_SUSPENSION_REASON } from '@vubon/shared-constants/business';

export interface VendorSuspensionResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly reason: (typeof VENDOR_SUSPENSION_REASON)[keyof typeof VENDOR_SUSPENSION_REASON];
  readonly suspendedAt: string;
  readonly suspendedBy: string;
  readonly durationDays: number;
  readonly notes?: string;
  readonly appealDeadline?: string;
  readonly appealSubmittedAt?: string;
  readonly appealReason?: string;
  readonly liftedAt?: string;
  readonly liftedBy?: string;
  readonly autoLiftOnResolution: boolean;
  readonly isLifted: boolean;
  readonly isExpired: boolean;
  readonly daysRemaining: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}
