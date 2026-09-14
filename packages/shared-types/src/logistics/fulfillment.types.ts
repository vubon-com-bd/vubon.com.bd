/**
 * Fulfillment Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/fulfillment.constants থেকে।
 */

import type {
  FULFILLMENT_STATUS,
  FULFILLMENT_TYPE,
  FULFILLMENT_PRIORITY,
} from '@vubon/shared-constants/logistics';
import type { BaseEntity } from '../common/base';
import type { OrderId, VendorId, WarehouseId } from '../common/primitives';

export type FulfillmentStatusValue = (typeof FULFILLMENT_STATUS)[keyof typeof FULFILLMENT_STATUS];

export type FulfillmentTypeValue = (typeof FULFILLMENT_TYPE)[keyof typeof FULFILLMENT_TYPE];

export type FulfillmentPriorityValue =
  (typeof FULFILLMENT_PRIORITY)[keyof typeof FULFILLMENT_PRIORITY];

export interface Fulfillment extends BaseEntity<string> {
  readonly orderId: OrderId;
  readonly vendorId?: VendorId;
  readonly warehouseId?: WarehouseId;
  readonly status: FulfillmentStatusValue;
  readonly type: FulfillmentTypeValue;
  readonly priority: FulfillmentPriorityValue;
  readonly itemIds: readonly string[];
  readonly assignedTo?: string;
  readonly pickedAt?: string;
  readonly packedAt?: string;
  readonly shippedAt?: string;
  readonly cancelledAt?: string;
  readonly notes?: string;
  readonly slaDueAt?: string;
}

export interface FulfillmentPublic {
  readonly id: string;
  readonly orderId: OrderId;
  readonly status: FulfillmentStatusValue;
  readonly type: FulfillmentTypeValue;
  readonly priority: FulfillmentPriorityValue;
  readonly itemCount: number;
}

export interface FulfillmentSummary {
  readonly id: string;
  readonly status: FulfillmentStatusValue;
  readonly itemCount: number;
  readonly createdAt: string;
}

export interface FulfillmentListFilter {
  readonly status?: FulfillmentStatusValue;
  readonly type?: FulfillmentTypeValue;
  readonly priority?: FulfillmentPriorityValue;
  readonly orderId?: OrderId;
  readonly vendorId?: VendorId;
  readonly warehouseId?: WarehouseId;
  readonly fromDate?: string;
  readonly toDate?: string;
}
