import type { InsuranceStatusValue } from '@domain/primitives/insurance-status.vo';
import type { InsuranceTypeValue } from '@domain/primitives/insurance-type.vo';

export interface InsuranceSummaryResponseDTO {
  readonly id: string;
  readonly policyNumber: string;
  readonly status: InsuranceStatusValue;
  readonly type: InsuranceTypeValue;
  readonly declaredValue: number;
  readonly premium: number;
  readonly currency: string;
  readonly createdAt: string;
}
