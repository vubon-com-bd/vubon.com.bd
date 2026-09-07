import { z } from 'zod';
import { UserSettingsSchema } from '../user/user-settings.schema';

export const AdminSettingsSchema = UserSettingsSchema.extend({
  adminId: z.string().uuid(),
  dashboardLayout: z.string(),
  defaultReport: z.string(),
  adminNotifications: z.object({
    email: z.boolean().default(true),
    sms: z.boolean().default(false),
    push: z.boolean().default(true),
    inApp: z.boolean().default(true),
  }),
  securityLevel: z.enum(['high', 'medium', 'low']),
});
