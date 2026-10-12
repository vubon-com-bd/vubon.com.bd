/**
 * CreateShipmentRequestDto — input for CreateShipmentCommand
 * @module logistics-service/application/dtos/requests/shipment
 */
import type {
  ShipmentTypeValue,
  ShipmentPriorityValue,
} from '@vubon/shared-types/logistics';
import type { Address } from '@vubon/shared-types/common';

export interface CreateShipmentRequestDto {
  readonly orderId: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly courierId?: string;
  readonly type: ShipmentTypeValue;
  readonly priority?: ShipmentPriorityValue;
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
  readonly dimensions: {
    readonly actualWeightKg: number;
    readonly lengthCm?: number;
    readonly widthCm?: number;
    readonly heightCm?: number;
  };
  readonly isCOD?: boolean;
  readonly codAmount?: number;
  readonly isInsured?: boolean;
  readonly declaredValue?: number;
  readonly currency?: string;
  readonly notes?: string;
}
