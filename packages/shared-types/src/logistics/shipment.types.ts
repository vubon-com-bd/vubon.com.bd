/**
 * Shipment Core Types
 * @module shared-types/logistics
 */

import type { BaseEntity } from '../common/base';
import type { ShipmentId, OrderId, VendorId, WarehouseId, UserId } from '../common/primitives';
import type { Address } from '../common/geo';
import type { ShipmentStatusValue, ShipmentPriorityValue } from './shipment-status.types';
import type { ShipmentTypeValue } from './shipment-type.types';

export interface Shipment extends BaseEntity<ShipmentId> {
  readonly trackingNumber: string;
  readonly orderId: OrderId;
  readonly userId?: UserId;
  readonly vendorId?: VendorId;
  readonly warehouseId?: WarehouseId;
  readonly status: ShipmentStatusValue;
  readonly type: ShipmentTypeValue;
  readonly priority: ShipmentPriorityValue;
  readonly courierId?: string;
  readonly courierTrackingNumber?: string;
  readonly shippingAddress: Address;
  readonly pickupAddress?: Address;
  readonly itemCount: number;
  readonly totalWeightKg?: number;
  readonly totalVolumeM3?: number;
  readonly declaredValue?: number;
  readonly currency?: string;
  readonly shippingCost?: number;
  readonly codAmount?: number;
  readonly isCOD: boolean;
  readonly isInsured: boolean;
  readonly labelUrl?: string;
  readonly estimatedDeliveryAt?: string;
  readonly pickedUpAt?: string;
  readonly deliveredAt?: string;
  readonly returnedAt?: string;
  readonly cancelledAt?: string;
  readonly notes?: string;
}

export interface ShipmentPublic {
  readonly id: ShipmentId;
  readonly trackingNumber: string;
  readonly status: ShipmentStatusValue;
  readonly type: ShipmentTypeValue;
  readonly priority: ShipmentPriorityValue;
  readonly estimatedDeliveryAt?: string;
  readonly deliveredAt?: string;
}

export interface ShipmentSummary {
  readonly id: ShipmentId;
  readonly trackingNumber: string;
  readonly status: ShipmentStatusValue;
  readonly itemCount: number;
  readonly createdAt: string;
}

export interface ShipmentCreateInput {
  readonly orderId: OrderId;
  readonly type: ShipmentTypeValue;
  readonly priority?: ShipmentPriorityValue;
  readonly shippingAddress: Address;
  readonly pickupAddress?: Address;
  readonly courierId?: string;
  readonly warehouseId?: WarehouseId;
  readonly itemIds: readonly string[];
  readonly isCOD?: boolean;
  readonly isInsured?: boolean;
  readonly notes?: string;
}

export interface ShipmentListFilter {
  readonly status?: ShipmentStatusValue;
  readonly type?: ShipmentTypeValue;
  readonly priority?: ShipmentPriorityValue;
  readonly orderId?: OrderId;
  readonly userId?: UserId;
  readonly vendorId?: VendorId;
  readonly courierId?: string;
  readonly warehouseId?: WarehouseId;
  readonly isCOD?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}
