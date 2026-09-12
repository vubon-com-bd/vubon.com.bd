import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';

export const VendorSettingsSchema = BaseSchema.extend({
  settingsId: z.string().uuid(),
  vendorId: z.string().uuid(),
  key: z.string(),
  value: z.unknown(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const VendorSettingsValuesSchema = z.object({
  storeName: z.string(),
  storeDescription: z.string(),
  storeLogo: z.string().url().optional(),
  storeBanner: z.string().url().optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
  address: z.string(),
  timezone: z.string(),
  currency: z.string(),
  language: z.string(),
  allowReturns: z.boolean().default(true),
  returnWindow: z.number().int().min(0),
  allowReviews: z.boolean().default(true),
  autoApproveReviews: z.boolean().default(false),
});
