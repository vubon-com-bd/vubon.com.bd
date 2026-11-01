/**
 * CourierPublicResponseDTO — Customer-safe view
 */
import type { CourierStatusValue } from '@domain/primitives/courier-status.vo';
import type { CourierTypeValue } from '@domain/primitives/courier-type.vo';

export interface CourierPublicResponseDTO {
  readonly id: string;
  readonly displayName: string;
  readonly type: CourierTypeValue;
  readonly status: CourierStatusValue;
  readonly logoUrl?: string;
  readonly supportsCOD: boolean;
  readonly averageDeliveryDays: number;
}
