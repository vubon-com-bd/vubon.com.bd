/**
 * ShipmentResponseDTO — Full admin view
 * @module logistics-service/application/dtos/responses/shipment
 */
import type { ShipmentStatusValue } from '@domain/primitives/shipment-status.vo';
import type { ShipmentTypeValue } from '@domain/primitives/shipment-type.vo';
import type { ShipmentPriorityValue } from '@domain/primitives/shipment-priority.vo';

export interface ShipmentResponseDTO {
  readonly id: string;
  readonly shipmentNumber: string;
  readonly trackingNumber: string;
  readonly status: ShipmentStatusValue;
  readonly type: ShipmentTypeValue;
  readonly priority: ShipmentPriorityValue;

  // Cross-domain refs
  readonly orderId?: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly courierId?: string;
  readonly courierTrackingNumber?: string;

  // Addresses
  readonly shippingAddress: string;
  readonly pickupAddress?: string;

  // Package info
  readonly itemCount: number;
  readonly totalWeightKg?: number;
  readonly totalVolumeM3?: number;

  // Money
  readonly declaredValue?: number;
  readonly currency?: string;
  readonly shippingCost?: number;
  readonly codAmount?: number;
  readonly isCOD: boolean;
  readonly isInsured: boolean;

  // External links
  readonly labelUrl?: string;

  // Timestamps
  readonly estimatedDeliveryAt?: string;
  readonly confirmedAt?: string;
  readonly processingStartedAt?: string;
  readonly packedAt?: string;
  readonly pickedUpAt?: string;
  readonly inTransitAt?: string;
  readonly outForDeliveryAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly returnedAt?: string;
  readonly cancelledAt?: string;
  readonly onHoldAt?: string;
  readonly delayedAt?: string;

  // Audit
  readonly cancelledBy?: string;
  readonly failureReason?: string;
  readonly cancelReason?: string;
  readonly holdReason?: string;
  readonly delayReason?: string;
  readonly notes?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;

  readonly createdAt: string;
  readonly updatedAt: string;
}
