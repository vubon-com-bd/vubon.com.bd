import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VARIANT } from '@vubon/shared-constants/src/business/product/variant.constants';
import { PricingSchema } from './pricing.schema';
import { InventorySchema } from './inventory.schema';

const variantStatusKeys = Object.keys(VARIANT.STATUS) as [string, ...string[]];
const variantTypeKeys = Object.keys(VARIANT.TYPES) as [string, ...string[]];

export const VariantSchema = BaseSchema.extend({
  variantId: z.string().uuid(),
  productId: z.string().uuid(),
  name: z.string().min(1).max(255),
  sku: z.string().min(1).max(100),
  status: z.enum(variantStatusKeys),
  type: z.enum(variantTypeKeys),
  attributes: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ),
  pricing: PricingSchema,
  inventory: InventorySchema,
  images: z.array(z.string().url()),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
  metadata: z.record(z.unknown()).optional(),
});

export const VariantCreateSchema = VariantSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Variant = z.infer<typeof VariantSchema>;
export type VariantCreate = z.infer<typeof VariantCreateSchema>;
