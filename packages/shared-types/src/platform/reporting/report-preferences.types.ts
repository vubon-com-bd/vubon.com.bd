import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { REPORT_PREFERENCES } from '@vubon/shared-constants/src/platform/reporting/report-preferences.constants';

export interface ReportPreferences extends BaseEntity {
  preferenceId: string;
  userId: string;
  user: User;
  type: keyof typeof REPORT_PREFERENCES.TYPES | string;
  theme: keyof typeof REPORT_PREFERENCES.THEME_OPTIONS | string;
  language: string;
  timezone: string;
  notifications: (keyof typeof REPORT_PREFERENCES.NOTIFICATION_PREFERENCES | string)[];
  dashboardLayout: string;
  defaultReportType: string;
  defaultFormat: string;
  emailReports: boolean;
  scheduleReports: boolean;
  metadata: Record<string, unknown>;
}
