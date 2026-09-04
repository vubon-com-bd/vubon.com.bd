/**
 * Cart Status Schema
 * কার্ট স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { CART_STATUS } from '@vubon/shared-constants';

export const CartStatusSchema = BaseSchema.extend({
  cartId: z.string().uuid(),
  status: z.enum(Object.values(CART_STATUS) as [string, ...string[]]),
  note: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  previousStatus: z.enum(Object.values(CART_STATUS) as [string, ...string[]]).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const CartStatusUpdateSchema = CartStatusSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CartStatus = z.infer<typeof CartStatusSchema>;
export type CartStatusUpdate = z.infer<typeof CartStatusUpdateSchema>;
