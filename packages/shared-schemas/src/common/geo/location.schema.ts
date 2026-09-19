/**
 * Location Schema
 * @module shared-schemas/common/geo
 *
 * Generic location — address + coordinates + distance।
 */

import { z } from 'zod';
import { AddressSchema } from './address.schema';
import { LatLngSchema } from './coordinates.schema';

export const LocationSchema = z.object({
  address: AddressSchema,
  coordinates: LatLngSchema.optional(),
  placeId: z.string().max(255).optional(),
  formattedAddress: z.string().max(500).optional(),
});

export const DistanceSchema = z.object({
  value: z.number().nonnegative(),
  unit: z.enum(['km', 'mi', 'm']),
});

export const LocationWithDistanceSchema = LocationSchema.extend({
  distanceKm: z.number().nonnegative(),
  durationMinutes: z.number().nonnegative().optional(),
});

export const GeoRouteSchema = z.object({
  origin: LatLngSchema,
  destination: LatLngSchema,
  distance: DistanceSchema,
  durationMinutes: z.number().nonnegative(),
  polyline: z.string().optional(),
});

export const ServiceAreaSchema = z.object({
  name: z.string().min(1).max(100),
  center: LatLngSchema,
  radiusKm: z.number().positive().max(1000),
  polygon: z.array(LatLngSchema).max(100).optional(),
});

export type LocationSchemaType = z.infer<typeof LocationSchema>;
export type DistanceSchemaType = z.infer<typeof DistanceSchema>;
export type LocationWithDistanceSchemaType = z.infer<typeof LocationWithDistanceSchema>;
export type GeoRouteSchemaType = z.infer<typeof GeoRouteSchema>;
export type ServiceAreaSchemaType = z.infer<typeof ServiceAreaSchema>;
