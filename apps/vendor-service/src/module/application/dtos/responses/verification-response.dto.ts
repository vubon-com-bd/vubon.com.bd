/**
 * Verification Response DTOs
 * @module vendor-service/application/dtos/responses
 */
import type { VendorStatusValue } from '@vubon/shared-types/business/vendor';

export interface VerificationResponseDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly type: string;
  readonly status: string;
  readonly referenceId?: string;
  readonly submittedAt: string;
  readonly reviewedAt?: string;
  readonly reviewedBy?: string;
  readonly expiresAt?: string;
  readonly rejectionReason?: string;
  readonly attempts: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface VerificationSummaryResponseDTO {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly submittedAt: string;
  readonly expiresAt?: string;
}

export interface DocumentResponseDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly type: string;
  readonly status: string;
  readonly documentNumber?: string;
  readonly fileUrl: string;
  readonly fileName: string;
  readonly fileSize: number;
  readonly mimeType: string;
  readonly issuedAt?: string;
  readonly expiresAt?: string;
  readonly uploadedAt: string;
  readonly verifiedAt?: string;
  readonly verifiedBy?: string;
  readonly rejectionReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface DocumentListResponseDTO {
  readonly items: readonly DocumentResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VerificationListResponseDTO {
  readonly items: readonly VerificationResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VerificationStatusResponseDTO {
  readonly vendorId: string;
  readonly fullyVerified: boolean;
  readonly requiredCount: number;
  readonly completedCount: number;
  readonly progressPercent: number;
  readonly missing: readonly string[];
  readonly pending: readonly string[];
  readonly rejected: readonly string[];
  readonly estimatedSlaHours: number;
}
