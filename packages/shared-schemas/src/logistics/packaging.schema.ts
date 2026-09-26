/**
 * Packaging Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/packaging.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import {
  PACKAGING_TYPE,
  PACKAGING_MATERIAL,
  PACKAGING_STATUS,
} from '@vubon/shared-constants/logistics';

export const PackagingTypeSchema = z.enum(Object.values(PACKAGING_TYPE) as [string, ...string[]]);

export const PackagingMaterialSchema = z.enum(
  Object.values(PACKAGING_MATERIAL) as [string, ...string[]]
);

export const PackagingStatusSchema = z.enum(
  Object.values(PACKAGING_STATUS) as [string, ...string[]]
);

export const PackagingSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  code: z.string().min(1).max(50),
  type: PackagingTypeSchema,
  material: PackagingMaterialSchema,
  status: PackagingStatusSchema,
  lengthCm: z.number().positive(),
  widthCm: z.number().positive(),
  heightCm: z.number().positive(),
  maxWeightKg: z.number().positive(),
  volumeM3: z.number().positive().optional(),
  cost: z.number().nonnegative().optional(),
  currency: z.string().length(3).optional(),
  imageUrl: z.string().url().optional(),
  isFragile: z.boolean(),
  isTemperatureControlled: z.boolean(),
  isRecyclable: z.boolean(),
  stock: z.number().int().nonnegative(),
  isDefault: z.boolean(),
});

export const PackagingPublicSchema = PackagingSchema.pick({
  id: true,
  name: true,
  code: true,
  type: true,
  material: true,
  maxWeightKg: true,
});

export type PackagingTypeSchemaType = z.infer<typeof PackagingTypeSchema>;
export type PackagingMaterialSchemaType = z.infer<typeof PackagingMaterialSchema>;
export type PackagingStatusSchemaType = z.infer<typeof PackagingStatusSchema>;
export type PackagingSchemaType = z.infer<typeof PackagingSchema>;
export type PackagingPublicSchemaType = z.infer<typeof PackagingPublicSchema>;
