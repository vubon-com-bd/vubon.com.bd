export interface InsuranceActionRequestDTO {
  readonly insuranceId: string;
}
export interface CancelInsuranceRequestDTO {
  readonly insuranceId: string;
  readonly reason?: string;
}
export interface SubmitClaimRequestDTO {
  readonly insuranceId: string;
  readonly claimId: string;
  readonly claimNumber: string;
  readonly reason: string;
  readonly description?: string;
  readonly images?: readonly string[];
  readonly amount: number;
}
export interface ReviewClaimRequestDTO {
  readonly insuranceId: string;
  readonly claimId: string;
}
export interface ApproveClaimRequestDTO {
  readonly insuranceId: string;
  readonly claimId: string;
  readonly approvedAmount: number;
}
export interface RejectClaimRequestDTO {
  readonly insuranceId: string;
  readonly claimId: string;
  readonly reason: string;
}
export interface PayClaimRequestDTO {
  readonly insuranceId: string;
  readonly claimId: string;
}
