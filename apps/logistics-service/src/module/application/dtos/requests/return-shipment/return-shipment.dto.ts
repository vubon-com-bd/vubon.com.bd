/**
 * ReturnShipment Request DTOs
 * @module logistics-service/application/dtos/requests/return-shipment
 */
import type {
  ReturnShipmentTypeValue,
  ReturnShipmentStatusValue,
  ReturnReasonValue,
} from '@vubon/shared-types/logistics';
import type { Address } from '@vubon/shared-types/common';

export interface RequestReturnRequestDTO {
  readonly orderId: string;
  readonly originalShipmentId?: string;
  readonly userId: string;
  readonly type: ReturnShipmentTypeValue;
  readonly reason: ReturnReasonValue;
  readonly itemIds: readonly string[];
  readonly description?: string;
  readonly images?: readonly string[];
  readonly pickupAddress: Address;
}

export interface ApproveReturnRequestDTO { readonly returnId: string; }
export interface RejectReturnRequestDTO { readonly returnId: string; readonly reason: string; }

export interface ScheduleReturnPickupRequestDTO {
  readonly returnId: string;
  readonly pickupAt: string;
}

export interface PickupReturnRequestDTO {
  readonly returnId: string;
  readonly trackingNumber?: string;
}

export interface MarkReturnInTransitRequestDTO { readonly returnId: string; }
export interface ReceiveReturnRequestDTO { readonly returnId: string; }

export interface InspectReturnRequestDTO {
  readonly returnId: string;
  readonly inspectedBy: string;
  readonly restockable: boolean;
}

export interface CompleteReturnRequestDTO { readonly returnId: string; }

export interface IssueRefundRequestDTO {
  readonly returnId: string;
  readonly amount: number;
  readonly currency: string;
  readonly restockFeePercent?: number;
}

export interface CancelReturnRequestDTO { readonly returnId: string; readonly reason?: string; }
export interface MarkReturnLostRequestDTO { readonly returnId: string; readonly reason: string; }

export interface ReturnShipmentListFilterDTO {
  readonly orderId?: string;
  readonly userId?: string;
  readonly originalShipmentId?: string;
  readonly status?: ReturnShipmentStatusValue;
  readonly type?: ReturnShipmentTypeValue;
  readonly reason?: ReturnReasonValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}
