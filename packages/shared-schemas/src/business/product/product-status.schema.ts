/**
 * Product Status Schema
 * প্রোডাক্ট স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PRODUCT_STATUS } from '@vubon/shared-constants';

export const ProductStatusSchema = BaseSchema.extend({
  status: z.enum(Object.values(PRODUCT_STATUS) as [string, ...string[]]),
  reason: z.string().optional(),
  note: z.string().optional(),
  changedBy: z.string().uuid(),
  changedAt: z.date().default(() => new Date()),
});

export const ProductStatusUpdateSchema = ProductStatusSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ProductStatus = z.infer<typeof ProductStatusSchema>;
export type ProductStatusUpdate = z.infer<typeof ProductStatusUpdateSchema>;
