/**
 * Product Type Schema
 * প্রোডাক্ট টাইপ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PRODUCT_TYPES } from '@vubon/shared-constants';

export const ProductTypeSchema = BaseSchema.extend({
  type: z.enum(Object.values(PRODUCT_TYPES) as [string, ...string[]]),
  name: z.string().min(1, 'Type name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const ProductTypeCreateSchema = ProductTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const ProductTypeUpdateSchema = ProductTypeCreateSchema.partial();

export type ProductType = z.infer<typeof ProductTypeSchema>;
export type ProductTypeCreate = z.infer<typeof ProductTypeCreateSchema>;
export type ProductTypeUpdate = z.infer<typeof ProductTypeUpdateSchema>;
