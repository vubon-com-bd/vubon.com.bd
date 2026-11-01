/**
 * CreateShipmentRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
import type { ShipmentTypeValue } from '@domain/primitives/shipment-type.vo';
import type { ShipmentPriorityValue } from '@domain/primitives/shipment-priority.vo';

export interface CreateShipmentItemDTO {
  readonly sku: string;
  readonly name: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly currency: string;
  readonly weightKg?: number;
  readonly productId?: string;
  readonly variantId?: string;
  readonly imageUrl?: string;
  readonly notes?: string;
}

export interface CreateShipmentRequestDTO {
  readonly orderId: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly courierId?: string;
  readonly type: ShipmentTypeValue;
  readonly priority?: ShipmentPriorityValue;
  readonly shippingAddress: string;
  readonly pickupAddress?: string;
  readonly items: readonly CreateShipmentItemDTO[];
  readonly totalWeightKg?: number;
  readonly totalVolumeM3?: number;
  readonly declaredValue?: number;
  readonly currency?: string;
  readonly shippingCost?: number;
  readonly codAmount?: number;
  readonly isCOD?: boolean;
  readonly isInsured?: boolean;
  readonly estimatedDeliveryAt?: string;
  readonly notes?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface CreateShipmentContextDTO {
  readonly request: CreateShipmentRequestDTO;
  readonly actorId: string;
  readonly requestId?: string;
}
