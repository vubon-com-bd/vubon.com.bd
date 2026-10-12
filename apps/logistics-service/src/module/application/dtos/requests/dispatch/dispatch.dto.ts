/**
 * Dispatch Request DTOs
 * @module logistics-service/application/dtos/requests/dispatch
 */
import type { DispatchTypeValue, DispatchStatusValue } from '@vubon/shared-types/logistics';

export interface CreateDispatchRequestDTO {
  readonly type: DispatchTypeValue;
  readonly shipmentIds: readonly string[];
  readonly courierId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly warehouseId?: string;
  readonly estimatedArrivalAt?: string;
  readonly notes?: string;
}

export interface AddDispatchShipmentRequestDTO {
  readonly dispatchId: string;
  readonly shipmentId: string;
  readonly items?: number;
  readonly weightKg?: number;
}

export interface RemoveDispatchShipmentRequestDTO {
  readonly dispatchId: string;
  readonly shipmentId: string;
  readonly items?: number;
}

export interface AssignDispatchRequestDTO {
  readonly dispatchId: string;
  readonly courierId: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly warehouseId?: string;
}

export interface GenerateDispatchManifestRequestDTO {
  readonly dispatchId: string;
  readonly manifestUrl: string;
}

export interface UpdateDispatchEtaRequestDTO {
  readonly dispatchId: string;
  readonly newEta: string;
}

export interface StartDispatchRequestDTO { readonly dispatchId: string; }
export interface MarkDispatchInTransitRequestDTO { readonly dispatchId: string; }
export interface CompleteDispatchRequestDTO { readonly dispatchId: string; }
export interface FailDispatchRequestDTO { readonly dispatchId: string; readonly reason: string; }
export interface ReturnDispatchRequestDTO { readonly dispatchId: string; readonly reason: string; }
export interface CancelDispatchRequestDTO { readonly dispatchId: string; readonly reason: string; }

export interface DispatchListFilterDTO {
  readonly courierId?: string;
  readonly warehouseId?: string;
  readonly driverId?: string;
  readonly status?: DispatchStatusValue;
  readonly type?: DispatchTypeValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}
