/**
 * Abandoned Cart Schema
 * @module shared-schemas/business/cart
 *
 * Values আসে shared-constants/business/abandoned-cart.constants থেকে।
 */

import { z } from 'zod';
import { ABANDONED_CART_STATUS } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { EmailSchema } from '../../common/primitives/email.schema';
import { MoneySchema } from '../../common/primitives/money.schema';

export const AbandonedCartStatusSchema = z.enum(
  Object.values(ABANDONED_CART_STATUS) as [string, ...string[]]
);

export const AbandonedCartSchema = z.object({
  id: UuidSchema,
  cartId: UuidSchema,
  userId: UuidSchema.optional(),
  email: EmailSchema.optional(),
  status: AbandonedCartStatusSchema,
  itemCount: z.number().int().nonnegative(),
  cartValue: MoneySchema,
  currency: z.string().length(3),
  abandonedAt: z.string().datetime(),
  remindersSent: z.number().int().nonnegative(),
  lastReminderAt: z.string().datetime().optional(),
  recoveredAt: z.string().datetime().optional(),
  recoveredOrderId: UuidSchema.optional(),
  recoveryDiscountPercent: z.number().min(0).max(100).optional(),
});

export const AbandonedCartReminderSchema = z.object({
  abandonedCartId: UuidSchema,
  channel: z.enum(['email', 'sms', 'push']),
  sentAt: z.string().datetime(),
  openedAt: z.string().datetime().optional(),
  clickedAt: z.string().datetime().optional(),
  convertedAt: z.string().datetime().optional(),
});

export type AbandonedCartStatusSchemaType = z.infer<typeof AbandonedCartStatusSchema>;
export type AbandonedCartSchemaType = z.infer<typeof AbandonedCartSchema>;
export type AbandonedCartReminderSchemaType = z.infer<typeof AbandonedCartReminderSchema>;
