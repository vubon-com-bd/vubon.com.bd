import type { FulfillmentTypeValue } from '@domain/primitives/fulfillment-type.vo';
import type { FulfillmentPriorityValue } from '@domain/primitives/fulfillment-priority.vo';

export interface CreateFulfillmentRequestDTO {
  readonly orderId: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly type: FulfillmentTypeValue;
  readonly priority?: FulfillmentPriorityValue;
  readonly itemIds: readonly string[];
  readonly assignedTo?: string;
  readonly slaDueAt?: string;
  readonly notes?: string;
}
