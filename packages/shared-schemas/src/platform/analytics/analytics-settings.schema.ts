import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ANALYTICS_SETTINGS } from '@vubon/shared-constants/src/platform/analytics/analytics-settings.constants';

const analyticsSettingsTypeKeys = Object.keys(ANALYTICS_SETTINGS.TYPES) as [string, ...string[]];
const analyticsSettingsCategoryKeys = Object.keys(ANALYTICS_SETTINGS.SETTINGS_CATEGORIES) as [
  string,
  ...string[],
];
const analyticsSettingsDataCollectionKeys = Object.keys(
  ANALYTICS_SETTINGS.DATA_COLLECTION_OPTIONS
) as [string, ...string[]];
const analyticsSettingsRetentionPeriodKeys = Object.keys(ANALYTICS_SETTINGS.RETENTION_PERIODS) as [
  string,
  ...string[],
];

export const AnalyticsSettingsSchema = BaseSchema.extend({
  settingsId: z.string().uuid(),
  type: z.enum(analyticsSettingsTypeKeys),
  category: z.enum(analyticsSettingsCategoryKeys),
  key: z.string(),
  value: z.unknown(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const AnalyticsSettingsValuesSchema = z.object({
  dataCollection: z.enum(analyticsSettingsDataCollectionKeys),
  dataRetention: z.enum(analyticsSettingsRetentionPeriodKeys),
  enableRealTime: z.boolean().default(true),
  enableHistorical: z.boolean().default(true),
  enablePredictive: z.boolean().default(false),
  enableNotifications: z.boolean().default(true),
  privacyEnabled: z.boolean().default(true),
  securityEnabled: z.boolean().default(true),
  defaultTimezone: z.string(),
  defaultLocale: z.string(),
});
