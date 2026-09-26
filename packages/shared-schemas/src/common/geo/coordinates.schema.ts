/**
 * Coordinates Schema
 * @module shared-schemas/common/geo
 */

import { z } from 'zod';

export const LatitudeSchema = z
  .number()
  .min(-90, 'Latitude must be ≥ -90')
  .max(90, 'Latitude must be ≤ 90');

export const LongitudeSchema = z
  .number()
  .min(-180, 'Longitude must be ≥ -180')
  .max(180, 'Longitude must be ≤ 180');

export const LatLngSchema = z.object({
  lat: LatitudeSchema,
  lng: LongitudeSchema,
});

export const BoundingBoxSchema = z
  .object({
    north: LatitudeSchema,
    south: LatitudeSchema,
    east: LongitudeSchema,
    west: LongitudeSchema,
  })
  .refine((b) => b.north > b.south, {
    message: 'North must be greater than south',
    path: ['north'],
  })
  .refine((b) => b.east > b.west, {
    message: 'East must be greater than west',
    path: ['east'],
  });

export const GeoPointSchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([LongitudeSchema, LatitudeSchema]),
});

export type LatitudeSchemaType = z.infer<typeof LatitudeSchema>;
export type LongitudeSchemaType = z.infer<typeof LongitudeSchema>;
export type LatLngSchemaType = z.infer<typeof LatLngSchema>;
export type BoundingBoxSchemaType = z.infer<typeof BoundingBoxSchema>;
export type GeoPointSchemaType = z.infer<typeof GeoPointSchema>;
