import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { REPORT_PREFERENCES } from '@vubon/shared-constants/src/platform/reporting/report-preferences.constants';

const reportPreferencesTypeKeys = Object.keys(REPORT_PREFERENCES.TYPES) as [string, ...string[]];
const reportThemeOptionKeys = Object.keys(REPORT_PREFERENCES.THEME_OPTIONS) as [
  string,
  ...string[],
];
const reportNotificationPreferenceKeys = Object.keys(
  REPORT_PREFERENCES.NOTIFICATION_PREFERENCES
) as [string, ...string[]];

export const ReportPreferencesSchema = BaseSchema.extend({
  preferenceId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  type: z.enum(reportPreferencesTypeKeys),
  theme: z.enum(reportThemeOptionKeys),
  language: z.string(),
  timezone: z.string(),
  notifications: z.array(z.enum(reportNotificationPreferenceKeys)),
  dashboardLayout: z.string(),
  defaultReportType: z.string(),
  defaultFormat: z.string(),
  emailReports: z.boolean().default(true),
  scheduleReports: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
