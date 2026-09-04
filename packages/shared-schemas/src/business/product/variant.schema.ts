/**
 * Variant Schema
 * ভেরিয়েন্ট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VARIANT_STATUS } from '@vubon/shared-constants';

const VariantImageSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  alt: z.string().optional(),
  isPrimary: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
});

const VariantDimensionsSchema = z.object({
  length: z.number().min(0),
  width: z.number().min(0),
  height: z.number().min(0),
});

export const VariantSchema = BaseSchema.extend({
  productId: z.string().uuid(),
  sku: z.string().min(1, 'SKU is required').max(100),
  name: z.string().min(1, 'Variant name is required'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  comparePrice: z.number().min(0).optional(),
  costPrice: z.number().min(0).optional(),
  stock: z.number().int().min(0).default(0),
  lowStockThreshold: z.number().int().min(0).default(10),
  weight: z.number().min(0).optional(),
  dimensions: VariantDimensionsSchema.optional(),
  attributes: z.record(z.string()),
  images: z.array(VariantImageSchema).default([]),
  status: z.enum(Object.values(VARIANT_STATUS) as [string, ...string[]]),
  isDefault: z.boolean().default(false),
  position: z.number().int().min(0).default(0),
});

export const VariantCreateSchema = VariantSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VariantUpdateSchema = VariantCreateSchema.partial();

export type Variant = z.infer<typeof VariantSchema>;
export type VariantCreate = z.infer<typeof VariantCreateSchema>;
export type VariantUpdate = z.infer<typeof VariantUpdateSchema>;
