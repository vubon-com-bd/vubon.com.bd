/**
 * Logistics Core Schema
 * @module shared-schemas/logistics
 *
 * Logistics entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema.js';
import { UuidSchema } from '../common/primitives/uuid.schema.js';
import { ShipmentStatusSchema, ShipmentPrioritySchema } from './shipment-status.schema.js';
import { ShipmentSchema } from './shipment.schema.js';
import { DeliverySchema } from './delivery.schema.js';
import { CourierSchema } from './courier.schema.js';
import { TrackingInfoSchema } from './tracking.schema.js';
import { WarehouseSchema } from './warehouse.schema.js';
import { FulfillmentSchema } from './fulfillment.schema.js';
import { DispatchSchema } from './dispatch.schema.js';
import { VehicleSchema } from './vehicle.schema.js';
import { DriverSchema } from './driver.schema.js';
import { RouteSchema } from './route.schema.js';
import { LogisticsMetricsSchema } from './logistics-analytics.schema.js';

export const LogisticsSchema = BaseEntitySchema.extend({
  shipmentId: UuidSchema.optional(),
  orderId: UuidSchema.optional(),
  userId: UuidSchema.optional(),
  status: ShipmentStatusSchema,
  priority: ShipmentPrioritySchema,
  isCOD: z.boolean(),
  isInsured: z.boolean(),
  courierId: UuidSchema.optional(),
  warehouseId: UuidSchema.optional(),
  driverId: UuidSchema.optional(),
  vehicleId: UuidSchema.optional(),
  routeId: UuidSchema.optional(),
  trackingNumber: z.string().max(100).optional(),
});

export const LogisticsPublicSchema = LogisticsSchema.pick({
  id: true,
  shipmentId: true,
  status: true,
  priority: true,
  trackingNumber: true,
  createdAt: true,
});

export const LogisticsOverviewSchema = z.object({
  shipments: z.array(ShipmentSchema).max(100),
  deliveries: z.array(DeliverySchema).max(100),
  couriers: z.array(CourierSchema).max(50),
  tracking: z.array(TrackingInfoSchema).max(100),
  warehouses: z.array(WarehouseSchema).max(50),
  fulfillments: z.array(FulfillmentSchema).max(100),
  dispatches: z.array(DispatchSchema).max(100),
  vehicles: z.array(VehicleSchema).max(100),
  drivers: z.array(DriverSchema).max(100),
  routes: z.array(RouteSchema).max(100),
  metrics: LogisticsMetricsSchema,
  generatedAt: z.string().datetime(),
});

export const LogisticsListFilterSchema = z.object({
  status: ShipmentStatusSchema.optional(),
  priority: ShipmentPrioritySchema.optional(),
  orderId: UuidSchema.optional(),
  userId: UuidSchema.optional(),
  courierId: UuidSchema.optional(),
  warehouseId: UuidSchema.optional(),
  driverId: UuidSchema.optional(),
  isCOD: z.boolean().optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export type LogisticsSchemaType = z.infer<typeof LogisticsSchema>;
export type LogisticsPublicSchemaType = z.infer<typeof LogisticsPublicSchema>;
export type LogisticsOverviewSchemaType = z.infer<typeof LogisticsOverviewSchema>;
export type LogisticsListFilterSchemaType = z.infer<typeof LogisticsListFilterSchema>;
