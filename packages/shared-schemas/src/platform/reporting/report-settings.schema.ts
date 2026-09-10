import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { REPORT_SETTINGS } from '@vubon/shared-constants/src/platform/reporting/report-settings.constants';
import { REPORT_FORMAT } from '@vubon/shared-constants/src/platform/reporting/report-format.constants';

const reportSettingsTypeKeys = Object.keys(REPORT_SETTINGS.TYPES) as [string, ...string[]];
const reportSettingsCategoryKeys = Object.keys(REPORT_SETTINGS.SETTINGS_CATEGORIES) as [
  string,
  ...string[],
];
const reportFormatTypeKeys = Object.keys(REPORT_FORMAT.TYPES) as [string, ...string[]];

export const ReportSettingsSchema = BaseSchema.extend({
  settingsId: z.string().uuid(),
  type: z.enum(reportSettingsTypeKeys),
  key: z.enum(reportSettingsCategoryKeys),
  value: z.unknown(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const ReportSettingsValuesSchema = z.object({
  defaultFormat: z.enum(reportFormatTypeKeys),
  defaultTimezone: z.string(),
  defaultLocale: z.string(),
  maxRetentionDays: z.number().int().min(1),
  enableExport: z.boolean().default(true),
  enableSchedule: z.boolean().default(true),
  enableNotification: z.boolean().default(true),
  maxExportSize: z.number().min(1),
  maxExportRows: z.number().int().min(1),
});
