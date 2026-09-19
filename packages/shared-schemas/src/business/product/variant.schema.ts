/**
 * Variant Schema
 * @module shared-schemas/business/product
 *
 * Values আসে shared-constants/business/variant.constants থেকে।
 */

import { z } from 'zod';
import { VARIANT_STATUS, VARIANT_TYPE, VARIANT } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema, PositiveMoneySchema } from '../../common/primitives/money.schema';

export const VariantStatusSchema = z.enum(Object.values(VARIANT_STATUS) as [string, ...string[]]);

export const VariantTypeSchema = z.enum(Object.values(VARIANT_TYPE) as [string, ...string[]]);

export const VariantOptionSchema = z.object({
  name: z.string().trim().min(1).max(100),
  value: z.string().trim().min(1).max(100),
});

export const VariantSchema = z.object({
  id: UuidSchema,
  productId: UuidSchema,
  name: z.string().trim().min(1).max(VARIANT.NAME_MAX_LENGTH),
  sku: z.string().trim().min(1).max(VARIANT.SKU_MAX_LENGTH),
  barcode: z.string().trim().max(VARIANT.BARCODE_MAX_LENGTH).optional(),
  type: VariantTypeSchema,
  options: z.array(VariantOptionSchema).min(1).max(VARIANT.MAX_OPTIONS_PER_VARIANT),
  price: PositiveMoneySchema,
  compareAtPrice: MoneySchema.optional(),
  cost: MoneySchema.optional(),
  weight: z.number().positive().optional(),
  imageUrl: z.string().url().optional(),
  status: VariantStatusSchema,
  stock: z.number().int().nonnegative(),
});

export const VariantPublicSchema = VariantSchema.pick({
  id: true,
  name: true,
  sku: true,
  options: true,
  price: true,
  imageUrl: true,
  stock: true,
});

export type VariantStatusSchemaType = z.infer<typeof VariantStatusSchema>;
export type VariantTypeSchemaType = z.infer<typeof VariantTypeSchema>;
export type VariantSchemaType = z.infer<typeof VariantSchema>;
export type VariantPublicSchemaType = z.infer<typeof VariantPublicSchema>;
