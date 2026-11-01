/**
 * Logistics Event Helpers
 * @module logistics-service/domain/events
 *
 * DRY event construction — Payment pattern (Pattern 1 Template 5)
 */
import type { Timestamp } from '@vubon/shared-types/common';

// ─── Aggregate Type Constants ─────────────
export const LOGISTICS_AGGREGATE_TYPE = {
  SHIPMENT: 'Shipment',
  SHIPMENT_ITEM: 'ShipmentItem',
  COURIER: 'Courier',
  COURIER_RATE: 'CourierRate',
  DELIVERY: 'Delivery',
  DELIVERY_ATTEMPT: 'DeliveryAttempt',
  TRACKING: 'Tracking',
  TRACKING_EVENT: 'TrackingEvent',
  WAREHOUSE: 'Warehouse',
  INVENTORY_LOCATION: 'InventoryLocation',
  FULFILLMENT: 'Fulfillment',
  DISPATCH: 'Dispatch',
  VEHICLE: 'Vehicle',
  DRIVER: 'Driver',
  ROUTE: 'Route',
  ZONE: 'Zone',
  SHIPPING_METHOD: 'ShippingMethod',
  PACKAGING: 'Packaging',
  RETURN_SHIPMENT: 'ReturnShipment',
  RETURN_REASON: 'ReturnReason',
  INSURANCE: 'Insurance',
} as const;

// ─── Helpers ──────────────────────────────
export function newEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function now(): Timestamp {
  return new Date().toISOString() as unknown as Timestamp;
}
