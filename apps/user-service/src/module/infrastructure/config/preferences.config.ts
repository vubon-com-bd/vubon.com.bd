import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const PREFERENCES_CONFIG = Object.freeze({
  maxPreferences: getOptionalEnvInt('PREFERENCES_MAX', 50),
  defaultValue: 'true',
  allowedKeys: Object.freeze([
    'newsletter',
    'promotions',
    'orderUpdates',
    'productRecommendations',
    'securityAlerts',
  ] as const),
} as const);
