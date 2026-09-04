/**
 * Abandoned Cart Schema
 * পরিত্যক্ত কার্ট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ABANDONED_CART } from '@vubon/shared-constants';

export const AbandonedCartSchema = BaseSchema.extend({
  userId: z.string().uuid().optional(),
  sessionId: z.string().optional(),
  cartId: z.string().uuid().optional(),
  status: z.enum([
    ABANDONED_CART.STATUS.PENDING,
    ABANDONED_CART.STATUS.RECOVERED,
    ABANDONED_CART.STATUS.LOST,
    ABANDONED_CART.STATUS.EXPIRED,
    ABANDONED_CART.STATUS.IGNORED,
    ABANDONED_CART.STATUS.CONVERTED,
  ]),
  itemsCount: z.number().int().min(0).default(0),
  subtotal: z.number().min(0).default(0),
  total: z.number().min(0).default(0),
  currency: z.string().default('BDT'),
  abandonedAt: z.date(),
  recoveryAttempts: z.number().int().min(0).default(0),
  lastRecoveryAt: z.date().optional(),
  recoveredAt: z.date().optional(),
  convertedAt: z.date().optional(),
  reason: z
    .enum([
      ABANDONED_CART.REASONS.CHECKOUT,
      ABANDONED_CART.REASONS.PAYMENT,
      ABANDONED_CART.REASONS.SHIPPING,
      ABANDONED_CART.REASONS.PRICE,
      ABANDONED_CART.REASONS.LOGIN,
      ABANDONED_CART.REASONS.TECHNICAL,
      ABANDONED_CART.REASONS.UNKNOWN,
    ])
    .optional(),
  emailSentAt: z.date().optional(),
  smsSentAt: z.date().optional(),
  pushSentAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const AbandonedCartCreateSchema = AbandonedCartSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  recoveryAttempts: true,
});

export const AbandonedCartUpdateSchema = AbandonedCartCreateSchema.partial();

export type AbandonedCart = z.infer<typeof AbandonedCartSchema>;
export type AbandonedCartCreate = z.infer<typeof AbandonedCartCreateSchema>;
export type AbandonedCartUpdate = z.infer<typeof AbandonedCartUpdateSchema>;
