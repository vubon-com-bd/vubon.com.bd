import { z } from 'zod';
import { UserSettingsSchema } from '../user/user-settings.schema';
import { AdminSecurityLevel } from '@vubon/shared-constants/src/admin/admin-settings.constants';

const securityLevelValues = ['low', 'medium', 'high', 'critical'] as [string, ...string[]];

export const AdminSettingsSchema = UserSettingsSchema.extend({
  adminId: z.string().uuid(),
  dashboardLayout: z.string(),
  defaultReport: z.string(),
  adminNotifications: z.object({
    email: z.boolean().default(true),
    sms: z.boolean().default(false),
    push: z.boolean().default(true),
    inApp: z.boolean().default(true),
    adminAlerts: z.boolean().default(true),
    systemUpdates: z.boolean().default(true),
    securityAlerts: z.boolean().default(true),
  }),
  securityLevel: z.enum(securityLevelValues) as z.ZodType<AdminSecurityLevel>,
});
