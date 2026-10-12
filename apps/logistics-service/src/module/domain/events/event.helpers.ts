/**
 * Event helpers — ID generation, timestamp, aggregate type constants
 * @module logistics-service/domain/events
 */
import { randomUUID } from 'node:crypto';
import type { Timestamp } from '@vubon/shared-types/common';

export function newEventId(): string {
  return randomUUID();
}

/** Current timestamp as epoch milliseconds (branded). */
export function now(): Timestamp {
  return Date.now() as Timestamp;
}

// ═══ Aggregate type identifiers ═══
export const SHIPMENT_AGGREGATE_TYPE = 'Shipment';
export const COURIER_AGGREGATE_TYPE = 'Courier';
export const DELIVERY_AGGREGATE_TYPE = 'Delivery';
export const TRACKING_AGGREGATE_TYPE = 'Tracking';
export const WAREHOUSE_AGGREGATE_TYPE = 'Warehouse';
export const FULFILLMENT_AGGREGATE_TYPE = 'Fulfillment';
export const DISPATCH_AGGREGATE_TYPE = 'Dispatch';
export const VEHICLE_AGGREGATE_TYPE = 'Vehicle';
export const DRIVER_AGGREGATE_TYPE = 'Driver';
export const ROUTE_AGGREGATE_TYPE = 'Route';
export const ZONE_AGGREGATE_TYPE = 'Zone';
export const SHIPPING_METHOD_AGGREGATE_TYPE = 'ShippingMethod';
export const PACKAGING_AGGREGATE_TYPE = 'Packaging';
export const RETURN_SHIPMENT_AGGREGATE_TYPE = 'ReturnShipment';
export const INSURANCE_AGGREGATE_TYPE = 'Insurance';
