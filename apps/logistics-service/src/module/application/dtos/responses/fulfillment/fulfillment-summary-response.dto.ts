import type { FulfillmentStatusValue } from '@domain/primitives/fulfillment-status.vo';
import type { FulfillmentTypeValue } from '@domain/primitives/fulfillment-type.vo';
import type { FulfillmentPriorityValue } from '@domain/primitives/fulfillment-priority.vo';

export interface FulfillmentSummaryResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: FulfillmentStatusValue;
  readonly type: FulfillmentTypeValue;
  readonly priority: FulfillmentPriorityValue;
  readonly itemCount: number;
  readonly createdAt: string;
}
