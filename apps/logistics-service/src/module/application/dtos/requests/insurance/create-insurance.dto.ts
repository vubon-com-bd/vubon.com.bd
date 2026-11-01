import type { InsuranceTypeValue } from '@domain/primitives/insurance-type.vo';
import type { InsuranceCoverageValue } from '@domain/primitives/insurance-coverage.vo';

export interface CreateInsuranceRequestDTO {
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly type: InsuranceTypeValue;
  readonly coverages: readonly InsuranceCoverageValue[];
  readonly declaredValue: number;
  readonly currency: string;
  readonly startsAt: string;
  readonly expiresAt: string;
  readonly provider?: string;
  readonly notes?: string;
}
