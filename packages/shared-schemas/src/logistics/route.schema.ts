import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ZoneSchema } from './zone.schema';
import { ROUTE } from '@vubon/shared-constants/src/logistics/route.constants';

const routeStatusKeys = Object.keys(ROUTE.STATUS) as [string, ...string[]];
const routeTypeKeys = Object.keys(ROUTE.TYPES) as [string, ...string[]];
const routeOptimizationKeys = Object.keys(ROUTE.ROUTE_OPTIMIZATION) as [string, ...string[]];

export const RouteSchema = BaseSchema.extend({
  routeId: z.string().uuid(),
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(50),
  status: z.enum(routeStatusKeys),
  type: z.enum(routeTypeKeys),
  zone: ZoneSchema,
  stops: z.array(
    z.object({
      stopId: z.string().uuid(),
      address: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      order: z.number().int().min(0),
      estimatedArrival: z.date(),
      estimatedDeparture: z.date(),
      actualArrival: z.date().optional(),
      actualDeparture: z.date().optional(),
    })
  ),
  totalStops: z.number().int().min(0).default(0),
  totalDistance: z.number().positive(),
  totalDuration: z.number().positive(),
  optimization: z.enum(routeOptimizationKeys),
  isActive: z.boolean().default(true),
  isOptimized: z.boolean().default(false),
  isUnderMaintenance: z.boolean().default(false),
  startPoint: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string(),
  }),
  endPoint: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string(),
  }),
  waypoints: z.array(
    z.object({
      latitude: z.number(),
      longitude: z.number(),
      address: z.string(),
    })
  ),
  metadata: z.object({
    trafficCondition: z.string(),
    roadCondition: z.string(),
    weatherCondition: z.string(),
    notes: z.string().optional(),
  }),
});
