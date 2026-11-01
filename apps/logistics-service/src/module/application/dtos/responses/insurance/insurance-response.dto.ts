import type { InsuranceStatusValue } from '@domain/primitives/insurance-status.vo';
import type { InsuranceTypeValue } from '@domain/primitives/insurance-type.vo';
import type { InsuranceCoverageValue } from '@domain/primitives/insurance-coverage.vo';
import type { InsuranceClaimStatusValue } from '@domain/primitives/insurance-claim-status.vo';

export interface InsuranceClaimResponseDTO {
  readonly id: string;
  readonly claimNumber: string;
  readonly status: InsuranceClaimStatusValue;
  readonly reason: string;
  readonly description?: string;
  readonly images?: readonly string[];
  readonly amount: number;
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
  readonly provider?: string;
  readonly notes?: string;
  readonly claims: readonly InsuranceClaimResponseDTO[];
  readonly activatedAt?: string;
  readonly expiredAt?: string;
  readonly cancelledAt?: string;
  readonly cancelReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
