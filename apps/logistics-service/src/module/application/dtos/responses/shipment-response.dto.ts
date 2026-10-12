/**
 * ShipmentResponseDto — full shipment view for internal API consumers
 * @module logistics-service/application/dtos/responses
 */
import type {
  ShipmentStatusValue,
  ShipmentTypeValue,
  ShipmentPriorityValue,
} from '@vubon/shared-types/logistics';
import type { Address } from '@vubon/shared-types/common';

export interface ShipmentResponseDto {
  readonly id: string;
  readonly trackingNumber: string;
  readonly orderId: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly courierId?: string;
  readonly status: ShipmentStatusValue;
  readonly type: ShipmentTypeValue;
  readonly priority: ShipmentPriorityValue;
  readonly shippingAddress: Address;
  readonly pickupAddress?: Address;
  readonly customer?: {
    readonly name: string;
    readonly phone: string;
    readonly email?: string;
  };
  readonly packages: ReadonlyArray<{
    readonly orderItemId: string;
    readonly productId?: string;
    readonly variantId?: string;
    readonly sku?: string;
    readonly name?: string;
    readonly quantity: number;
  }>;
  readonly itemCount: number;
  readonly dimensions: {
    readonly actualWeightKg: number;
    readonly volumetricWeightKg?: number;
    readonly chargeableWeightKg: number;
    readonly lengthCm?: number;
    readonly widthCm?: number;
    readonly heightCm?: number;
  };
  readonly isCOD: boolean;
  readonly codAmount?: number;
  readonly isInsured: boolean;
  readonly declaredValue?: number;
  readonly shippingCost?: number;
  readonly currency?: string;
  readonly courierTrackingNumber?: string;
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
