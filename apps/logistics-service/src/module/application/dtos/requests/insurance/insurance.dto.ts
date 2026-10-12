/**
 * Insurance Request DTOs
 * @module logistics-service/application/dtos/requests/insurance
 */
import type {
  InsuranceTypeValue,
  InsuranceStatusValue,
  InsuranceCoverageValue,
  InsuranceClaimStatusValue,
} from '@vubon/shared-types/logistics';

export interface PurchaseInsuranceRequestDTO {
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly type: InsuranceTypeValue;
  readonly coverages: readonly InsuranceCoverageValue[];
  readonly declaredValue: number;
  readonly currency: string;
  readonly startsAt: string;
  readonly expiresAt: string;
}

export interface FileClaimRequestDTO {
  readonly insuranceId: string;
  readonly reason: string;
  readonly amount: number;
  readonly currency: string;
  readonly description?: string;
  readonly images?: readonly string[];
}

export interface StartClaimReviewRequestDTO { readonly insuranceId: string; }

export interface ApproveClaimRequestDTO {
  readonly insuranceId: string;
  readonly approvedAmount: number;
}

export interface RejectClaimRequestDTO {
  readonly insuranceId: string;
  readonly reason: string;
}

export interface PayClaimRequestDTO { readonly insuranceId: string; }

export interface AppealClaimRequestDTO {
  readonly insuranceId: string;
  readonly reason: string;
}

export interface ActivateInsuranceRequestDTO { readonly insuranceId: string; }
export interface ExpireInsuranceRequestDTO { readonly insuranceId: string; }
export interface CancelInsuranceRequestDTO { readonly insuranceId: string; readonly reason: string; }

export interface InsuranceListFilterDTO {
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly status?: InsuranceStatusValue;
  readonly type?: InsuranceTypeValue;
  readonly isClaimed?: boolean;
  readonly claimStatus?: InsuranceClaimStatusValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}
