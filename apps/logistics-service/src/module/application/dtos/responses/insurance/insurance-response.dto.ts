/**
 * Insurance Response DTOs
 * @module logistics-service/application/dtos/responses/insurance
 */
import type {
  InsuranceTypeValue,
  InsuranceStatusValue,
  InsuranceCoverageValue,
  InsuranceClaimStatusValue,
} from '@vubon/shared-types/logistics';

export interface InsuranceClaimResponseDTO {
  readonly id: string;
  readonly claimNumber: string;
  readonly status: InsuranceClaimStatusValue;
  readonly reason: string;
  readonly description?: string;
  readonly images: readonly string[];
  readonly amount: number;
  readonly currency: string;
  readonly approvedAmount?: number;
  readonly submittedAt: string;
  readonly reviewedAt?: string;
  readonly approvedAt?: string;
  readonly rejectedAt?: string;
  readonly rejectionReason?: string;
  readonly paidAt?: string;
}

export interface InsuranceResponseDTO {
  readonly id: string;
  readonly policyNumber: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly status: InsuranceStatusValue;
  readonly type: InsuranceTypeValue;
  readonly coverages: readonly InsuranceCoverageValue[];
  readonly declaredValue: number;
  readonly premium: number;
  readonly currency: string;
  readonly startsAt: string;
  readonly expiresAt: string;
  readonly isClaimed: boolean;
  readonly claim?: InsuranceClaimResponseDTO;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface InsuranceListResponseDTO {
  readonly items: readonly InsuranceResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
