import type { FulfillmentStatusValue } from '@domain/primitives/fulfillment-status.vo';
import type { FulfillmentTypeValue } from '@domain/primitives/fulfillment-type.vo';
import type { FulfillmentPriorityValue } from '@domain/primitives/fulfillment-priority.vo';

export interface FulfillmentResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly status: FulfillmentStatusValue;
  readonly type: FulfillmentTypeValue;
  readonly priority: FulfillmentPriorityValue;
  readonly itemIds: readonly string[];
  readonly itemCount: number;
  readonly assignedTo?: string;
  readonly pickedAt?: string;
  readonly packedAt?: string;
  readonly shippedAt?: string;
  readonly fulfilledAt?: string;
  readonly cancelledAt?: string;
  readonly failedAt?: string;
  readonly onHoldAt?: string;
  readonly slaDueAt?: string;
  readonly failureReason?: string;
  readonly cancelReason?: string;
  readonly holdReason?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
