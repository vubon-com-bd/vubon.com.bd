import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';

export const CartSettingsSchema = BaseSchema.extend({
  settingsId: z.string().uuid(),
  key: z.string(),
  value: z.unknown(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const CartSettingsValuesSchema = z.object({
  maxItems: z.number().int().min(1).default(100),
  minOrderAmount: MoneySchema,
  maxOrderAmount: MoneySchema,
  cartExpiryHours: z.number().int().min(1).default(24),
  abandonedCartReminderHours: z.number().int().min(1).default(3),
  maxReminders: z.number().int().min(1).default(4),
  couponMaxPerCart: z.number().int().min(0).default(10),
  enableGuestCart: z.boolean().default(true),
  enableSavedForLater: z.boolean().default(true),
  enableWishlist: z.boolean().default(true),
  autoMergeGuestCart: z.boolean().default(true),
  currency: z.string().min(3).max(3),
});
