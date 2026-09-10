import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';

export const FlashSaleSettingsSchema = BaseSchema.extend({
  settingsId: z.string().uuid(),
  key: z.string(),
  value: z.unknown(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const FlashSaleSettingsValuesSchema = z.object({
  maxFlashSales: z.number().int().min(1),
  maxProductsPerFlashSale: z.number().int().min(1),
  maxDiscountPercentage: z.number().min(0).max(100),
  minDiscountPercentage: z.number().min(0).max(100),
  defaultDurationHours: z.number().int().min(1),
  maxDurationHours: z.number().int().min(1),
  enableWishlist: z.boolean().default(true),
  enableSharing: z.boolean().default(true),
  enableNotifications: z.boolean().default(true),
  autoPublish: z.boolean().default(false),
  notificationChannels: z.array(z.string()),
});
