import { BaseEntity } from '../../common/base.types';
import { ANALYTICS_SETTINGS } from '@vubon/shared-constants/src/platform/analytics/analytics-settings.constants';

export interface AnalyticsSettingsValues {
  dataCollection: keyof typeof ANALYTICS_SETTINGS.DATA_COLLECTION_OPTIONS | string;
  dataRetention: keyof typeof ANALYTICS_SETTINGS.RETENTION_PERIODS | string;
  enableRealTime: boolean;
  enableHistorical: boolean;
  enablePredictive: boolean;
  enableNotifications: boolean;
  privacyEnabled: boolean;
  securityEnabled: boolean;
  defaultTimezone: string;
  defaultLocale: string;
}

export interface AnalyticsSettings extends BaseEntity {
  settingsId: string;
  type: keyof typeof ANALYTICS_SETTINGS.TYPES | string;
  category: keyof typeof ANALYTICS_SETTINGS.SETTINGS_CATEGORIES | string;
  key: string;
  value: unknown;
  description?: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
