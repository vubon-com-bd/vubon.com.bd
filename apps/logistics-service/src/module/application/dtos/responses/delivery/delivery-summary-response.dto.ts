import type { DeliveryStatusValue } from '@domain/primitives/delivery-status.vo';
import type { DeliveryTypeValue } from '@domain/primitives/delivery-type.vo';

export interface DeliverySummaryResponseDTO {
  readonly id: string;
  readonly shipmentId: string;
  readonly orderId: string;
  readonly status: DeliveryStatusValue;
  readonly type: DeliveryTypeValue;
  readonly attemptCount: number;
  readonly createdAt: string;
}
