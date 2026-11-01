import type { ReturnShipmentTypeValue } from '@domain/primitives/return-shipment-type.vo';
import type { ReturnReasonValue } from '@domain/primitives/return-reason.vo';

export interface CreateReturnShipmentRequestDTO {
  readonly orderId: string;
  readonly originalShipmentId?: string;
  readonly userId: string;
  readonly type: ReturnShipmentTypeValue;
  readonly reason: ReturnReasonValue;
  readonly description?: string;
  readonly images?: readonly string[];
  readonly itemIds: readonly string[];
  readonly pickupAddress: string;
  readonly refundCurrency?: string;
}
