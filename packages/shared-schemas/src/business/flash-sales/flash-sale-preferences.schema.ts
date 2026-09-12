import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';

export const FlashSalePreferencesSchema = BaseSchema.extend({
  preferenceId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  notifyBeforeSale: z.boolean().default(true),
  notifyOnSaleStart: z.boolean().default(true),
  notifyOnPriceDrop: z.boolean().default(true),
  notifyOnStockAlert: z.boolean().default(true),
  favoriteCategories: z.array(z.string()),
  favoriteBrands: z.array(z.string()),
  maxPrice: z.number().min(0),
  minDiscount: z.number().min(0).max(100),
  language: z.string(),
  timezone: z.string(),
  metadata: z.record(z.unknown()).optional(),
});
