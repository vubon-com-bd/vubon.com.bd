/**
 * Logistics Core Types
 * @module shared-types/logistics
 *
 * Logistics aggregator।
 */

import type { BaseEntity } from '../common/base/index.js';
import type { ShipmentId, OrderId, UserId } from '../common/primitives/index.js';
import type { ShipmentStatusValue, ShipmentPriorityValue } from './shipment-status.types.js';
import type { Shipment } from './shipment.types.js';
import type { Delivery } from './delivery.types.js';
import type { Courier } from './courier.types.js';
import type { TrackingInfo } from './tracking.types.js';
import type { Warehouse } from './warehouse.types.js';
import type { Fulfillment } from './fulfillment.types.js';
import type { Dispatch } from './dispatch.types.js';
import type { Vehicle } from './vehicle.types.js';
import type { Driver } from './driver.types.js';
import type { Route } from './route.types.js';
import type { LogisticsMetrics } from './logistics-analytics.types.js';

export interface Logistics extends BaseEntity<string> {
  readonly shipmentId?: ShipmentId;
  readonly orderId?: OrderId;
  readonly userId?: UserId;
  readonly status: ShipmentStatusValue;
  readonly priority: ShipmentPriorityValue;
  readonly isCOD: boolean;
  readonly isInsured: boolean;
  readonly courierId?: string;
  readonly warehouseId?: string;
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
  readonly trackingNumber?: string;
}

export interface LogisticsPublic {
  readonly id: string;
  readonly shipmentId?: ShipmentId;
  readonly status: ShipmentStatusValue;
  readonly priority: ShipmentPriorityValue;
  readonly trackingNumber?: string;
  readonly createdAt: string;
}

export interface LogisticsSummary {
  readonly totalShipments: number;
  readonly inTransit: number;
  readonly delivered: number;
  readonly failed: number;
  readonly averageDeliveryMinutes: number;
  readonly onTimeDeliveryRate: number;
  readonly metrics: LogisticsMetrics;
}

export interface LogisticsOverview {
  readonly shipments: readonly Shipment[];
  readonly deliveries: readonly Delivery[];
  readonly couriers: readonly Courier[];
  readonly tracking: readonly TrackingInfo[];
  readonly warehouses: readonly Warehouse[];
  readonly fulfillments: readonly Fulfillment[];
  readonly dispatches: readonly Dispatch[];
  readonly vehicles: readonly Vehicle[];
  readonly drivers: readonly Driver[];
  readonly routes: readonly Route[];
  readonly summary: LogisticsSummary;
  readonly generatedAt: string;
}

export interface LogisticsListFilter {
  readonly status?: ShipmentStatusValue;
  readonly priority?: ShipmentPriorityValue;
  readonly orderId?: OrderId;
  readonly userId?: UserId;
  readonly courierId?: string;
  readonly warehouseId?: string;
  readonly driverId?: string;
  readonly isCOD?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}
