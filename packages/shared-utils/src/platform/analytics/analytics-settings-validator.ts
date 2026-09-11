import { ANALYTICS_SETTINGS } from '@vubon/shared-constants/src/platform/analytics/analytics-settings.constants';

export interface AnalyticsSettingsInput {
  type: string;
  category: string;
  key: string;
  value: unknown;
}

export const validateAnalyticsSettings = (
  settings: Partial<AnalyticsSettingsInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (settings.type && !Object.keys(ANALYTICS_SETTINGS.TYPES).includes(settings.type)) {
    errors.push('Invalid analytics settings type');
  }
  if (
    settings.category &&
    !Object.keys(ANALYTICS_SETTINGS.SETTINGS_CATEGORIES).includes(settings.category)
  ) {
    errors.push('Invalid settings category');
  }
  if (settings.key && settings.value === undefined) {
    errors.push('Value is required when key is provided');
  }
  return { isValid: errors.length === 0, errors };
};
