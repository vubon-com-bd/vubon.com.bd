import type { ReturnShipmentStatusValue } from '@domain/primitives/return-shipment-status.vo';
import type { ReturnShipmentTypeValue } from '@domain/primitives/return-shipment-type.vo';

export interface ReturnShipmentSummaryResponseDTO {
  readonly id: string;
  readonly rmaNumber: string;
  readonly status: ReturnShipmentStatusValue;
  readonly type: ReturnShipmentTypeValue;
  readonly itemCount: number;
  readonly refundAmount?: number;
  readonly createdAt: string;
}
