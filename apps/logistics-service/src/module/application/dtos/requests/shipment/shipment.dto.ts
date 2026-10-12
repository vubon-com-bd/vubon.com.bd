/**
 * Shipment Request DTOs
 * @module logistics-service/application/dtos/requests/shipment
 *
 * Shapes mirror ShipmentCreateInputSchema in shared-schemas/logistics.
 */
import type { Address } from '@vubon/shared-types/common';
import type {
  ShipmentTypeValue,
  ShipmentPriorityValue,
} from '@vubon/shared-types/logistics';

export interface CreateShipmentRequestDTO {
  readonly orderId: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly type: ShipmentTypeValue;
  readonly priority?: ShipmentPriorityValue;
  readonly shippingAddress: Address;
  readonly pickupAddress?: Address;
  readonly courierId?: string;
  readonly packages: readonly PackageRefInput[];
  readonly isCOD?: boolean;
  readonly codAmount?: number;
  readonly isInsured?: boolean;
  readonly declaredValue?: number;
  readonly currency?: string;
  readonly shippingCost?: number;
  readonly weightKg: number;
  readonly volumeM3?: number;
  readonly dimensions?: { lengthCm: number; widthCm: number; heightCm: number };
  readonly notes?: string;
  readonly idempotencyKey?: string;
}

export interface PackageRefInput {
  readonly orderItemId: string;
  readonly productId?: string;
  readonly variantId?: string;
  readonly sku?: string;
  readonly quantity: number;
  readonly name?: string;
}

export interface UpdateShipmentRequestDTO {
  readonly shipmentId: string;
  readonly notes?: string;
}

export interface CancelShipmentRequestDTO {
  readonly shipmentId: string;
  readonly reason?: string;
}

export interface PickupShipmentRequestDTO {
  readonly shipmentId: string;
  readonly courierTrackingNumber?: string;
}

export interface DeliverShipmentRequestDTO {
  readonly shipmentId: string;
  readonly receivedBy?: string;
}

export interface FailShipmentRequestDTO {
  readonly shipmentId: string;
  readonly reason: string;
}

export interface MarkReturnedRequestDTO {
  readonly shipmentId: string;
  readonly reason: string;
}

export interface AssignCourierRequestDTO {
  readonly shipmentId: string;
  readonly courierId: string;
}

export interface AssignWarehouseRequestDTO {
  readonly shipmentId: string;
  readonly warehouseId: string;
}

export interface PutOnHoldRequestDTO {
  readonly shipmentId: string;
  readonly reason?: string;
}

export interface ReleaseShipmentRequestDTO {
  readonly shipmentId: string;
}

export interface MarkDelayedRequestDTO {
  readonly shipmentId: string;
  readonly reason: string;
  readonly newEstimatedDeliveryAt?: string;
}

export interface ChangePriorityRequestDTO {
  readonly shipmentId: string;
  readonly priority: ShipmentPriorityValue;
}

export interface GenerateLabelRequestDTO {
  readonly shipmentId: string;
  readonly labelUrl: string;
}
