/**
 * Route Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/route.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { ROUTE_STATUS, ROUTE_TYPE, ROUTE_OPTIMIZATION } from '@vubon/shared-constants/logistics';

export const RouteStatusSchema = z.enum(Object.values(ROUTE_STATUS) as [string, ...string[]]);

export const RouteTypeSchema = z.enum(Object.values(ROUTE_TYPE) as [string, ...string[]]);

export const RouteOptimizationSchema = z.enum(
  Object.values(ROUTE_OPTIMIZATION) as [string, ...string[]]
);

export const RouteStopSchema = z.object({
  id: z.string().min(1).max(50),
  order: z.number().int().nonnegative(),
  location: z.string().max(200),
  address: z.string().min(1).max(500),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  shipmentIds: z.array(UuidSchema).max(100),
  estimatedArrivalAt: z.string().datetime().optional(),
  actualArrivalAt: z.string().datetime().optional(),
  completed: z.boolean(),
  notes: z.string().max(500).optional(),
});

export const RouteSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  code: z.string().min(1).max(50),
  type: RouteTypeSchema,
  status: RouteStatusSchema,
  optimization: RouteOptimizationSchema,
  stops: z.array(RouteStopSchema).min(1).max(200),
  totalDistanceKm: z.number().nonnegative().optional(),
  totalDurationMinutes: z.number().nonnegative().optional(),
  warehouseId: UuidSchema.optional(),
  vehicleId: UuidSchema.optional(),
  driverId: UuidSchema.optional(),
  scheduledDate: z.string().datetime(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  isOptimized: z.boolean(),
  isRecurring: z.boolean(),
  recurrenceRule: z.string().max(200).optional(),
});

export const RoutePublicSchema = RouteSchema.pick({
  id: true,
  name: true,
  code: true,
  type: true,
  status: true,
  scheduledDate: true,
}).extend({
  totalStops: z.number().int().nonnegative(),
});

export type RouteStatusSchemaType = z.infer<typeof RouteStatusSchema>;
export type RouteTypeSchemaType = z.infer<typeof RouteTypeSchema>;
export type RouteOptimizationSchemaType = z.infer<typeof RouteOptimizationSchema>;
export type RouteSchemaType = z.infer<typeof RouteSchema>;
export type RoutePublicSchemaType = z.infer<typeof RoutePublicSchema>;
