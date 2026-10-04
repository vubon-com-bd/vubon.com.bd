/**
 * Preferences Config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common/env';

export const PREFERENCES_CONFIG = Object.freeze({
  defaultPageSize: getOptionalEnvInt('PREFERENCES_DEFAULT_PAGE_SIZE', 20),
  cacheTtl: getOptionalEnvInt('PREFERENCES_CACHE_TTL', 3600),
} as const);

export type PreferencesConfig = typeof PREFERENCES_CONFIG;
