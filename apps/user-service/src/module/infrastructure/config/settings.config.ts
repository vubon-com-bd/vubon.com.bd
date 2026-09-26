import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SETTINGS_CONFIG = Object.freeze({
  maxSettings: getOptionalEnvInt('SETTINGS_MAX', 50),
  defaultValue: '',
  allowedKeys: Object.freeze([
    'theme',
    'language',
    'timezone',
    'currency',
    'notifications',
  ] as const),
} as const);
