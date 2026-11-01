/**
 * Approval Response DTOs
 * @module vendor-service/application/dtos/responses
 */
import type { VendorStatusValue } from '@vubon/shared-types/business/vendor';

export interface ApprovalResponseDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly status: string;
  readonly reason?: string;
  readonly notes?: string;
  readonly requestedAt: string;
  readonly decidedAt?: string;
  readonly decidedBy?: string;
  readonly score?: number;
  readonly resubmissionCount: number;
  readonly appealDeadline?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ApprovalStatusResponseDTO {
  readonly vendorId: string;
  readonly status: string;
  readonly latestApproval: ApprovalResponseDTO;
  readonly canResubmit: boolean;
  readonly canAppeal: boolean;
  readonly pendingDays: number;
}
