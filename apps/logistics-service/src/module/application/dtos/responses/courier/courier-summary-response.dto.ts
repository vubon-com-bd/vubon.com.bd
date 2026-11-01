/**
 * CourierSummaryResponseDTO — List view
 */
import type { CourierStatusValue } from '@domain/primitives/courier-status.vo';
import type { CourierTypeValue } from '@domain/primitives/courier-type.vo';

export interface CourierSummaryResponseDTO {
  readonly id: string;
  readonly code: string;
  readonly displayName: string;
  readonly type: CourierTypeValue;
  readonly status: CourierStatusValue;
  readonly priority: number;
  readonly createdAt: string;
}
