/**
 * Fulfillment Request DTOs
 * @module logistics-service/application/dtos/requests/fulfillment
 */
import type {
  FulfillmentTypeValue,
  FulfillmentStatusValue,
  FulfillmentPriorityValue,
} from '@vubon/shared-types/logistics';

export interface CreateFulfillmentRequestDTO {
  readonly orderId: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly type: FulfillmentTypeValue;
  readonly priority?: FulfillmentPriorityValue;
  readonly itemIds: readonly string[];
  readonly slaHours?: number;
  readonly notes?: string;
}

export interface AssignFulfillmentRequestDTO {
  readonly fulfillmentId: string;
  readonly assignedTo: string;
}

export interface UpdateFulfillmentRequestDTO {
  readonly fulfillmentId: string;
  readonly notes?: string;
}

export interface StartProcessingRequestDTO { readonly fulfillmentId: string; }
export interface StartPickingRequestDTO { readonly fulfillmentId: string; }
export interface StartPackingRequestDTO { readonly fulfillmentId: string; }
export interface ReadyToShipRequestDTO { readonly fulfillmentId: string; }
export interface ShipFulfillmentRequestDTO { readonly fulfillmentId: string; }
export interface FulfillFulfillmentRequestDTO { readonly fulfillmentId: string; }
export interface PartialFulfillFulfillmentRequestDTO { readonly fulfillmentId: string; }
export interface HoldFulfillmentRequestDTO { readonly fulfillmentId: string; readonly reason: string; }
export interface ReleaseFulfillmentRequestDTO { readonly fulfillmentId: string; }
export interface FailFulfillmentRequestDTO { readonly fulfillmentId: string; readonly reason: string; }
export interface CancelFulfillmentRequestDTO { readonly fulfillmentId: string; readonly reason: string; }

export interface FulfillmentListFilterDTO {
  readonly orderId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly status?: FulfillmentStatusValue;
  readonly type?: FulfillmentTypeValue;
  readonly priority?: FulfillmentPriorityValue;
  readonly assignedTo?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}
