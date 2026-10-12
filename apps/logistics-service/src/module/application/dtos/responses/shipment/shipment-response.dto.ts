/**
 * Shipment Response DTOs
 * @module logistics-service/application/dtos/responses/shipment
 */
import type {
  ShipmentStatusValue,
  ShipmentTypeValue,
  ShipmentPriorityValue,
} from '@vubon/shared-types/logistics';
import type { Address } from '@vubon/shared-types/common';

export interface ShipmentResponseDTO {
  readonly id: string;
  readonly trackingNumber: string;
  readonly orderId: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly courierId?: string;
  readonly courierTrackingNumber?: string;
  readonly type: ShipmentTypeValue;
  readonly priority: ShipmentPriorityValue;
  readonly status: ShipmentStatusValue;
  readonly shippingAddress: Address;
  readonly pickupAddress?: Address;
  readonly itemCount: number;
  readonly packageCount: number;
  readonly weightKg: number;
  readonly volumeM3?: number;
  readonly dimensions?: { lengthCm: number; widthCm: number; heightCm: number };
  readonly chargeableWeightKg: number;
  readonly isCOD: boolean;
  readonly codAmount?: number;
  readonly isInsured: boolean;
  readonly declaredValue?: number;
  readonly currency?: string;
  readonly shippingCost?: number;
  readonly labelUrl?: string;
  readonly estimatedDeliveryAt?: string;
  readonly pickedUpAt?: string;
  readonly deliveredAt?: string;
  readonly returnedAt?: string;
  readonly cancelledAt?: string;
  readonly failureReason?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ShipmentPublicResponseDTO {
  readonly id: string;
  readonly trackingNumber: string;
  readonly status: ShipmentStatusValue;
  readonly type: ShipmentTypeValue;
  readonly priority: ShipmentPriorityValue;
  readonly estimatedDeliveryAt?: string;
  readonly deliveredAt?: string;
}

export interface ShipmentSummaryResponseDTO {
  readonly id: string;
  readonly trackingNumber: string;
  readonly status: ShipmentStatusValue;
  readonly itemCount: number;
  readonly createdAt: string;
}

export interface ShipmentListResponseDTO {
  readonly items: readonly ShipmentSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ShipmentStatsResponseDTO {
  readonly totalShipments: number;
  readonly inTransit: number;
  readonly delivered: number;
  readonly failed: number;
  readonly returned: number;
  readonly cancelled: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byPriority: Readonly<Record<string, number>>;
  readonly byCourier: Readonly<Record<string, number>>;
}
