/**
 * Coupon Type Schema
 * কুপন টাইপ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { COUPON_TYPES } from '@vubon/shared-constants';

export const CouponTypeSchema = BaseSchema.extend({
  type: z.enum(Object.values(COUPON_TYPES) as [string, ...string[]]),
  name: z.string().min(1, 'Type name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  descriptionBangla: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const CouponTypeCreateSchema = CouponTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const CouponTypeUpdateSchema = CouponTypeCreateSchema.partial();

export type CouponType = z.infer<typeof CouponTypeSchema>;
export type CouponTypeCreate = z.infer<typeof CouponTypeCreateSchema>;
export type CouponTypeUpdate = z.infer<typeof CouponTypeUpdateSchema>;
