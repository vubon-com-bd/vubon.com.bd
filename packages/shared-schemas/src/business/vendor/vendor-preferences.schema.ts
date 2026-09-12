import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';

export const VendorPreferencesSchema = BaseSchema.extend({
  preferenceId: z.string().uuid(),
  vendorId: z.string().uuid(),
  notificationEmail: z.boolean().default(true),
  notificationSms: z.boolean().default(false),
  notificationPush: z.boolean().default(true),
  notifyOnOrder: z.boolean().default(true),
  notifyOnPayment: z.boolean().default(true),
  notifyOnPayout: z.boolean().default(true),
  notifyOnReview: z.boolean().default(true),
  notifyOnSupport: z.boolean().default(true),
  language: z.string(),
  timezone: z.string(),
  dashboardLayout: z.string(),
  metadata: z.record(z.unknown()).optional(),
});
