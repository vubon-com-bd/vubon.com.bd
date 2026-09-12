import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { PACKAGING } from '@vubon/shared-constants/src/logistics/packaging.constants';

const packagingTypeKeys = Object.keys(PACKAGING.TYPES) as [string, ...string[]];
const packagingMaterialKeys = Object.keys(PACKAGING.PACKAGING_MATERIALS) as [string, ...string[]];
const packagingSizeKeys = Object.keys(PACKAGING.PACKAGING_SIZES) as [string, ...string[]];

export const PackagingSchema = BaseSchema.extend({
  packagingId: z.string().uuid(),
  type: z.enum(packagingTypeKeys),
  material: z.enum(packagingMaterialKeys),
  size: z.enum(packagingSizeKeys),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  weight: z.number().positive(),
  maxWeight: z.number().positive(),
  cost: z.number().min(0),
  isReusable: z.boolean().default(false),
  isRecyclable: z.boolean().default(false),
  isBiodegradable: z.boolean().default(false),
  description: z.string().optional(),
  image: z.string().url().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
