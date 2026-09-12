import { z } from 'zod';
import { UserPreferencesSchema } from '../user/user-preferences.schema';

export const AdminPreferencesSchema = UserPreferencesSchema.extend({
  adminId: z.string().uuid(),
  dashboardWidgets: z.array(z.string()),
  quickActions: z.array(z.string()),
  shortcutKeys: z.record(z.string()),
});
